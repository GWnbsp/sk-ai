import { ChatSession } from '@/app/types';
import { Cloud, Calculator, Activity } from 'lucide-react';

/**
 * 将日期对象格式化为 YYYY-MM-DD 字符串
 * @param date - 要格式化的日期对象
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * 将日期字符串转换为友好的显示格式
 * @param dateStr - 日期字符串 (YYYY-MM-DD 格式)
 * @returns 友好的日期显示文本 (今天/昨天/具体日期)
 */
export function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (formatDate(date) === formatDate(today)) {
    return '今天';
  } else if (formatDate(date) === formatDate(yesterday)) {
    return '昨天';
  } else {
    return date.toLocaleDateString('zh-CN', { 
      month: '2-digit', 
      day: '2-digit',
      weekday: 'short'
    });
  }
}

/**
 * 根据消息内容生成会话标题
 * @param messages - 消息数组
 * @returns 生成的会话标题
 */
export function generateSessionTitle(messages: { role: string; content: string }[]): string {
  const firstUserMessage = messages.find(m => m.role === 'user');
  if (firstUserMessage && firstUserMessage.content) {
    const content = firstUserMessage.content.slice(0, 20);
    return content.length > 20 ? content + '...' : content;
  }
  return '新对话';
}

/**
 * 根据天气状况获取对应的天气图标
 * @param condition - 天气状况描述
 * @returns 天气图标emoji
 */
export function getWeatherIcon(condition: string): string {
  if (condition.includes('晴')) return '☀️';
  if (condition.includes('云')) return '☁️';
  if (condition.includes('雨')) return '🌧️';
  if (condition.includes('雷')) return '⛈️';
  if (condition.includes('雪')) return '❄️';
  return '🌤️';
}

/**
 * 根据工具名称获取对应的工具图标组件
 * @param toolName - 工具名称
 * @returns 图标组件类
 */
export function getToolIcon(toolName: string) {
  switch (toolName) {
    case 'weather': return Cloud;
    case 'calculator': return Calculator;
    default: return Activity;
  }
}

/**
 * 根据工具名称获取对应的中文显示名称
 * @param toolName - 工具名称
 * @returns 中文显示名称
 */
export function getToolName(toolName: string): string {
  switch (toolName) {
    case 'weather': return '天气查询';
    case 'calculator': return '数学计算';
    default: return toolName;
  }
}

/**
 * 生成唯一的会话ID
 * @returns 基于时间戳的唯一会话ID
 */
export function generateSessionId(): string {
  return `session-${Date.now()}`;
}

/**
 * 从本地存储加载聊天历史记录
 * @returns 聊天历史记录对象
 */
export function loadChatHistory(): Record<string, unknown> {
  if (typeof window === 'undefined') return {};
  
  const saved = localStorage.getItem('chat-history');
  return saved ? JSON.parse(saved) : {};
}

/**
 * 将聊天历史记录保存到本地存储
 * @param history - 要保存的聊天历史记录
 */
export function saveChatHistory(history: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('chat-history', JSON.stringify(history));
}

/**
 * 获取今天日期的最新会话
 * @param history - 聊天历史记录
 * @returns 今天最新的会话，如果没有则返回null
 */
export function getTodayLatestSession(history: Record<string, ChatSession[]>): ChatSession | null {
  const today = formatDate(new Date());
  const todaySessions = history[today] || [];
  
  if (todaySessions.length === 0) return null;
  
  return todaySessions.reduce((latest: ChatSession, session: ChatSession) => 
    session.updatedAt > latest.updatedAt ? session : latest
  );
} 