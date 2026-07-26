// Home-only decorative "blueprint" accents that extend the HudChrome HUD
// language into the hero/About negative space. Purely visual — aria-hidden,
// pointer-events-none, and hidden below lg (mobile has no room to spare).
const HeroBlueprintOverlay = () => (
  <div
    className="fixed inset-0 z-5 pointer-events-none overflow-hidden hidden lg:block"
    aria-hidden="true"
  >
    {/* Vertical guide line, left margin */}
    <div className="absolute left-[80px] top-0 bottom-0 w-[1px] bg-bright-purple/10">
      <span className="absolute top-[120px] -left-1 w-2 h-[1px] bg-bright-purple/40" />
      <span className="absolute bottom-[120px] -left-1 w-2 h-[1px] bg-bright-purple/40" />
      <span className="absolute top-[140px] left-3 font-mono text-[10px] uppercase tracking-widest text-bright-purple/30">
        X:0080
      </span>
    </div>

    {/* Horizontal guide line, upper margin */}
    <div className="absolute top-[160px] left-0 right-0 h-[1px] bg-bright-purple/5">
      <span className="absolute left-10 top-3 font-mono text-[10px] uppercase tracking-widest text-bright-purple/30">
        Y:0160 // LAT_REF
      </span>
    </div>

    {/* Measurement tick, lower-right margin */}
    <div className="absolute right-[120px] bottom-[100px] flex items-center gap-2">
      <span className="font-mono text-[10px] text-bright-purple/20">MEAS_0412.PX</span>
      <div className="w-12 h-[1px] bg-bright-purple/15" />
    </div>

    {/* Lower-viewport corner accent — fixed like the rest of HudChrome, so it
        frames the initial hero view rather than tracking scroll position */}
    <div className="absolute left-1/2 -translate-x-1/2 top-[95dvh] w-12 h-12 border-l border-t border-bright-purple/20 opacity-40" />

    {/* Side coordinate labels */}
    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-20">
      <div className="font-mono text-[10px] text-bright-purple/20 rotate-90 origin-right">
        SECT_REF_H0
      </div>
      <div className="font-mono text-[10px] text-bright-purple/20 rotate-90 origin-right">
        SECT_REF_A1
      </div>
    </div>
  </div>
);

export default HeroBlueprintOverlay;
