import type { ReactElement, ReactNode } from 'react';

// ============================================================
//  Self-contained SVG tool icons for Picture-ID questions.
//  No external images -> nothing to break when self-hosted.
// ============================================================

const MET = '#94a3b8';
const METD = '#475569';
const STEEL = '#cbd5e1';
const WOOD = '#c2882f';
const WOODD = '#8b5a2b';
const BLUE = '#2563eb';
const RED = '#dc2626';
const YEL = '#eab308';

function S({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className="tool-icon"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="116" height="116" rx="16" fill="#f8fafc" />
      <g stroke="#0f172a" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" fill="none">
        {children}
      </g>
    </svg>
  );
}

const ClawHammer = () => (
  <S>
    <rect x="54" y="52" width="12" height="60" rx="5" fill={WOOD} />
    <rect x="30" y="34" width="58" height="18" rx="6" fill={METD} />
    <path d="M30,36 L18,28 L25,42 Z" fill={METD} />
    <path d="M30,50 L18,58 L25,46 Z" fill={METD} />
  </S>
);

const RubberMallet = () => (
  <S>
    <rect x="54" y="52" width="12" height="60" rx="5" fill={WOOD} />
    <rect x="26" y="30" width="68" height="26" rx="12" fill="#334155" />
    <line x1="40" y1="34" x2="40" y2="52" />
    <line x1="80" y1="34" x2="80" y2="52" />
  </S>
);

const FlatPliers = () => (
  <S>
    <path d="M56,52 L49,26 L59,26 L61,50 Z" fill={MET} />
    <path d="M64,52 L71,26 L61,26 L59,50 Z" fill={MET} />
    <path d="M58,56 L45,106 L55,106 L63,58 Z" fill={BLUE} />
    <path d="M62,56 L75,106 L65,106 L57,58 Z" fill={BLUE} />
    <circle cx="60" cy="54" r="4" fill={METD} />
  </S>
);

const LongNosePliers = () => (
  <S>
    <path d="M57,50 L53,16 L60,16 L60,50 Z" fill={MET} />
    <path d="M63,50 L67,16 L60,16 L60,50 Z" fill={MET} />
    <rect x="50" y="56" width="10" height="52" rx="4" fill={RED} />
    <rect x="60" y="56" width="10" height="52" rx="4" fill={RED} />
    <circle cx="60" cy="54" r="3.5" fill={METD} />
  </S>
);

const SideCuttingPliers = () => (
  <S>
    <path d="M42,28 L78,28 L74,54 L46,54 Z" fill={MET} />
    <line x1="48" y1="41" x2="72" y2="41" stroke={METD} strokeWidth="4" />
    <rect x="46" y="54" width="12" height="56" rx="5" fill={RED} />
    <rect x="62" y="54" width="12" height="56" rx="5" fill={RED} />
    <circle cx="60" cy="54" r="3.5" fill={METD} />
  </S>
);

const AdjustableWrench = () => (
  <S>
    <rect x="54" y="52" width="12" height="62" rx="5" fill={METD} />
    <path d="M40,16 h40 a6,6 0 0 1 6,6 v12 h-14 v-8 h-24 v8 h-14 v-12 a6,6 0 0 1 6,-6 z" fill={MET} />
    <circle cx="60" cy="30" r="3" fill={METD} />
  </S>
);

const FlatScrewdriver = () => (
  <S>
    <rect x="52" y="16" width="16" height="46" rx="7" fill={BLUE} />
    <rect x="56" y="62" width="8" height="40" rx="2" fill={MET} />
    <rect x="52" y="100" width="16" height="8" rx="2" fill={METD} />
  </S>
);

const PhillipsScrewdriver = () => (
  <S>
    <rect x="52" y="16" width="16" height="46" rx="7" fill={RED} />
    <rect x="56" y="62" width="8" height="38" rx="2" fill={MET} />
    <path d="M54,100 h12 l-6,14 z" fill={METD} />
  </S>
);

const HandSaw = () => (
  <S>
    <path d="M20,46 L84,32 L84,58 Z" fill={STEEL} />
    <path
      d="M20,46 L84,58"
      stroke={METD}
      strokeWidth="3"
      strokeDasharray="2.5,3.5"
    />
    <ellipse cx="96" cy="46" rx="16" ry="22" fill={WOOD} />
    <ellipse cx="96" cy="46" rx="8" ry="13" fill="#f8fafc" />
  </S>
);

const HackSaw = () => (
  <S>
    <path d="M20,50 V26 H98 V70 H86 V38 H32 V50 Z" fill="#f43f5e" />
    <rect x="30" y="46" width="56" height="4" fill={STEEL} />
    <rect x="90" y="54" width="22" height="10" rx="4" fill={WOOD} />
  </S>
);

