import Link from "next/link";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-smooth focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-saffron text-ink shadow-soft hover:shadow-glow hover:-translate-y-0.5 focus-visible:outline-ink",
        ink: "bg-ink text-cloud hover:bg-ink-soft hover:-translate-y-0.5 focus-visible:outline-ink",
        outline:
          "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-cloud focus-visible:outline-ink",
        ghost: "bg-transparent text-ink hover:bg-ink/5 focus-visible:outline-ink",
        light:
          "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:outline-white",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type CommonProps = VariantProps<typeof button> & { className?: string };

export type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonLinkProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Renders a <Link>/<a> when `href` is set, otherwise a <button>. */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => {
    const classes = cn(button({ variant, size }), className);

    if ("href" in props && props.href !== undefined) {
      const { href, ...rest } = props as ButtonLinkProps;
      const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            {...rest}
          />
        );
      }
      return <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} {...rest} />;
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...(props as ButtonProps)} />
    );
  }
);
Button.displayName = "Button";
