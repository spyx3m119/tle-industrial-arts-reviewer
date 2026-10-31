// Eagerly import every self-hosted tool photo so Vite hashes and serves them.
// Tools without a photo here fall back to the inline-SVG icons in toolIcons.tsx.
const modules = import.meta.glob('../assets/tools/*.{png,jpg,jpeg,webp}', { eager: true });

export const TOOL_IMAGES: Record<string, string> = {};
for (const [path, mod] of Object.entries(modules)) {
  const base = path.split('/').pop()!.replace(/\.(png|jpg|jpeg|webp)$/i, '');
  TOOL_IMAGES[base] = (mod as { default: string }).default;
}
