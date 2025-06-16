import { Bot } from 'lucide-react';

/**
 * 打字指示器组件
 * 用于在AI思考和回复时显示动画效果，提升用户体验
 * 
 * @returns 打字指示器组件
 */
export function TypingIndicator() {
    return (
        <div className="flex gap-4 mb-6 justify-start">
            {/* AI头像 */}
            <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-agent-gradient flex items-center justify-center shadow-glow">
                    <Bot className="w-4 h-4 text-white" />
                </div>
            </div>

            {/* 打字动画气泡 */}
            <div className="glass rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-1">
                    {/* 三个跳动的圆点 */}
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                    ></div>
                </div>
            </div>
        </div>
    );
} 