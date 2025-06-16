import { History, Calendar, MessageSquare, Plus, Trash2, Menu } from 'lucide-react';
import { HistorySidebarProps } from '@/app/types';
import { formatDisplayDate } from '@/app/utils';

/**
 * 历史对话侧边栏组件
 * 用于展示和管理用户的历史对话记录，支持按日期分组显示
 * 
 * @param props - 组件属性
 * @returns 历史对话侧边栏组件
 */
export function HistorySidebar({
    chatHistory,
    currentSessionId,
    onSelectSession,
    onNewChat,
    onDeleteSession,
    isOpen,
    onToggle
}: HistorySidebarProps) {
    return (
        <>
            {/* 移动端遮罩层 */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onToggle}
                    aria-label="关闭侧边栏"
                />
            )}

            {/* 侧边栏主体 */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:static lg:z-auto`}>
                <div className="flex flex-col h-full">
                    {/* 侧边栏头部 */}
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <History className="w-5 h-5 text-primary" />
                                <h2 className="font-semibold text-foreground">对话历史</h2>
                            </div>
                            {/* 移动端关闭按钮 */}
                            <button
                                onClick={onToggle}
                                className="lg:hidden p-1 hover:bg-accent rounded"
                                aria-label="关闭侧边栏"
                            >
                                <Menu className="w-4 h-4" />
                            </button>
                        </div>

                        {/* 新建对话按钮 */}
                        <button
                            onClick={onNewChat}
                            className="w-full flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            新建对话
                        </button>
                    </div>

                    {/* 历史对话列表 */}
                    <div className="flex-1 overflow-y-auto">
                        {Object.entries(chatHistory)
                            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                            .map(([date, sessions]) => (
                                <div key={date} className="p-4 border-b border-border">
                                    {/* 日期标题 */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            {formatDisplayDate(date)}
                                        </h3>
                                    </div>

                                    {/* 该日期下的会话列表 */}
                                    <div className="space-y-2">
                                        {sessions
                                            .sort((a, b) => b.updatedAt - a.updatedAt)
                                            .map((session) => (
                                                <div
                                                    key={session.id}
                                                    className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${currentSessionId === session.id
                                                        ? 'bg-primary/10 border border-primary/20'
                                                        : 'hover:bg-accent'
                                                        }`}
                                                    onClick={() => onSelectSession(session)}
                                                >
                                                    <div className="flex items-start gap-2">
                                                        {/* 会话图标 */}
                                                        <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />

                                                        {/* 会话信息 */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-medium text-foreground truncate">
                                                                {session.title}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {session.messages.length} 条消息
                                                            </div>
                                                        </div>

                                                        {/* 删除按钮 - 悬停时显示 */}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onDeleteSession(session.id);
                                                            }}
                                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-all"
                                                            aria-label={`删除对话: ${session.title}`}
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}

                        {/* 空状态提示 */}
                        {Object.keys(chatHistory).length === 0 && (
                            <div className="p-8 text-center text-muted-foreground">
                                <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">暂无对话历史</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
} 