const WoodChisel = () => (
  <S>
    <rect x="50" y="12" width="20" height="30" rx="8" fill={WOOD} />
    <rect x="55" y="42" width="10" height="52" fill={MET} />
    <path d="M55,94 h10 l-5,12 z" fill={METD} />
  </S>
);

const MetalFile = () => (
  <S>
    <rect x="96" y="42" width="18" height="20" rx="5" fill={WOOD} />
    <path d="M22,46 L96,44 L96,60 L22,58 Z" fill={MET} />
    <line x1="30" y1="48" x2="34" y2="56" stroke={METD} strokeWidth="2" />
    <line x1="42" y1="48" x2="46" y2="56" stroke={METD} strokeWidth="2" />
    <line x1="54" y1="47" x2="58" y2="55" stroke={METD} strokeWidth="2" />
    <line x1="66" y1="47" x2="70" y2="55" stroke={METD} strokeWidth="2" />
    <line x1="78" y1="46" x2="82" y2="54" stroke={METD} strokeWidth="2" />
  </S>
);

const TrySquare = () => (
  <S>
    <rect x="18" y="28" width="76" height="12" fill={MET} />
    <rect x="18" y="40" width="26" height="56" rx="3" fill={WOOD} />
  </S>
);

const VernierCaliper = () => (
  <S>
    <rect x="16" y="46" width="90" height="10" fill={MET} />
    <rect x="16" y="20" width="10" height="26" fill={METD} />
    <rect x="16" y="56" width="10" height="26" fill={METD} />
    <rect x="46" y="20" width="10" height="26" fill={METD} />
    <rect x="46" y="56" width="10" height="26" fill={METD} />
    <rect x="42" y="40" width="18" height="30" fill={MET} />
    <line x1="24" y1="46" x2="24" y2="52" stroke={METD} />
    <line x1="32" y1="46" x2="32" y2="52" stroke={METD} />
    <line x1="80" y1="46" x2="80" y2="52" stroke={METD} />
    <line x1="88" y1="46" x2="88" y2="52" stroke={METD} />
  </S>
);

const TapeMeasure = () => (
  <S>
    <rect x="28" y="32" width="64" height="58" rx="12" fill={YEL} />
    <rect x="44" y="22" width="32" height="14" rx="4" fill={METD} />
    <rect x="92" y="56" width="22" height="9" fill={MET} />
    <circle cx="60" cy="63" r="13" fill="#0f172a" />
    <text x="60" y="68" fontSize="14" fontWeight="700" fill={YEL} textAnchor="middle" stroke="none">3m</text>
  </S>
);

const SteelRuler = () => (
  <S>
    <rect x="14" y="52" width="92" height="16" rx="2" fill={MET} />
    <line x1="20" y1="52" x2="20" y2="58" stroke={METD} />
    <line x1="32" y1="52" x2="32" y2="57" stroke={METD} />
    <line x1="44" y1="52" x2="44" y2="58" stroke={METD} />
    <line x1="56" y1="52" x2="56" y2="57" stroke={METD} />
    <line x1="68" y1="52" x2="68" y2="58" stroke={METD} />
    <line x1="80" y1="52" x2="80" y2="57" stroke={METD} />
    <line x1="92" y1="52" x2="92" y2="58" stroke={METD} />
  </S>
);

const HandPlane = () => (
  <S>
    <rect x="18" y="66" width="84" height="12" rx="3" fill={METD} />
    <rect x="56" y="36" width="12" height="32" rx="2" fill={MET} transform="rotate(-18 62 52)" />
    <path d="M74,66 v-14 a10,10 0 0 1 20,0 v14 z" fill={WOOD} />
    <path d="M28,66 v-8 a7,7 0 0 1 14,0 v8 z" fill={WOOD} />
  </S>
);

const Hatchet = () => (
  <S>
    <rect x="54" y="40" width="12" height="70" rx="5" fill={WOOD} />
    <path d="M36,18 L60,18 L60,44 L36,44 Z" fill={METD} />
    <path d="M36,18 q-13,13 0,26 z" fill={MET} />
  </S>
);

const CenterPunch = () => (
  <S>
    <rect x="52" y="24" width="16" height="56" rx="6" fill={METD} />
    <line x1="52" y1="36" x2="68" y2="36" stroke={MET} />
    <line x1="52" y1="48" x2="68" y2="48" stroke={MET} />
    <line x1="52" y1="60" x2="68" y2="60" stroke={MET} />
    <path d="M56,80 l4,18 l4,-18 z" fill={MET} />
  </S>
);

