// Extra info shown after a Picture-ID answer is submitted.
// localName = Tagalog / Filipino common name where one exists.

export interface ToolInfo {
  purpose: string;     // function / purpose
  commonName?: string; // other / common English name(s)
  localName?: string;  // Tagalog / Filipino name
}

export const TOOL_INFO: Record<string, ToolInfo> = {
  adjustable_wrench: { purpose: 'Grips and turns nuts/bolts of many sizes by adjusting its jaw.', commonName: 'Crescent wrench, adjustable spanner', localName: 'Lyabe (adjustable)' },
  awl: { purpose: 'Pierces holes or marks points in wood, leather or metal.', commonName: 'Scratch awl, brad awl', localName: 'Tusok / tusukan' },
  bench_vise: { purpose: 'Holds workpieces firmly while filing, sawing or drilling.', commonName: 'Bench vice, machinist vise', localName: 'Bise' },
  c_clamp: { purpose: 'Clamps a workpiece to a bench or table.', commonName: 'C-clamp, G-clamp', localName: 'Klamp / klem' },
  center_punch: { purpose: 'Makes a small dent to guide a drill bit.', commonName: 'Center punch, punch', localName: 'Punsch / tusok na bakal' },
  claw_hammer: { purpose: 'Drives nails and pulls them out with the claw.', commonName: 'Claw hammer, nail hammer', localName: 'Martilyo (may kuko)' },
  coping_saw: { purpose: 'Cuts curves and intricate shapes in wood.', commonName: 'Coping saw, scroll saw', localName: 'Lagari na payat / kopeng' },
  drawing_compass: { purpose: 'Draws circles and arcs on paper or wood.', commonName: 'Compass, divider', localName: 'Kumpas' },
  duplex_outlet: { purpose: 'Provides electrical power to appliances.', commonName: 'Duplex receptacle, wall outlet', localName: 'Saksakan / outlet' },
  electrical_tape: { purpose: 'Insulates electrical wires and connections.', commonName: 'Electrical tape, insulating tape', localName: 'Teyop elektrikal' },
  extension_cord: { purpose: 'Extends the reach of electrical power.', commonName: 'Extension cord, drop cord', localName: 'Ektensyon kord' },
  flat_pliers: { purpose: 'Grips and bends flat surfaces.', commonName: 'Flat nose pliers, flat jaw pliers', localName: 'Pliers na patag' },
  flat_screwdriver: { purpose: 'Turns slotted (flat) screws.', commonName: 'Flathead, slotted screwdriver', localName: 'Turnilyo na patag' },
  fuse: { purpose: 'Protects a circuit from overload by melting to break the circuit.', commonName: 'Cartridge fuse, electrical fuse', localName: 'Fuse / pangprotekta' },
  hack_saw: { purpose: 'Cuts metal using a thin, fine-toothed blade.', commonName: 'Hacksaw', localName: 'Lagari ng bakal' },
  hand_plane: { purpose: 'Smooths and shaves wood surfaces.', commonName: 'Bench plane, hand plane', localName: 'Katam' },
  hand_saw: { purpose: 'Cuts wood by hand.', commonName: 'Hand saw, panel saw', localName: 'Lagari / sero' },
  hatchet: { purpose: 'Chops small wood and splits kindling.', commonName: 'Hatchet, hand axe', localName: 'Palakol (maliit)' },
  lamp_holder: { purpose: 'Holds a light bulb and connects it to power.', commonName: 'Lamp socket, bulb holder', localName: 'Saksakan ng bombilya' },
  long_nose_pliers: { purpose: 'Grips small parts and reaches tight spaces.', commonName: 'Needle nose pliers, long nose pliers', localName: 'Pliers na mahaba ang nguso' },
  marking_gauge: { purpose: 'Marks parallel lines on wood.', commonName: 'Marking gauge', localName: 'Gauge na pang-marka' },
  metal_file: { purpose: 'Smooths and shapes metal by filing.', commonName: 'Flat file, mill file', localName: 'Eraso / lima' },
  multimeter: { purpose: 'Measures voltage, current and resistance.', commonName: 'Multimeter, VOM', localName: 'Multimetro' },
  paint_brush: { purpose: 'Applies paint or coating.', commonName: 'Paint brush', localName: 'Pang-pinta / brush' },
  phillips_screwdriver: { purpose: 'Turns Phillips (cross) screws.', commonName: 'Phillips screwdriver, cross-head', localName: 'Turnilyo na krus' },
  plumb_bob: { purpose: 'Checks vertical alignment.', commonName: 'Plumb bob, plumb line', localName: 'Plumb bob' },
  rubber_mallet: { purpose: 'Strikes without marring surfaces.', commonName: 'Rubber mallet, soft mallet', localName: 'Martilyo na goma' },
  side_cutting_pliers: { purpose: 'Cuts wire on the side.', commonName: 'Diagonal pliers, side cutters, dikes', localName: 'Pliers na pangputol' },
  soldering_iron: { purpose: 'Melts solder to join metal parts.', commonName: 'Soldering iron', localName: 'Soldering iron / pang-solder' },
  spirit_level: { purpose: 'Checks horizontal or vertical level.', commonName: 'Spirit level, bubble level', localName: 'Level / pang-check ng patag' },
  steel_ruler: { purpose: 'Measures straight lines.', commonName: 'Steel rule, metal ruler', localName: 'Ruler na bakal' },
  switch: { purpose: 'Controls electrical flow (on/off).', commonName: 'Rocker switch, toggle switch', localName: 'Switch / pang-on-off' },
  tape_measure: { purpose: 'Measures length (flexible).', commonName: 'Tape measure, measuring tape', localName: 'Metro' },
  test_lamp: { purpose: 'Tests continuity/voltage (lamp lights up).', commonName: 'Test lamp, continuity tester', localName: 'Test lamp / pang-test ng kuryente' },
  try_square: { purpose: 'Checks or marks right angles.', commonName: 'Try square', localName: 'Square / pang-check ng 90°' },
  vernier_caliper: { purpose: 'Measures precise dimensions.', commonName: 'Vernier caliper, caliper', localName: 'Caliper / sukat na espesyal' },
  wire_stripper: { purpose: 'Removes insulation from wire.', commonName: 'Wire stripper', localName: 'Wire stripper / pang-alis ng balat ng kawad' },
  wood_chisel: { purpose: 'Cuts or carves wood.', commonName: 'Wood chisel', localName: 'Taltal / pang-ukit ng kahoy' },
};
