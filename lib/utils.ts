type ClassValue = string | number | false | null | undefined;

/** Joins truthy class names. Local stand-in for `clsx` to avoid an extra dependency. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