const SpiritLevel = () => (
  <S>
    <rect x="12" y="50" width="96" height="20" rx="4" fill={YEL} />
    <rect x="20" y="54" width="10" height="12" rx="3" fill="#0f172a" />
    <rect x="90" y="54" width="10" height="12" rx="3" fill="#0f172a" />
    <rect x="50" y="54" width="22" height="12" rx="6" fill="#d1fae5" />
    <circle cx="61" cy="60" r="3.5" fill="#0891b2" />
  </S>
);

const CClamp = () => (
  <S>
    <rect x="24" y="30" width="12" height="60" rx="3" fill={METD} />
    <rect x="24" y="30" width="42" height="12" fill={METD} />
    <rect x="24" y="78" width="42" height="12" fill={METD} />
    <rect x="64" y="42" width="22" height="6" fill={MET} />
    <rect x="82" y="36" width="8" height="18" rx="3" fill={METD} />
  </S>
);

const PaintBrush = () => (
  <S>
    <rect x="44" y="16" width="32" height="22" fill="#fde68a" />
    <line x1="50" y1="18" x2="50" y2="36" stroke="#d97706" />
    <line x1="60" y1="18" x2="60" y2="36" stroke="#d97706" />
    <line x1="70" y1="18" x2="70" y2="36" stroke="#d97706" />
    <rect x="42" y="38" width="36" height="10" fill={MET} />
    <rect x="50" y="48" width="20" height="58" rx="5" fill={WOOD} />
  </S>
);

const WireStripper = () => (
  <S>
    <path d="M50,30 L70,30 L66,52 L54,52 Z" fill={MET} />
    <circle cx="60" cy="40" r="4" fill="#f8fafc" />
    <rect x="50" y="54" width="9" height="52" rx="4" fill={RED} />
    <rect x="61" y="54" width="9" height="52" rx="4" fill={RED} />
    <circle cx="60" cy="54" r="3.5" fill={METD} />
  </S>
);

const ElectricalTape = () => (
  <S>
    <circle cx="58" cy="56" r="34" fill="#0f172a" />
    <circle cx="58" cy="56" r="13" fill="#f8fafc" />
    <rect x="58" y="56" width="34" height="9" fill="#0f172a" />
  </S>
);

const Fuse = () => (
  <S>
    <rect x="30" y="46" width="60" height="26" rx="8" fill={YEL} />
    <rect x="20" y="51" width="12" height="16" rx="2" fill={MET} />
    <rect x="88" y="51" width="12" height="16" rx="2" fill={MET} />
    <line x1="46" y1="46" x2="46" y2="72" stroke={METD} />
    <line x1="74" y1="46" x2="74" y2="72" stroke={METD} />
  </S>
);

const DuplexOutlet = () => (
  <S>
    <rect x="36" y="24" width="48" height="72" rx="8" fill="#e2e8f0" />
    <rect x="50" y="38" width="4" height="10" fill="#0f172a" />
    <rect x="66" y="38" width="4" height="10" fill="#0f172a" />
    <circle cx="60" cy="60" r="3" fill="#0f172a" />
    <rect x="50" y="64" width="4" height="10" fill="#0f172a" />
    <rect x="66" y="64" width="4" height="10" fill="#0f172a" />
    <circle cx="60" cy="84" r="3" fill="#0f172a" />
  </S>
);

const Switch = () => (
  <S>
    <rect x="40" y="28" width="40" height="64" rx="6" fill="#e2e8f0" />
    <rect x="55" y="46" width="10" height="26" rx="3" fill={METD} />
  </S>
);

const LampHolder = () => (
  <S>
    <circle cx="60" cy="38" r="22" fill="#fde68a" />
    <rect x="48" y="58" width="24" height="10" fill={MET} />
    <rect x="46" y="68" width="28" height="30" rx="4" fill={METD} />
    <line x1="50" y1="76" x2="70" y2="76" stroke={MET} />
    <line x1="50" y1="84" x2="70" y2="84" stroke={MET} />
  </S>
);

const ExtensionCord = () => (
  <S>
    <path
      d="M28,84 C28,52 52,52 62,62 S96,72 96,40"
      fill="none"
      stroke={BLUE}
      strokeWidth="6"
      strokeLinecap="round"
    />
    <rect x="18" y="80" width="20" height="14" rx="3" fill={METD} />
    <rect x="14" y="84" width="4" height="6" fill={MET} />
    <rect x="92" y="26" width="20" height="16" rx="4" fill="#0f172a" />
  </S>
);

const Multimeter = () => (
  <S>
    <rect x="34" y="22" width="52" height="74" rx="8" fill={RED} />
    <rect x="42" y="30" width="36" height="18" rx="2" fill="#d1fae5" />
    <circle cx="60" cy="70" r="12" fill="#0f172a" />
    <line x1="60" y1="70" x2="68" y2="62" stroke={YEL} strokeWidth="2.5" />
    <path d="M44,96 q4,10 0,16" fill="none" stroke={METD} strokeWidth="3" />
    <path d="M76,96 q-4,10 0,16" fill="none" stroke={METD} strokeWidth="3" />
  </S>
);

