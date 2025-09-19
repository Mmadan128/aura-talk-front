import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-4 px-6 py-8 animate-slide-up">
      {/* Enhanced Avatar */}
      <div className="relative shrink-0">
        <Avatar className="h-10 w-10 bg-gradient-primary ring-2 ring-primary/30 ring-offset-2 ring-offset-background shadow-glow-soft">
          <AvatarFallback className="bg-transparent">
            <Bot className="h-5 w-5 text-message-text" />
          </AvatarFallback>
        </Avatar>
        
        <div className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-secondary rounded-full flex items-center justify-center animate-float-gentle">
          <Sparkles className="h-3 w-3 text-message-text" />
        </div>
      </div>

      {/* Typing Animation */}
      <div className="flex flex-col space-y-3 max-w-[80%] sm:max-w-[70%]">
        <div className="glass-strong text-message-text rounded-3xl rounded-bl-lg px-6 py-4 border border-border/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />
          
          <div className="flex space-x-2 relative z-10">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="w-2.5 h-2.5 bg-gradient-primary rounded-full animate-typing-dots shadow-glow-soft" 
                style={{ animationDelay: `${i * 200}ms` }} 
              />
            ))}
          </div>
        </div>
        
        <span className="text-xs text-message-text-muted font-medium px-2">
          AURA is thinking...
        </span>
      </div>
    </div>
  );
};