import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AudioControls } from '@/components/AudioControls';
import { User, Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fixCurrencyInText } from '@/utils/currency';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        "group flex gap-4 px-6 py-8 animate-slide-up relative",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Enhanced Avatar */}
      <div className="relative shrink-0">
        <Avatar className={cn(
          "h-10 w-10 ring-2 ring-offset-2 ring-offset-background transition-spring",
          isUser 
            ? "bg-gradient-secondary ring-accent-secondary/30" 
            : "bg-gradient-primary ring-primary/30 shadow-glow-soft"
        )}>
          <AvatarFallback className="bg-transparent">
            {isUser ? (
              <User className="h-5 w-5 text-message-text" />
            ) : (
              <Bot className="h-5 w-5 text-message-text" />
            )}
          </AvatarFallback>
        </Avatar>
        
        {/* AI Assistant Sparkle */}
        {!isUser && (
          <div className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-secondary rounded-full flex items-center justify-center animate-float-gentle">
            <Sparkles className="h-3 w-3 text-message-text" />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex flex-col space-y-3 max-w-[80%] sm:max-w-[70%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* Message Bubble */}
        <div
          className={cn(
            "rounded-3xl px-6 py-4 shadow-elevated transition-spring relative overflow-hidden backdrop-blur-sm",
            isUser
              ? "bg-gradient-secondary text-message-text rounded-br-lg"
              : "glass-strong text-message-text rounded-bl-lg border border-border/20"
          )}
        >
          {/* Shimmer effect for bot messages */}
          {!isUser && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />
          )}
          
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words relative z-10 font-medium">
            {isUser ? message.content : fixCurrencyInText(message.content)}
          </p>
        </div>
        
        {/* Message Footer */}
        <div className={cn(
          "flex items-center gap-3 px-2",
          isUser ? "flex-row-reverse" : "flex-row"
        )}>
          <span className="text-xs text-message-text-muted font-medium">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          
          {/* Audio Controls - Only for bot messages */}
          {!isUser && (
            <AudioControls 
              text={message.content}
              className="opacity-0 group-hover:opacity-100 transition-smooth"
            />
          )}
        </div>
      </div>
    </div>
  );
};