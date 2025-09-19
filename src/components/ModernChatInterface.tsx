import React, { useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from '@/components/ChatMessage';
import { TypingIndicator } from '@/components/TypingIndicator';
import { ChatInput } from '@/components/ChatInput';
import { StatusBadge } from '@/components/StatusBadge';
import { CurrencyNotice } from '@/components/CurrencyNotice';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, RotateCcw, Sparkles, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ModernChatInterface: React.FC = () => {
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

  useEffect(() => {
    checkSystemStatus();
    const interval = setInterval(checkSystemStatus, 5000);
    return () => clearInterval(interval);
  }, [checkSystemStatus]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl animate-float-gentle" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-secondary opacity-10 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '1s' }} />

      {/* Ultra-Modern Header */}
      <header className="glass-strong border-b border-border/30 px-6 py-4 relative z-10">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
                  <Brain className="h-6 w-6 text-message-text" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-secondary rounded-full animate-float-gentle">
                  <Sparkles className="h-3 w-3 text-message-text m-0.5" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient tracking-tight">AURA</h1>
                <p className="text-sm text-message-text-muted font-medium">
                  Language Agnostic AI Assistant
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <StatusBadge status={systemStatus} />
            
            {messages.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={clearMemory}
                  className="text-message-text-muted hover:text-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear Memory
                </Button>
                
                <Button
                  variant="glass"
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

      {/* Currency Notice */}
      <CurrencyNotice />

      {/* Messages Container */}
      <div className="flex-1 relative z-10">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="max-w-5xl mx-auto px-4">
            {messages.length === 0 && systemStatus.initialized && (
              <div className="flex items-center justify-center h-full py-16">
                <div className="text-center space-y-6 max-w-2xl animate-slide-up">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-3xl bg-gradient-primary mx-auto flex items-center justify-center shadow-floating animate-float-gentle">
                      <Brain className="h-12 w-12 text-message-text" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-secondary rounded-full flex items-center justify-center animate-float-gentle" style={{ animationDelay: '0.5s' }}>
                      <Sparkles className="h-4 w-4 text-message-text" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-4xl font-bold text-gradient">Welcome to AURA</h2>
                    <p className="text-xl text-message-text-muted leading-relaxed">
                      Your sophisticated language-agnostic AI assistant is ready to help. 
                      Ask me anything in any language!
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                    {[
                      { text: "What can you help me with?", icon: "🤔" },
                      { text: "Translate this text", icon: "🌍" },
                      { text: "Explain quantum computing", icon: "⚛️" },
                      { text: "Help me with coding", icon: "💻" },
                    ].map((suggestion, index) => (
                      <Button
                        key={suggestion.text}
                        variant="glass"
                        size="default"
                        onClick={() => sendMessage(suggestion.text)}
                        className="text-sm h-auto py-4 px-4 justify-start text-left animate-slide-in-right"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span className="text-lg mr-3">{suggestion.icon}</span>
                        <span>{suggestion.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!systemStatus.initialized && (
              <div className="flex items-center justify-center h-full py-16">
                <div className="text-center space-y-6 animate-slide-up">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-3xl bg-gradient-primary mx-auto flex items-center justify-center animate-pulse-glow shadow-floating">
                      <Brain className="h-10 w-10 text-message-text" />
                    </div>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-30 animate-aurora blur-xl" />
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gradient">Initializing AURA</h2>
                    <p className="text-message-text-muted max-w-md mx-auto leading-relaxed">
                      {systemStatus.error || "Setting up the AI assistant and loading knowledge base..."}
                    </p>
                  </div>
                  
                  {systemStatus.build_progress && systemStatus.build_progress.total > 0 && (
                    <div className="space-y-4 max-w-sm mx-auto">
                      <div className="relative">
                        <div className="w-full bg-surface-elevated rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-primary h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                            style={{
                              width: `${(systemStatus.build_progress.current / systemStatus.build_progress.total) * 100}%`,
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                          </div>
                        </div>
                        <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-sm" />
                      </div>
                      <p className="text-sm text-message-text-muted font-medium">
                        Processing: {systemStatus.build_progress.file}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-0 pb-4">
              {messages.map((message, index) => (
                <div 
                  key={message.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ChatMessage message={message} />
                </div>
              ))}
              
              {isLoading && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Ultra-Modern Input */}
      <div className="relative z-10">
        <ChatInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          disabled={!systemStatus.initialized}
        />
      </div>
    </div>
  );
};