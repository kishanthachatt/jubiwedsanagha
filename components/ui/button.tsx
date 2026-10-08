import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm tracking-[0.18em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-plum text-cream px-7 py-3.5 hover:bg-deep-plum shadow-[0_10px_30px_-18px_rgba(63,32,63,0.8)]",
        outline:
          "border border-champagne/80 bg-cream/40 text-espresso px-7 py-3.5 hover:border-dusty-rose hover:bg-ivory",
        ghost: "text-burgundy hover:text-deep-plum px-3 py-2 tracking-[0.12em]",
      },
      size: {
        default: "min-h-12",
        sm: "min-h-10 px-5 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>(({ className, variant, size, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
));

Button.displayName = "Button";
