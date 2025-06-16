/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';
import { ToolCallCardProps } from '@/app/types';
import { getToolIcon, getToolName } from '@/app/utils';
import { ToolStatusIndicator } from './ToolStatusIndicator';
import { WeatherResult } from './WeatherResult';
import { CalculatorResult } from './CalculatorResult';

/**
 * 工具调用卡片组件
 * 用于展示AI工具的调用过程、状态和结果
 * 
 * @param props - 组件属性
 * @returns 工具调用卡片组件
 */
export function ToolCallCard({ toolCall, status, isExpanded, onToggle }: ToolCallCardProps) {
    // 获取工具对应的图标组件
    const Icon = getToolIcon(toolCall.toolName);

    return (
        <div className="tool-card p-4 mb-3 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-blue-500/10 ${status?.status === 'completed' ? '' : 'tool-pulse'}`}>
                        <Icon className="w-4 h-4 text-blue-400" />
                    </div>

                    <div>
                        <div className="font-medium text-foreground">{getToolName(toolCall.toolName)}</div>
                        <div className="text-xs text-muted-foreground">
                            {Object.entries(toolCall.args).map(([key, value]) => (
                                <span key={key}>{String(value)}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {status && <ToolStatusIndicator status={status.status} />}
                    <button
                        onClick={onToggle}
                        className="p-1 hover:bg-accent rounded transition-colors"
                        aria-label={isExpanded ? '收起详情' : '展开详情'}
                    >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {status?.progress !== undefined && status.status !== 'completed' && (
                <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{String(status.message || '')}</span>
                        <span>{status.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                            className="bg-blue-400 h-1.5 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${status.progress}%` }}
                        />
                    </div>
                </div>
            )}

            {status?.message && status.status === 'completed' && (
                <div className="flex items-center gap-2 text-sm text-green-400 mb-3">
                    <CheckCircle className="w-4 h-4" />
                    <span>{String(status.message)}</span>
                </div>
            )}

            {status?.error && (
                <div className="flex items-center gap-2 text-sm text-red-400 mb-3">
                    <XCircle className="w-4 h-4" />
                    <span>{String(status.error)}</span>
                </div>
            )}

            {Boolean(toolCall.result) && (
                <div className="mb-3">
                    {toolCall.toolName === 'weather' && <WeatherResult result={toolCall.result as any} />}
                    {toolCall.toolName === 'calculator' && <CalculatorResult result={toolCall.result as any} />}
                </div>
            )}

            {isExpanded && (
                <div className="border-t border-border pt-3 animate-slide-up">
                    <div className="space-y-2">
                        <div>
                            <div className="text-xs font-medium text-muted-foreground mb-1">输入参数</div>
                            <div className="bg-muted/50 rounded-lg p-2 text-xs font-mono">
                                {JSON.stringify(toolCall.args, null, 2)}
                            </div>
                        </div>

                        {Boolean(toolCall.result) && (
                            <div>
                                <div className="text-xs font-medium text-muted-foreground mb-1">输出结果</div>
                                <div className="bg-muted/50 rounded-lg p-2 text-xs font-mono">
                                    {JSON.stringify(toolCall.result, null, 2)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
} 