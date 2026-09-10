import { forwardRef, type ComponentPropsWithoutRef } from "react";

function classes(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

const Avatar = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={classes("avatar-root", className)} {...props} />
  ),
);
Avatar.displayName = "Avatar";

const AvatarImage = forwardRef<HTMLImageElement, ComponentPropsWithoutRef<"img">>(
  ({ className, alt = "", ...props }, ref) => (
    <img ref={ref} className={classes("avatar-image", className)} alt={alt} {...props} />
  ),
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={classes("avatar-fallback", className)} {...props} />
  ),
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarFallback, AvatarImage };
