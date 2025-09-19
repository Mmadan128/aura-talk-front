import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Info, X, Sparkles } from 'lucide-react';

export const CurrencyNotice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('currency-notice-dismissed');
  });

  const handleDismiss = () => {
    localStorage.setItem('currency-notice-dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-3">
      <Alert className="glass border-warning/30 bg-warning/5 text-warning shadow-glow-soft animate-slide-up">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <Sparkles className="h-3 w-3 animate-float-gentle" />
        </div>
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm font-medium">
            <strong>Currency Notice:</strong> The AI backend is converting fees to euros. 
            All amounts are automatically converted to rupees (₹) in the display for your convenience.
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-8 w-8 p-0 hover:bg-warning/20 rounded-full"
          >
            <X className="h-3 w-3" />
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};