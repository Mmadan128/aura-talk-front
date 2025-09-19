import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-message-text hover:opacity-90 shadow-glow-soft hover:shadow-glow spotlight",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-elevated",
        outline: "border border-border bg-transparent hover:bg-surface-elevated text-foreground backdrop-blur-sm",
        secondary: "bg-surface-elevated text-foreground hover:bg-surface-glass glass",
        ghost: "hover:bg-surface-elevated hover:text-foreground transition-smooth",
        link: "text-primary underline-offset-4 hover:underline",
        chat: "bg-gradient-primary text-message-text hover:opacity-90 rounded-full shadow-glow-soft hover:shadow-glow floating",
        glass: "glass text-foreground hover:bg-surface-elevated backdrop-blur-md border border-border/30",
        premium: "bg-gradient-secondary text-message-text hover:opacity-90 shadow-floating animate-shimmer",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm font-medium",
        sm: "h-9 rounded-xl px-4 text-xs font-medium",
        lg: "h-12 rounded-2xl px-8 text-base font-semibold",
        icon: "h-11 w-11 rounded-2xl",
        chat: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
