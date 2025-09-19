import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 px-4 py-6 animate-message-slide-in">
      <Avatar className="h-8 w-8 shrink-0 bg-gradient-primary">
        <AvatarFallback className="bg-transparent">
          <Bot className="h-4 w-4 text-message-text" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col space-y-2 max-w-[85%]">
        <div className="bg-bot-message text-message-text rounded-2xl rounded-bl-md px-4 py-3 glass">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-message-text-muted rounded-full animate-typing-dots" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-message-text-muted rounded-full animate-typing-dots" style={{ animationDelay: '200ms' }} />
            <div className="w-2 h-2 bg-message-text-muted rounded-full animate-typing-dots" style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};