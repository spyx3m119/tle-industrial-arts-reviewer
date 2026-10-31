import { TOOL_ICONS } from '../data/toolIcons';
import { TOOL_IMAGES } from '../data/toolImages';

export function ToolIcon({ id, size = 180 }: { id: string; size?: number }) {
  // Prefer a self-hosted real photo; fall back to the inline-SVG icon.
  const img = TOOL_IMAGES[id];
  if (img) {
    return (
      <div style={{ width: size, height: size, lineHeight: 0 }}>
        <img
          src={img}
          alt={id.replace(/_/g, ' ')}
          style={{
            width: size,
            height: size,
            objectFit: 'contain',
            display: 'block',
            background: 'linear-gradient(135deg, #f8fafc, #eef2ff)',
            borderRadius: 10,
          }}
        />
      </div>
    );
  }

  const Comp = TOOL_ICONS[id as keyof typeof TOOL_ICONS];
  if (!Comp) {
    return (
      <div
        style={{
          width: size,
          height: size,
          display: 'grid',
          placeItems: 'center',
          color: '#94a3b8',
          fontSize: 14,
        }}
      >
        unknown
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size, lineHeight: 0 }} aria-hidden="true">
      <Comp />
    </div>
  );
}
