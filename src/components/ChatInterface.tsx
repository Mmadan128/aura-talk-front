import React, { useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from '@/components/ChatMessage';
import { TypingIndicator } from '@/components/TypingIndicator';
import { ChatInput } from '@/components/ChatInput';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ChatInterface: React.FC = () => {
  const {
    messages,
    isLoading,
    systemStatus,
    sendMessage,
    clearChat,
    clearMemory,
    checkSystemStatus,
  } = useChat();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check system status on mount and periodically
  useEffect(() => {
    checkSystemStatus();
    const interval = setInterval(checkSystemStatus, 5000);
    return () => clearInterval(interval);
  }, [checkSystemStatus]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-border/50 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-message-text font-bold text-sm">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">AURA</h1>
                <p className="text-xs text-message-text-muted">Language Agnostic AI Assistant</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={systemStatus} />
            
            {messages.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearMemory}
                  className="text-message-text-muted hover:text-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear Memory
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-message-text-muted hover:text-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Chat
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 relative">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 && systemStatus.initialized && (
              <div className="flex items-center justify-center h-full py-12">
                <div className="text-center space-y-4 max-w-md">
                  <div className="h-16 w-16 rounded-full bg-gradient-primary mx-auto flex items-center justify-center">
                    <span className="text-message-text font-bold text-2xl">A</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gradient">Welcome to AURA</h2>
                  <p className="text-message-text-muted">
                    Your language-agnostic AI assistant is ready to help. Ask me anything in any language!
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      "What can you help me with?",
                      "Translate this text",
                      "Explain quantum computing",
                      "Help me with coding",
                    ].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="glass"
                        size="sm"
                        onClick={() => sendMessage(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!systemStatus.initialized && (
              <div className="flex items-center justify-center h-full py-12">
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-primary mx-auto flex items-center justify-center animate-pulse-glow">
                    <span className="text-message-text font-bold text-2xl">A</span>
                  </div>
                  <h2 className="text-xl font-semibold">Initializing AURA</h2>
                  <p className="text-message-text-muted max-w-md">
                    {systemStatus.error || "Setting up the AI assistant and loading knowledge base..."}
                  </p>
                  {systemStatus.build_progress && systemStatus.build_progress.total > 0 && (
                    <div className="space-y-2">
                      <div className="w-64 bg-surface rounded-full h-2 mx-auto">
                        <div
                          className="bg-gradient-primary h-2 rounded-full transition-smooth"
                          style={{
                            width: `${(systemStatus.build_progress.current / systemStatus.build_progress.total) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-message-text-muted">
                        Processing: {systemStatus.build_progress.file}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-0">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isLoading && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={sendMessage}
        isLoading={isLoading}
        disabled={!systemStatus.initialized}
      />
    </div>
  );
};