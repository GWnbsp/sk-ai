import { useState, useEffect, useCallback } from 'react';
import { ChatHistory, ChatSession, Message } from '@/app/types';
import { 
  formatDate, 
  generateSessionTitle, 
  generateSessionId,
  loadChatHistory,
  saveChatHistory,
  getTodayLatestSession
} from '@/app/utils';

/**
 * 聊天历史管理Hook
 * 提供聊天历史的增删改查功能
 */
export function useChatHistory() {
  const [chatHistory, setChatHistory] = useState<ChatHistory>({});
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  /**
   * 创建新的聊天会话
   * @returns 新创建的会话ID
   */
  const createNewSession = useCallback((): string => {
    const newSessionId = generateSessionId();
    setCurrentSessionId(newSessionId);
    return newSessionId;
  }, []);

  /**
   * 选择指定的聊天会话
   * @param session - 要选择的会话对象
   */
  const selectSession = useCallback((session: ChatSession) => {
    setCurrentSessionId(session.id);
  }, []);

  /**
   * 删除指定的聊天会话
   * @param sessionId - 要删除的会话ID
   */
  const deleteSession = useCallback((sessionId: string) => {
    setChatHistory(prev => {
      const updated = { ...prev };
      
      // 从所有日期中删除指定会话
      for (const date in updated) {
        updated[date] = updated[date].filter(s => s.id !== sessionId);
        // 如果某个日期下没有会话了，删除该日期键
        if (updated[date].length === 0) {
          delete updated[date];
        }
      }
      
      // 保存到本地存储
      saveChatHistory(updated);
      return updated;
    });

    // 如果删除的是当前会话，创建新会话
    if (currentSessionId === sessionId) {
      createNewSession();
    }
  }, [currentSessionId, createNewSession]);

  /**
   * 保存或更新聊天会话
   * @param messages - 会话中的消息数组
   */
  const saveSession = useCallback((messages: { role: string; content: string }[]) => {
    if (!currentSessionId || messages.length === 0) return;

    const today = formatDate(new Date());
    const title = generateSessionTitle(messages);
    
    setChatHistory(prev => {
      const updated = { ...prev };
      
      // 确保今天的日期键存在
      if (!updated[today]) {
        updated[today] = [];
      }
      
      // 查找是否已存在该会话
      const sessionIndex = updated[today].findIndex(s => s.id === currentSessionId);
      
      // 创建会话对象
      const session: ChatSession = {
        id: currentSessionId,
        date: today,
        title,
        messages: [...messages] as Message[],
        createdAt: sessionIndex === -1 ? Date.now() : updated[today][sessionIndex].createdAt,
        updatedAt: Date.now()
      };
      
      // 添加或更新会话
      if (sessionIndex === -1) {
        updated[today].push(session);
      } else {
        updated[today][sessionIndex] = session;
      }
      
      // 保存到本地存储
      saveChatHistory(updated);
      return updated;
    });
  }, [currentSessionId]);

  /**
   * 获取当前会话的消息
   * @returns 当前会话的消息数组，如果没有则返回空数组
   */
  const getCurrentSessionMessages = useCallback((): { role: string; content: string }[] => {
    if (!currentSessionId) return [];
    
    for (const sessions of Object.values(chatHistory)) {
      const session = sessions.find(s => s.id === currentSessionId);
      if (session) return session.messages;
    }
    
    return [];
  }, [currentSessionId, chatHistory]);

  /**
   * 初始化聊天历史
   * 从本地存储加载历史记录，并设置当前会话
   */
  useEffect(() => {
    const history = loadChatHistory() as ChatHistory;
    setChatHistory(history);

    // 检查今天是否已有对话
    const latestSession = getTodayLatestSession(history as Record<string, ChatSession[]>);
    
    if (latestSession) {
      // 加载今天最新的对话
      setCurrentSessionId(latestSession.id);
    } else {
      // 创建新的对话
      createNewSession();
    }
  }, [createNewSession]);

  return {
    chatHistory,
    currentSessionId,
    createNewSession,
    selectSession,
    deleteSession,
    saveSession,
    getCurrentSessionMessages
  };
} 