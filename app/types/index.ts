import React from 'react';

/**
 * 消息接口
 * 定义聊天消息的基本结构
 */
export interface Message {
  /** 消息ID */
  id: string;
  /** 消息角色 */
  role: 'user' | 'assistant' | 'system';
  /** 消息内容 */
  content: string;
  /** 工具调用列表 */
  toolInvocations?: ToolCall[];
}

/**
 * 工具调用接口
 * 定义AI工具调用的结构
 */
export interface ToolCall {
  /** 工具调用ID */
  toolCallId: string;
  /** 工具名称 */
  toolName: string;
  /** 工具参数 */
  args: Record<string, unknown>;
  /** 工具执行结果 */
  result?: unknown;
}

/**
 * 工具状态接口
 * 定义工具执行状态的结构
 */
export interface ToolStatus {
  /** 状态类型 */
  status: 'searching' | 'calculating' | 'processing' | 'completed' | 'error';
  /** 状态消息 */
  message?: string;
  /** 执行进度 */
  progress?: number;
  /** 错误信息 */
  error?: string;
  /** 时间戳 */
  timestamp?: number;
}

/**
 * 聊天会话接口
 * 定义单个对话会话的数据结构
 */
export interface ChatSession {
  /** 会话唯一标识符 */
  id: string;
  /** 会话日期 (YYYY-MM-DD 格式) */
  date: string;
  /** 会话标题 */
  title: string;
  /** 会话中的所有消息 */
  messages: Message[];
  /** 会话创建时间戳 */
  createdAt: number;
  /** 会话最后更新时间戳 */
  updatedAt: number;
}

/**
 * 聊天历史记录接口
 * 按日期分组的会话历史记录
 */
export interface ChatHistory {
  /** 日期作为键，对应该日期的所有会话 */
  [date: string]: ChatSession[];
}

/**
 * 工具状态配置接口
 * 定义工具执行状态的显示配置
 */
export interface ToolStatusConfig {
  /** 状态图标组件 */
  icon: React.ComponentType<{ className?: string }>;
  /** 状态颜色类名 */
  color: string;
  /** 状态背景色类名 */
  bg: string;
  /** 状态显示标签 */
  label: string;
}

/**
 * 工具状态映射接口
 * 定义所有可能的工具执行状态
 */
export interface ToolStatusMap {
  searching: ToolStatusConfig;
  calculating: ToolStatusConfig;
  processing: ToolStatusConfig;
  completed: ToolStatusConfig;
  error: ToolStatusConfig;
}

/**
 * 消息组件属性接口
 */
export interface MessageProps {
  /** 消息对象 */
  message: Message;
  /** 工具状态映射 */
  toolStatuses: Map<string, ToolStatus>;
  /** 展开的工具集合 */
  expandedTools: Set<string>;
  /** 切换工具展开状态的回调函数 */
  onToggleTool: (toolCallId: string) => void;
}

/**
 * 历史对话侧边栏属性接口
 */
export interface HistorySidebarProps {
  /** 聊天历史记录 */
  chatHistory: ChatHistory;
  /** 当前会话ID */
  currentSessionId: string | null;
  /** 选择会话的回调函数 */
  onSelectSession: (session: ChatSession) => void;
  /** 创建新对话的回调函数 */
  onNewChat: () => void;
  /** 删除会话的回调函数 */
  onDeleteSession: (sessionId: string) => void;
  /** 侧边栏是否打开 */
  isOpen: boolean;
  /** 切换侧边栏状态的回调函数 */
  onToggle: () => void;
}

/**
 * 工具调用卡片属性接口
 */
export interface ToolCallCardProps {
  /** 工具调用对象 */
  toolCall: ToolCall;
  /** 工具状态 */
  status?: ToolStatus;
  /** 是否展开 */
  isExpanded: boolean;
  /** 切换展开状态的回调函数 */
  onToggle: () => void;
}

/**
 * 天气结果数据接口
 */
export interface WeatherResult {
  /** 位置 */
  location: string;
  /** 温度 */
  temperature: number;
  /** 天气状况 */
  condition: string;
  /** 湿度 */
  humidity: number;
  /** 风速 */
  windSpeed: number;
  /** 时间戳 */
  timestamp: string;
}

/**
 * 计算结果数据接口
 */
export interface CalculatorResult {
  /** 计算表达式 */
  expression: string;
  /** 计算结果 */
  result: number;
  /** 时间戳 */
  timestamp: string;
} 