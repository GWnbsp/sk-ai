/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Cloud, Calculator, Plus, Menu } from 'lucide-react';

// 导入类型定义
import { ChatSession, Message, ToolStatus } from '@/app/types';

// 导入组件
import {
    Message as MessageComponent,
    TypingIndicator,
    HistorySidebar
} from '@/app/components';

// 导入自定义Hook
import { useChatHistory } from '@/app/hooks/useChatHistory';

/**
 * 主聊天页面组件
 * 整合了AI对话、工具调用、历史记录等功能的主要界面
 * 
 * @returns 聊天页面组件
 */
export default function Chat() {
    // 工具展开状态管理
    const [expandedTools, setExpandedTools] = useState<Set<string>>(new Set());
    // 工具状态管理
    const [toolStatuses, setToolStatuses] = useState<Map<string, unknown>>(new Map());
    // 侧边栏开关状态
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // 消息滚动引用
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 聊天历史管理Hook
    const {
        chatHistory,
        currentSessionId,
        createNewSession,
        selectSession,
        deleteSession,
        saveSession,
        getCurrentSessionMessages
    } = useChatHistory();

    // AI聊天Hook
    const { messages, input, handleInputChange, handleSubmit, isLoading, data, setMessages } = useChat({
        api: '/api/chat',
    });

    /**
     * 切换工具展开状态
     * @param toolCallId - 工具调用ID
     */
    const toggleTool = (toolCallId: string) => {
        setExpandedTools(prev => {
            const newSet = new Set(prev);
            if (newSet.has(toolCallId)) {
                newSet.delete(toolCallId);
            } else {
                newSet.add(toolCallId);
            }
            return newSet;
        });
    };

    /**
     * 创建新对话并重置状态
     */
    const handleNewChat = () => {
        createNewSession();
        setMessages([]);
        setToolStatuses(new Map());
        setExpandedTools(new Set());
        setSidebarOpen(false);
    };

    /**
 * 选择历史对话
 * @param session - 要选择的会话
 */
    const handleSelectSession = (session: ChatSession) => {
        selectSession(session);
        setMessages(session.messages as any);
        setToolStatuses(new Map());
        setExpandedTools(new Set());
        setSidebarOpen(false);
    };

    // 处理实时数据流
    useEffect(() => {
        if (data) {
            data.forEach((annotation: any) => {
                if (annotation.type === 'tool-status') {
                    setToolStatuses(prev => new Map(prev.set(annotation.toolCallId, annotation)));
                }
            });
        }
    }, [data]);

    // 自动滚动到底部
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // 保存会话到历史记录
    useEffect(() => {
        if (messages.length > 0) {
            saveSession(messages);
        }
    }, [messages, saveSession]);

    // 初始化时加载历史会话消息
    useEffect(() => {
        if (currentSessionId) {
            const sessionMessages = getCurrentSessionMessages();
            if (sessionMessages.length > 0 && messages.length === 0) {
                setMessages(sessionMessages as any);
            }
        }
    }, [currentSessionId, getCurrentSessionMessages, messages.length, setMessages]);

    return (
        <div className="min-h-screen bg-background flex">
            {/* 历史对话侧边栏 */}
            <HistorySidebar
                chatHistory={chatHistory}
                currentSessionId={currentSessionId}
                onSelectSession={handleSelectSession}
                onNewChat={handleNewChat}
                onDeleteSession={deleteSession}
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            {/* 主聊天区域 */}
            <div className="flex-1 flex flex-col lg:ml-0">
                {/* 应用头部 */}
                <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="px-4 py-4">
                        <div className="flex items-center gap-3">
                            {/* 移动端菜单按钮 */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 hover:bg-accent rounded-lg"
                                aria-label="打开侧边栏"
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            {/* 应用图标和标题 */}
                            <div className="w-10 h-10 rounded-xl bg-agent-gradient flex items-center justify-center shadow-glow">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-xl font-bold gradient-text">深空助手</h1>
                                <p className="text-sm text-muted-foreground">AI智能体 · 工具调用 · 实时状态</p>
                            </div>

                            {/* 桌面端新对话按钮 */}
                            <button
                                onClick={handleNewChat}
                                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg text-sm transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                新对话
                            </button>
                        </div>
                    </div>
                </div>

                {/* 聊天消息区域 */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        <div className="space-y-6">
                            {/* 欢迎消息 - 仅在无消息时显示 */}
                            {messages.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-2xl bg-agent-gradient flex items-center justify-center mx-auto mb-4 shadow-glow">
                                        <Bot className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold gradient-text mb-2">欢迎使用深空助手</h2>
                                    <p className="text-muted-foreground mb-6">我可以帮您查询天气、进行数学计算等任务</p>

                                    {/* 快捷操作按钮 */}
                                    <div className="flex flex-wrap justify-center gap-3">
                                        <button
                                            onClick={() => handleInputChange({ target: { value: '北京今天天气怎么样？' } } as any)}
                                            className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-sm transition-colors flex items-center gap-2"
                                        >
                                            <Cloud className="w-4 h-4" />
                                            查询天气
                                        </button>
                                        <button
                                            onClick={() => handleInputChange({ target: { value: '计算 15 * 23 + 87' } } as any)}
                                            className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg text-sm transition-colors flex items-center gap-2"
                                        >
                                            <Calculator className="w-4 h-4" />
                                            数学计算
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* 消息列表 */}
                            {messages.map((message) => (
                                <MessageComponent
                                    key={message.id}
                                    message={message as Message}
                                    toolStatuses={toolStatuses as Map<string, ToolStatus>}
                                    expandedTools={expandedTools}
                                    onToggleTool={toggleTool}
                                />
                            ))}

                            {/* 加载指示器 */}
                            {isLoading && <TypingIndicator />}

                            {/* 滚动锚点 */}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                </div>

                {/* 消息输入区域 */}
                <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleSubmit} className="flex gap-3">
                            {/* 输入框 */}
                            <div className="flex-1 relative">
                                <input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="向深空助手提问..."
                                    className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* 发送按钮 */}
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-glow"
                            >
                                <Send className="w-4 h-4" />
                                {isLoading ? '处理中...' : '发送'}
                            </button>
                        </form>

                        {/* 提示信息 */}
                        <div className="mt-3 text-xs text-muted-foreground text-center">
                            尝试问我：天气查询、数学计算等问题
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}