/** Minimal `cn()` class-name merger for shadcn-style components. */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(' ');
}
