import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nebula-400 focus-visible:ring-offset-2 focus-visible:ring-offset-space-950 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-nebula-500 text-space-950 font-semibold shadow-[0_8px_30px_-8px_rgba(0,255,240,0.5)] hover:bg-nebula-400 hover:shadow-[0_12px_40px_-8px_rgba(0,255,240,0.65)] hover:-translate-y-0.5 active:translate-y-0",
        gradient:
          "text-space-950 font-semibold shadow-[0_8px_30px_-8px_rgba(0,255,240,0.55)] bg-[linear-gradient(110deg,var(--color-nebula-400),var(--color-nebula-500)_45%,var(--color-cosmos-400))] bg-[length:200%_auto] hover:bg-[position:100%_center] hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "glass text-white hover:border-hairline-strong hover:bg-white/[0.06] hover:-translate-y-0.5 active:translate-y-0",
        ghost:
          "text-stardust hover:text-white hover:bg-white/[0.05]",
        outline:
          "border border-hairline-strong text-white hover:bg-white/[0.05] hover:-translate-y-0.5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base [&_svg]:size-5",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
