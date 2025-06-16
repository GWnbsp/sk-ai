import { Bot, User } from 'lucide-react';
import { MessageProps, ToolCall } from '@/app/types';
import { ToolCallCard } from './ToolCallCard';

/**
 * 消息组件
 * 用于展示用户消息和AI回复消息，包括工具调用结果
 * 
 * @param props - 组件属性
 * @returns 消息组件
 */
export function Message({ message, toolStatuses, expandedTools, onToggleTool }: MessageProps) {
    const isUser = message.role === 'user';

    return (
        <div className={`flex gap-4 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {/* AI头像 - 仅在AI消息时显示 */}
            {!isUser && (
                <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-agent-gradient flex items-center justify-center shadow-glow">
                        <Bot className="w-4 h-4 text-white" />
                    </div>
                </div>
            )}

            {/* 消息内容区域 */}
            <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
                {isUser ? (
                    /* 用户消息气泡 */
                    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-primary-foreground rounded-2xl px-4 py-3 shadow-lg">
                        <p className="text-sm">{message.content}</p>
                    </div>
                ) : (
                    /* AI消息内容 */
                    <div className="space-y-3">
                        {/* AI回复文本内容 */}
                        {message.content && (
                            <div className="glass rounded-2xl px-4 py-3 shadow-lg">
                                <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                                    {message.content}
                                </div>
                            </div>
                        )}

                        {/* 工具调用卡片列表 */}
                        {message.toolInvocations?.map((toolCall: ToolCall) => (
                            <ToolCallCard
                                key={toolCall.toolCallId}
                                toolCall={toolCall}
                                status={toolStatuses.get(toolCall.toolCallId)}
                                isExpanded={expandedTools.has(toolCall.toolCallId)}
                                onToggle={() => onToggleTool(toolCall.toolCallId)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* 用户头像 - 仅在用户消息时显示 */}
            {isUser && (
                <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                </div>
            )}
        </div>
    );
} 