const SolderingIron = () => (
  <S>
    <rect x="18" y="44" width="52" height="14" rx="7" fill={WOOD} />
    <rect x="70" y="48" width="24" height="6" fill={MET} />
    <path d="M94,48 l14,6 l-14,6 z" fill={METD} />
  </S>
);

const TestLamp = () => (
  <S>
    <rect x="52" y="26" width="12" height="60" rx="4" fill="#0f172a" />
    <rect x="55" y="14" width="6" height="14" fill={MET} />
    <circle cx="58" cy="90" r="5" fill={METD} />
    <line x1="52" y1="46" x2="64" y2="46" stroke={MET} />
  </S>
);

const BenchVise = () => (
  <S>
    <rect x="28" y="72" width="64" height="14" rx="3" fill={METD} />
    <rect x="28" y="36" width="14" height="36" fill={MET} />
    <rect x="78" y="36" width="14" height="36" fill={MET} />
    <rect x="42" y="60" width="36" height="6" fill={MET} />
    <rect x="74" y="54" width="8" height="18" rx="3" fill={METD} />
  </S>
);

const PlumbBob = () => (
  <S>
    <line x1="60" y1="12" x2="60" y2="40" stroke={METD} strokeWidth="3" />
    <circle cx="60" cy="40" r="5" fill={MET} />
    <path d="M46,44 L74,44 L60,104 Z" fill={METD} />
  </S>
);

const MarkingGauge = () => (
  <S>
    <rect x="14" y="38" width="16" height="44" rx="3" fill={WOODD} />
    <rect x="28" y="52" width="72" height="8" fill={WOOD} />
    <path d="M98,56 l12,0" stroke={METD} strokeWidth="3" />
    <path d="M108,52 l2,8 l-6,-4 z" fill={METD} />
  </S>
);

const CopingSaw = () => (
  <S>
    <path
      d="M92,42 H44 a10,10 0 0 0 -10,10 v6 a10,10 0 0 0 10,10 H92"
      fill="none"
      stroke={METD}
      strokeWidth="5"
    />
    <line x1="44" y1="44" x2="44" y2="72" stroke={STEEL} strokeWidth="3" />
    <rect x="90" y="40" width="22" height="10" rx="4" fill={WOOD} />
  </S>
);

const Awl = () => (
  <S>
    <circle cx="60" cy="32" r="14" fill={WOOD} />
    <path d="M56,44 L64,44 L60,106 Z" fill={MET} />
  </S>
);

const DrawingCompass = () => (
  <S>
    <circle cx="60" cy="24" r="6" fill={METD} />
    <path d="M60,28 L40,104 L47,104 L62,30 Z" fill={MET} />
    <path d="M60,28 L80,104 L73,104 L58,30 Z" fill={MET} />
    <path d="M76,96 l4,10 z" fill="#dc2626" />
  </S>
);

export const TOOL_ICONS: Record<string, () => ReactElement> = {
  claw_hammer: ClawHammer,
  rubber_mallet: RubberMallet,
  flat_pliers: FlatPliers,
  long_nose_pliers: LongNosePliers,
  side_cutting_pliers: SideCuttingPliers,
  adjustable_wrench: AdjustableWrench,
  flat_screwdriver: FlatScrewdriver,
  phillips_screwdriver: PhillipsScrewdriver,
  hand_saw: HandSaw,
  hack_saw: HackSaw,
  wood_chisel: WoodChisel,
  metal_file: MetalFile,
  try_square: TrySquare,
  vernier_caliper: VernierCaliper,
  tape_measure: TapeMeasure,
  steel_ruler: SteelRuler,
  hand_plane: HandPlane,
  hatchet: Hatchet,
  center_punch: CenterPunch,
  spirit_level: SpiritLevel,
  c_clamp: CClamp,
  paint_brush: PaintBrush,
  wire_stripper: WireStripper,
  electrical_tape: ElectricalTape,
  fuse: Fuse,
  duplex_outlet: DuplexOutlet,
  switch: Switch,
  lamp_holder: LampHolder,
  extension_cord: ExtensionCord,
  multimeter: Multimeter,
  soldering_iron: SolderingIron,
  test_lamp: TestLamp,
  bench_vise: BenchVise,
  plumb_bob: PlumbBob,
  marking_gauge: MarkingGauge,
  coping_saw: CopingSaw,
  awl: Awl,
  drawing_compass: DrawingCompass,
};

export type ToolIconId = keyof typeof TOOL_ICONS;
