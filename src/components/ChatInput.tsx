import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  disabled = false 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current && !isLoading) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  return (
    <div className="glass-strong border-t border-border/30 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="flex items-end gap-4 p-6 max-w-5xl mx-auto">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "System initializing..." : "Type your message... (Shift+Enter for new line)"}
            disabled={disabled || isLoading}
            rows={1}
            className={cn(
              "w-full resize-none rounded-3xl border border-border/30 bg-surface-glass/80 px-6 py-4 text-sm text-foreground placeholder-message-text-muted transition-spring focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 backdrop-blur-sm font-medium",
              "scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
            )}
            style={{ maxHeight: '200px' }}
          />
          
          {/* Input Enhancement */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-5 pointer-events-none" />
        </div>
        
        <Button
          type="submit"
          variant="chat"
          size="chat"
          disabled={!message.trim() || isLoading || disabled}
          className={cn(
            "shrink-0 transition-spring shadow-floating",
            (!message.trim() || isLoading || disabled) && "opacity-50"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
        
        {/* Floating Action Indicator */}
        {message.trim() && !isLoading && !disabled && (
          <div className="absolute right-20 bottom-8 pointer-events-none">
            <div className="flex items-center gap-2 bg-gradient-primary text-message-text px-3 py-1.5 rounded-full text-xs font-medium shadow-glow-soft animate-slide-in-right">
              <Sparkles className="h-3 w-3" />
              Press Enter to send
            </div>
          </div>
        )}
      </form>
    </div>
  );
};