import React from 'react';
import { SystemStatus } from '@/types/chat';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: SystemStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusInfo = () => {
    if (status.error) {
      return {
        text: 'Error',
        icon: AlertCircle,
        className: 'bg-error/10 text-error border-error/20',
      };
    }
    
    if (!status.initialized) {
      const progress = status.build_progress;
      if (progress && progress.total > 0) {
        const percentage = Math.round((progress.current / progress.total) * 100);
        return {
          text: `Loading ${percentage}%`,
          icon: Loader2,
          className: 'bg-warning/10 text-warning border-warning/20 animate-pulse',
          iconClassName: 'animate-spin',
        };
      }
      
      return {
        text: 'Initializing',
        icon: Loader2,
        className: 'bg-warning/10 text-warning border-warning/20',
        iconClassName: 'animate-spin',
      };
    }
    
    return {
      text: 'Ready',
      icon: CheckCircle,
      className: 'bg-success/10 text-success border-success/20',
    };
  };

  const { text, icon: Icon, className: statusClassName, iconClassName } = getStatusInfo();

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium transition-smooth",
        statusClassName,
        className
      )}
    >
      <Icon className={cn("h-3 w-3", iconClassName)} />
      {text}
    </Badge>
  );
};