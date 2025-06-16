import { createQwen } from 'qwen-ai-provider';
import { streamText, tool, createDataStreamResponse } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// 创建 Qwen 提供程序实例
const qwen = createQwen({
  apiKey: process.env.DASHSCOPE_API_KEY || '',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  return createDataStreamResponse({
    execute: async (dataStream) => {
      const result = streamText({
        model: qwen('qwen-plus'),
        messages,
        system: `你是一个高级AI智能体，名为"深空助手"。你具备以下能力：

1. **深度思考**: 在回答问题前，你会进行深入的分析和推理
2. **工具使用**: 你可以使用多种工具来获取信息和执行任务
3. **多步推理**: 你可以将复杂问题分解为多个步骤来解决
4. **实时反馈**: 你会实时报告你的思考过程和执行状态

在回答时，请：
- 展示你的思考过程
- 解释你为什么选择特定的工具
- 如果需要多个步骤，请逐步说明
- 提供详细且有用的回答

请用友好、专业的语气与用户交流。`,
        
        maxSteps: 5,

        tools: {
          weather: tool({
            description: '获取指定地点的详细天气信息，包括温度、湿度、风速等',
            parameters: z.object({
              location: z.string().describe('要查询天气的地点，例如：北京、上海、纽约'),
            }),
            execute: async ({ location }, { toolCallId }) => {
              try {
                // 发送开始状态
                dataStream.writeMessageAnnotation({
                  type: 'tool-status',
                  toolCallId,
                  status: 'searching',
                  message: `正在查询${location}的天气信息...`,
                  progress: 20,
                  timestamp: Date.now()
                });

                await new Promise(resolve => setTimeout(resolve, 1000));

                // 更新进度
                dataStream.writeMessageAnnotation({
                  type: 'tool-status',
                  toolCallId,
                  status: 'processing',
                  message: '正在处理天气数据...',
                  progress: 70,
                  timestamp: Date.now()
                });

                await new Promise(resolve => setTimeout(resolve, 500));

                // 模拟天气数据
                const conditions = ['晴朗', '多云', '小雨', '阴天', '雷阵雨'];
                const weather = {
                  location,
                  temperature: Math.round(Math.random() * 30 + 5),
                  condition: conditions[Math.floor(Math.random() * conditions.length)],
                  humidity: Math.round(Math.random() * 50 + 30),
                  windSpeed: Math.round(Math.random() * 20 + 5),
                  timestamp: new Date().toLocaleString('zh-CN')
                };

                // 发送完成状态
                dataStream.writeMessageAnnotation({
                  type: 'tool-status',
                  toolCallId,
                  status: 'completed',
                  message: `${location}天气数据获取成功！`,
                  progress: 100,
                  timestamp: Date.now()
                });

                return weather;
              } catch (error) {
                dataStream.writeMessageAnnotation({
                  type: 'tool-status',
                  toolCallId,
                  status: 'error',
                  message: '获取天气数据失败',
                  error: error instanceof Error ? error.message : '未知错误',
                  timestamp: Date.now()
                });
                throw error;
              }
            },
          }),

          calculator: tool({
            description: '执行数学计算',
            parameters: z.object({
              expression: z.string().describe('要计算的数学表达式，例如：2+2, 10*5'),
            }),
            execute: async ({ expression }, { toolCallId }) => {
              try {
                // 发送开始状态  
                dataStream.writeMessageAnnotation({
                  type: 'tool-status',
                  toolCallId,
                  status: 'calculating',
                  message: '正在计算...',
                  progress: 30,
                  timestamp: Date.now()
                });

                await new Promise(resolve => setTimeout(resolve, 500));

                // 简单的数学计算
                let result: number;
                try {
                  const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
                  if (sanitized !== expression) {
                    throw new Error('表达式包含不支持的字符');
                  }
                  result = Function(`"use strict"; return (${sanitized})`)();
                  
                  if (!isFinite(result)) {
                    throw new Error('计算结果无效');
                  }
                } catch {
                  throw new Error('无效的数学表达式');
                }

                // 发送完成状态
                dataStream.writeMessageAnnotation({
                  type: 'tool-status',
                  toolCallId,
                  status: 'completed',
                  message: '计算完成！',
                  progress: 100,
                  timestamp: Date.now()
                });

                return {
                  expression,
                  result,
                  calculation: `${expression} = ${result}`,
                  timestamp: new Date().toLocaleString('zh-CN')
                };
              } catch (error) {
                dataStream.writeMessageAnnotation({
                  type: 'tool-status',
                  toolCallId,
                  status: 'error',
                  message: '计算失败',
                  error: error instanceof Error ? error.message : '未知错误',
                  timestamp: Date.now()
                });
                throw error;
              }
            },
          }),
        },
      });

      // 将 streamText 结果合并到 dataStream
      result.mergeIntoDataStream(dataStream);
    }
  });
}