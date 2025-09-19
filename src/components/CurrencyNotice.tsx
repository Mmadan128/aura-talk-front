import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Info, X } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto px-4 py-3">
      <Alert className="bg-warning/10 border-warning/20 text-warning">
        <Info className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm">
            <strong>Currency Notice:</strong> The AI backend is converting fees to euros. 
            All amounts are automatically converted to rupees (₹) in the display for your convenience.
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 hover:bg-warning/20"
          >
            <X className="h-3 w-3" />
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};