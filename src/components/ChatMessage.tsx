import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        "group flex gap-3 px-4 py-6 animate-message-slide-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className={cn(
        "h-8 w-8 shrink-0 transition-smooth",
        isUser ? "bg-user-message" : "bg-gradient-primary"
      )}>
        <AvatarFallback className="bg-transparent">
          {isUser ? (
            <User className="h-4 w-4 text-message-text" />
          ) : (
            <Bot className="h-4 w-4 text-message-text" />
          )}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "flex flex-col space-y-2 max-w-[85%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-sm transition-smooth",
            isUser
              ? "bg-user-message text-message-text rounded-br-md"
              : "bg-bot-message text-message-text rounded-bl-md glass"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
        
        <span className="text-xs text-message-text-muted px-2">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};