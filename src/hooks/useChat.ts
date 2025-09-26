import { useState, useRef, useCallback } from 'react';
import { ChatMessage, ChatResponse, SystemStatus } from '@/types/chat';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({ initialized: false });
  const sessionIdRef = useRef<string>();

  const checkSystemStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/init-status`);
      const status = await response.json();
      setSystemStatus(status);
      return status;
    } catch (error) {
      console.error('Failed to check system status:', error);
      setSystemStatus({ initialized: false, error: 'Connection failed' });
      return { initialized: false, error: 'Connection failed' };
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          session_id: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data: ChatResponse = await response.json();
      
      // Store session ID
      sessionIdRef.current = data.session_id;

      // Create assistant message
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
        session_id: data.session_id,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    sessionIdRef.current = undefined;
  }, []);

  const clearMemory = useCallback(async () => {
    if (!sessionIdRef.current) return;

    try {
      await fetch(`${API_BASE_URL}/memory/${sessionIdRef.current}`, {
        method: 'DELETE',
      });
      clearChat();
    } catch (error) {
      console.error('Failed to clear memory:', error);
    }
  }, [clearChat]);

  return {
    messages,
    isLoading,
    systemStatus,
    sendMessage,
    clearChat,
    clearMemory,
    checkSystemStatus,
  };
};