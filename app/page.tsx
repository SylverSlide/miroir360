"use client";

import Image from "next/image";
import MirrorDeviceHero from "@/components/MirrorDeviceHero";
import { useState, useEffect, useRef, type ReactNode, type ReactElement, type CSSProperties, type RefObject } from "react";

/** Padding block avec gouttière minimum + encoches (safe-area). Ordre CSS : haut droite bas gauche. */
const padBlock = (vertical: string, minGutter: string) =>
  `${vertical} max(${minGutter}, env(safe-area-inset-right)) ${vertical} max(${minGutter}, env(safe-area-inset-left))`;

const useBreakpoint = () => {
  const [mobile, setMobile] = useState(false);
  const [tablet, setTablet] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setMobile(w < 640);
      setTablet(w < 960);
      setCompact(w < 420);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return { mobile, tablet, compact };
};

const useInView = (threshold = 0.12): [RefObject<HTMLDivElement | null>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeUp = ({ children, delay = 0, style = {} }: { children?: ReactNode; delay?: number; style?: CSSProperties }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
};

type IconName =
  | "scissors" | "cross" | "hotel" | "camera" | "home" | "arrow_up" | "rings" | "grid4"
  | "calendar" | "mail" | "phone" | "medal" | "trophy" | "tv" | "menu" | "close" | "play";

/** Palette alignée sur la photo produit : brume froide, encre bleutée, accent ardoise (chrome / ciel studio). */
const Icon = ({ name, size = 20, color = "#4A6685" }: { name: IconName; size?: number; color?: string }) => {
  const s = { width: size, height: size, display: "block", flexShrink: 0 };
  const icons: Record<IconName, ReactElement> = {
    scissors: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>,
    cross:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
    hotel:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    camera:   <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    home:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    arrow_up: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
    rings:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill={color} opacity="0.4"/></svg>,
    grid4:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    calendar: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    mail:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    phone:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    medal:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="15" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/><path d="M15 7l-3-5-3 5h6"/></svg>,
    trophy:   <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><polyline points="8 21 12 21 16 21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 4H4a1 1 0 00-1 1v3a4 4 0 004 4h1M17 4h3a1 1 0 011 1v3a4 4 0 01-4 4h-1"/><path d="M7 4h10v5a5 5 0 01-10 0V4z"/></svg>,
    tv:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>,
    menu:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    play:     <svg style={s} viewBox="0 0 24 24" fill={color}><polygon points="5,3 19,12 5,21"/></svg>,
  };
  return icons[name] || null;
};

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { tablet, compact } = useBreakpoint();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [["#concept","Le concept"],["#produit","Le produit"],["#avantages","Avantages"],["#versions","Versions"],["#presse","Presse"]];
  const lStyle = { fontSize:"0.75rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"#5A6570", textDecoration:"none", fontWeight:500, fontFamily:"'DM Sans',sans-serif" };
  const gutter = tablet ? (compact ? "1rem" : "1.35rem") : "clamp(1.5rem, 5vw, 4rem)";
  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:300, display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop: tablet ? "max(1rem, env(safe-area-inset-top))" : "max(1.1rem, env(safe-area-inset-top))", paddingBottom: tablet ? "1rem" : "1.1rem", paddingLeft: `max(${gutter}, env(safe-area-inset-left))`, paddingRight: `max(${gutter}, env(safe-area-inset-right))`, background:(scrolled||open)?"rgba(243,246,249,0.97)":"transparent", backdropFilter:(scrolled||open)?"blur(16px)":"none", borderBottom:(scrolled||open)?"1px solid rgba(74,102,133,0.16)":"none", transition:"all 0.4s ease" }}>
        <a href="#" style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "1.25rem" : "1.4rem", fontWeight:600, letterSpacing:"0.1em", color:"#151D28", textDecoration:"none", minWidth:0 }}>
          Miroir <span style={{ color:"#4A6685" }}>360°</span>
        </a>
        {tablet ? (
          <button type="button" aria-expanded={open} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen(o=>!o)} style={{ background:"none", border:"none", cursor:"pointer", minWidth:44, minHeight:44, padding:10, display:"flex", alignItems:"center", justifyContent:"center", WebkitTapHighlightColor:"transparent" }}>
            <Icon name={open?"close":"menu"} size={22} color="#151D28"/>
          </button>
        ) : (
          <div style={{ display:"flex", gap:"clamp(1rem, 2.5vw, 2.2rem)", alignItems:"center", flexWrap:"wrap", justifyContent:"flex-end" }}>
            {links.map(([href,label]) => (
              <a key={href} href={href} style={lStyle} onMouseOver={e=>e.currentTarget.style.color="#4A6685"} onMouseOut={e=>e.currentTarget.style.color="#5A6570"}>{label}</a>
            ))}
            <a href="#contact" style={{ ...lStyle, background:"#151D28", color:"#F3F6F9", padding:"0.52rem 1.4rem", transition:"background 0.25s" }} onMouseOver={e=>e.currentTarget.style.background="#4A6685"} onMouseOut={e=>e.currentTarget.style.background="#151D28"}>Commander</a>
          </div>
        )}
      </nav>
      {tablet && open && (
        <div style={{ position:"fixed", top:"calc(3.35rem + env(safe-area-inset-top))", left:0, right:0, zIndex:299, background:"rgba(243,246,249,0.98)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(74,102,133,0.18)", display:"flex", flexDirection:"column", paddingTop:"0.5rem", paddingBottom:"1.4rem", paddingLeft: `max(${compact ? "1rem" : "1.35rem"}, env(safe-area-inset-left))`, paddingRight: `max(${compact ? "1rem" : "1.35rem"}, env(safe-area-inset-right))` }}>
          {links.map(([href,label]) => (
            <a key={href} href={href} onClick={()=>setOpen(false)} style={{ ...lStyle, padding:"0.85rem 0", borderBottom:"1px solid rgba(74,102,133,0.1)", color:"#151D28" }}>{label}</a>
          ))}
          <a href="#contact" onClick={()=>setOpen(false)} style={{ ...lStyle, background:"#151D28", color:"#F3F6F9", padding:"0.75rem 1.4rem", marginTop:"0.9rem", textAlign:"center" }}>Commander</a>
        </div>
      )}
    </>
  );
};

const Hero = () => {
  const { tablet, mobile, compact } = useBreakpoint();
  const awards: { icon: IconName; label: string; sub: string }[] = [
    { icon: "medal", label: "Médaille", sub: "Genève" },
    { icon: "trophy", label: "Primé", sub: "Lépine" },
    { icon: "tv", label: "Vu sur", sub: "France 2" },
  ];
  const heroTop = tablet ? "calc(3.75rem + env(safe-area-inset-top))" : "max(5rem, calc(3.5rem + env(safe-area-inset-top)))";
  const heroTextPad: CSSProperties = compact
    ? { paddingTop: "1.85rem", paddingBottom: "2.25rem", paddingLeft: "max(1rem, env(safe-area-inset-left))", paddingRight: "max(1rem, env(safe-area-inset-right))" }
    : mobile
      ? { paddingTop: "2.25rem", paddingBottom: "2.5rem", paddingLeft: "max(1.25rem, env(safe-area-inset-left))", paddingRight: "max(1.25rem, env(safe-area-inset-right))" }
      : tablet
        ? { paddingTop: "2.5rem", paddingBottom: "3rem", paddingLeft: "max(2.5rem, env(safe-area-inset-left))", paddingRight: "max(2.5rem, env(safe-area-inset-right))" }
        : { padding: "3rem max(4rem, env(safe-area-inset-right)) 4rem max(4rem, env(safe-area-inset-left))" };
  const productRowPad: CSSProperties = {
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    boxSizing: "border-box",
    paddingLeft: compact ? "max(1rem, env(safe-area-inset-left))" : mobile ? "max(1.25rem, env(safe-area-inset-left))" : tablet ? "max(1.5rem, env(safe-area-inset-left))" : "max(2rem, env(safe-area-inset-left))",
    paddingRight: compact ? "max(1rem, env(safe-area-inset-right))" : mobile ? "max(1.25rem, env(safe-area-inset-right))" : tablet ? "max(1.5rem, env(safe-area-inset-right))" : "max(2rem, env(safe-area-inset-right))",
    paddingBottom: compact ? "0.35rem" : "0.65rem",
  };
  return (
    <section id="hero" style={{ minHeight:"100svh", display:"flex", flexDirection:"column", background:"linear-gradient(135deg,#F3F6F9 58%,#DCE4EE 100%)", paddingTop: heroTop, position:"relative", overflow:"hidden" }}>
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", opacity:0.05 }} preserveAspectRatio="none">
        {Array.from({length:16},(_,i)=><line key={i} x1={`${i*6.5}%`} y1="0%" x2={`${i*6.5+14}%`} y2="100%" stroke="#4A6685" strokeWidth="1"/>)}
      </svg>
      {/* Hero : photo produit (miroir360.png) — l’ancien composant MirrorOrb SVG a été retiré */}
      <div style={{ position:"relative", zIndex:1, ...productRowPad }}>
        <MirrorDeviceHero size="hero" />
      </div>
      {/* Texte sous le produit */}
      <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", flex:1, ...heroTextPad, minWidth:0, maxWidth:920, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <FadeUp>
          <div style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"1.7rem", flexWrap:"wrap" }}>
            <div style={{ width:26, height:1, background:"#4A6685", flexShrink:0 }}/>
            <span style={{ fontSize: compact ? "0.6rem" : "0.66rem", letterSpacing: compact ? "0.14em" : "0.2em", textTransform:"uppercase", color:"#4A6685", fontWeight:500, lineHeight:1.5 }}>Brevet international · Invention primée</span>
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "clamp(2.35rem, 12vw, 3.4rem)" : "clamp(2.65rem, 6vw, 5.6rem)", fontWeight:300, lineHeight:1.05, marginBottom:"1.6rem", color:"#151D28", wordBreak:"break-word" }}>
            Voyez toute<br/>votre tête,<br/><em style={{ fontStyle:"italic", color:"#4A6685" }}>enfin.</em>
          </h1>
        </FadeUp>
        <FadeUp delay={200}>
          <p style={{ fontSize: compact ? "0.94rem" : "1rem", color:"#5A6570", maxWidth:410, lineHeight:1.8, marginBottom:"2.8rem", fontWeight:300 }}>
            Le premier miroir complet breveté — vous voyez les quatre côtés de votre tête simultanément, sans bouger, sans vous retourner.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <div style={{ display:"flex", gap:"1rem", alignItems:"center", flexWrap:"wrap" }}>
            <a href="#contact" style={{ background:"#151D28", color:"#F3F6F9", padding: compact ? "0.85rem 1.75rem" : "0.9rem 2.3rem", fontSize:"0.8rem", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:500, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", transition:"background 0.25s", minHeight:44, display:"inline-flex", alignItems:"center", justifyContent:"center" }} onMouseOver={e=>e.currentTarget.style.background="#4A6685"} onMouseOut={e=>e.currentTarget.style.background="#151D28"}>Nous contacter</a>
            <a href="#concept" style={{ color:"#151D28", fontSize:"0.8rem", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:500, textDecoration:"none", borderBottom:"1px solid #151D28", paddingBottom:"2px", fontFamily:"'DM Sans',sans-serif", minHeight:44, display:"inline-flex", alignItems:"center" }} onMouseOver={e=>{e.currentTarget.style.color="#4A6685";e.currentTarget.style.borderColor="#4A6685";}} onMouseOut={e=>{e.currentTarget.style.color="#151D28";e.currentTarget.style.borderColor="#151D28";}}>Découvrir →</a>
          </div>
        </FadeUp>
        <FadeUp delay={440}>
          <div style={{ display:"flex", gap: mobile?"1.2rem":"2rem", marginTop:"3rem", paddingTop:"2rem", borderTop:"1px solid rgba(74,102,133,0.18)", flexWrap:"wrap" }}>
            {awards.map(({icon,label,sub})=>(
              <div key={label} style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
                <Icon name={icon} size={17} color="#4A6685"/>
                <div>
                  <div style={{ fontSize:"0.66rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"#4A6685", fontWeight:500, lineHeight:1 }}>{label}</div>
                  <div style={{ fontSize:"0.75rem", color:"#5A6570", fontWeight:300 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

const Ticker = () => {
  const { mobile, compact } = useBreakpoint();
  const items = ["Médaille — Salon des Inventions Genève","Primé au Concours Lépine","France 2 · Chérie 25 · Europe 1","Chicago Tribune · Boston Globe","140 000 visiteurs sur nos sites","Presse internationale sur 4 continents"];
  return (
    <div style={{ background:"#151D28", padding: padBlock(compact ? "0.65rem" : mobile ? "0.78rem" : "0.85rem", compact ? "0.65rem" : "1rem"), overflow:"hidden", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-flex", gap: compact ? "2rem" : "3.5rem", animation:"ticker 30s linear infinite" }}>
        {[...items,...items].map((item,i)=>(
          <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:"0.75rem", fontSize: compact ? "0.58rem" : mobile ? "0.64rem" : "0.7rem", letterSpacing: compact ? "0.1em" : "0.15em", textTransform:"uppercase", color:"rgba(238,242,246,0.62)" }}>
            <span style={{ width:3, height:3, borderRadius:"50%", background:"#8FA4B8", flexShrink:0, display:"inline-block" }}/>
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
};

const ConceptSection = () => {
  const { tablet, mobile, compact } = useBreakpoint();
  const secPad = compact
    ? padBlock("3.25rem", "1rem")
    : mobile
      ? padBlock("4rem", "1.25rem")
      : tablet
        ? padBlock("5rem", "2.5rem")
        : padBlock("9rem", "6rem");
  const panels = [
    {label:"Face",         title:"Le visage",      desc:"Votre reflet habituel, central et permanent."},
    {label:"Côté droit",   title:"Le profil",       desc:"Chaque côté de la chevelure visible d'un coup d'œil."},
    {label:"Côté gauche",  title:"L'autre profil",  desc:"Symétrie et harmonie enfin vérifiables."},
    {label:"Arrière",      title:"La nuque",        desc:"La partie la plus difficile à voir — désormais évidente."},
  ];
  return (
    <section id="concept" style={{ padding: secPad, display:"grid", gridTemplateColumns:tablet?"minmax(0,1fr)":"minmax(0,1fr) minmax(0,1.15fr)", gap:tablet?"3rem":"6rem", alignItems:"center", background:"#F3F6F9" }}>
      <div style={{ minWidth:0 }}>
        <FadeUp>
          <div style={{ fontSize:"0.66rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#4A6685", marginBottom:"1rem", fontWeight:500 }}>Le concept</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "clamp(1.65rem, 6vw, 2.4rem)" : "clamp(2rem,3.5vw,3.7rem)", fontWeight:300, lineHeight:1.15, marginBottom:"1.7rem", color:"#151D28" }}>
            Un miroir pensé pour voir ce que les autres <em style={{ fontStyle:"italic", color:"#4A6685" }}>ne montrent pas</em>
          </h2>
        </FadeUp>
        <FadeUp delay={100}>
          <p style={{ color:"#5A6570", lineHeight:1.85, fontWeight:300, fontSize:"0.96rem", marginBottom:"1.2rem" }}>Un miroir ordinaire ne vous montre que votre face. Pour voir l'arrière et les côtés, vous devez vous tordre le cou, tenir un second miroir — et souvent rater ce que vous cherchez.</p>
          <p style={{ color:"#5A6570", lineHeight:1.85, fontWeight:300, fontSize:"0.96rem", marginBottom:"2.4rem" }}>Miroir 360° résout ce problème avec une géométrie brevetée unique : quatre miroirs orientés les uns vers les autres. Résultat — vous voyez tout, directement devant vous, sans effort.</p>
        </FadeUp>
        <FadeUp delay={200}>
          <a href="https://youtu.be/iy6ZB2C-F54" target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:"0.8rem", background:"#E8EDF3", border:"1px solid rgba(74,102,133,0.28)", padding:"0.82rem 1.5rem", textDecoration:"none", color:"#151D28", fontSize:"0.82rem", letterSpacing:"0.07em", fontWeight:500, fontFamily:"'DM Sans',sans-serif" }} onMouseOver={e=>e.currentTarget.style.background="#D5DFEC"} onMouseOut={e=>e.currentTarget.style.background="#E8EDF3"}>
            <span style={{ width:25, height:25, borderRadius:"50%", background:"#4A6685", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon name="play" size={8} color="white"/>
            </span>
            Voir notre passage sur France 2
          </a>
        </FadeUp>
      </div>
      <FadeUp delay={120}>
        <div style={{ display:"grid", gridTemplateColumns: compact ? "minmax(0,1fr)" : "repeat(2, minmax(0,1fr))", gridAutoRows:"auto", gap:"2px", background:"rgba(74,102,133,0.15)", boxShadow:"0 18px 60px rgba(26,26,26,0.07)" }}>
          {panels.map(({label,title,desc},i)=>(
            <div key={i} style={{ background:"#F3F6F9", padding: compact ? "1.15rem 1rem" : mobile ? "1.3rem 1.1rem" : "1.7rem 1.5rem", minHeight: compact ? "auto" : mobile ? 105 : 135, transition:"background 0.25s" }} onMouseOver={e=>e.currentTarget.style.background="white"} onMouseOut={e=>e.currentTarget.style.background="#F3F6F9"}>
              <div style={{ fontSize:"0.56rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"#4A6685", fontWeight:500, marginBottom:"0.4rem" }}>{label}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "1.08rem" : "1.2rem", fontWeight:400, marginBottom:"0.35rem", color:"#151D28" }}>{title}</div>
              <div style={{ fontSize: compact ? "0.74rem" : "0.78rem", color:"#5A6570", lineHeight:1.55, fontWeight:300 }}>{desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", padding:"0.85rem", background:"#E8EDF3", fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"0.92rem", fontStyle:"italic", color:"#5A6570" }}>
          Vous êtes au centre. Vous voyez tout.
        </div>
      </FadeUp>
    </section>
  );
};

const ProductGallerySection = () => {
  const { mobile, tablet, compact } = useBreakpoint();
  const secPad = compact
    ? padBlock("3.25rem", "1rem")
    : mobile
      ? padBlock("4rem", "1.25rem")
      : tablet
        ? padBlock("5rem", "2.5rem")
        : padBlock("7rem", "6rem");
  const framePortraitShell = {
    borderRadius: 2,
    overflow: "hidden" as const,
    boxShadow: "0 24px 60px rgba(26,26,26,0.09)",
    border: "1px solid rgba(74,102,133,0.18)",
    background: "#D8DEE8",
    lineHeight: 0,
  };
  const cap = {
    marginTop: "0.75rem",
    fontFamily: "'Cormorant Garamond',Georgia,serif",
    fontSize: compact ? "0.88rem" : "0.95rem",
    fontStyle: "italic" as const,
    color: "#5A6570",
    fontWeight: 300,
    lineHeight: 1.45,
  };
  return (
    <section id="produit" style={{ padding: secPad, background: "linear-gradient(180deg,#E8EDF3 0%,#F3F6F9 45%,#F3F6F9 100%)" }}>
      <FadeUp>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto", marginBottom: compact ? "2rem" : "2.75rem" }}>
          <div style={{ fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4A6685", fontWeight: 500, marginBottom: "0.85rem" }}>Le produit</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: compact ? "clamp(1.55rem, 5.5vw, 2.35rem)" : "clamp(1.85rem, 3.2vw, 2.75rem)", fontWeight: 300, lineHeight: 1.15, color: "#151D28", marginBottom: "1rem" }}>
            Amovible sur sa barre sol-plafond
          </h2>
          <p style={{ fontSize: compact ? "0.9rem" : "0.96rem", color: "#5A6570", lineHeight: 1.85, fontWeight: 300 }}>
            Pour ma part, je l&apos;ai voulu <em style={{ color: "#4A6685", fontStyle: "italic" }}>amovible</em> sur une barre : le Miroir 360° se fixe sur une barre télescopique sol-plafond, monte et descend à votre hauteur, se déplace d&apos;une pièce à l&apos;autre ou se range sans encombrer le sol.
          </p>
        </div>
      </FadeUp>
      <FadeUp delay={90}>
        <p style={{ fontSize: compact ? "0.88rem" : "0.92rem", color: "#5A6570", lineHeight: 1.85, fontWeight: 300, maxWidth: 720, margin: "0 auto", marginTop: compact ? "1.5rem" : "2rem", textAlign: "center" }}>
          La barre se fixe entre le sol et le plafond sans percer le mur porteur : vous installez le miroir où vous voulez, vous l&apos;ajustez pour la coiffure ou le rasage, puis vous le faites glisser ou le retirez pour l&apos;emporter ailleurs — salon, chambre, extérieur — tout en gardant la même qualité de reflet à 360°.
        </p>
      </FadeUp>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: compact ? "2rem" : "3rem", maxWidth: 520, marginLeft: "auto", marginRight: "auto", width: "100%" }}>
        <FadeUp delay={160} style={{ width: "100%" }}>
          <figure style={{ margin: 0, width: "100%" }}>
            <div style={framePortraitShell}>
              <Image
                src="/miroir360_barre.png"
                alt="Miroir 360° installé sur la barre sol-plafond — vue complète"
                width={900}
                height={1350}
                sizes="(max-width: 520px) 100vw, 520px"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            <figcaption style={{ ...cap, textAlign: "center" }}>Sur la barre : installation stable, réglage en hauteur, déplacement facile.</figcaption>
          </figure>
        </FadeUp>
      </div>
    </section>
  );
};

const AdvantagesSection = () => {
  const { tablet, mobile, compact } = useBreakpoint();
  const secPad = compact
    ? padBlock("3.25rem", "1rem")
    : mobile
      ? padBlock("4rem", "1.25rem")
      : tablet
        ? padBlock("5rem", "2.5rem")
        : padBlock("8rem", "6rem");
  const adv = [
    {n:"01", title:"Précision absolue",   desc:"Vous voyez exactement ce que vous faites — coiffure, rasage, maquillage — en temps réel et sans approximation."},
    {n:"02", title:"Gain de temps",       desc:"Plus besoin de jongler avec deux miroirs. Un seul regard suffit pour s'assurer d'être parfaitement impeccable."},
    {n:"03", title:"Sécurité accrue",     desc:"Pour les séniors et personnes à mobilité réduite, ne plus avoir à se retourner réduit considérablement les risques de chute."},
    {n:"04", title:"Sans perte de place", desc:"Réglable en hauteur, il se remonte après usage. Vous passez en dessous — aucun espace sacrifié."},
    {n:"05", title:"Design sur mesure",   desc:"Blanc, chromé ou noir — personnalisable pour les professionnels, il s'intègre à toutes les décorations intérieures."},
    {n:"06", title:"Universel",           desc:"Adapté à toutes les tailles, y compris en fauteuil roulant. Convient aux particuliers comme aux professionnels."},
  ];
  return (
    <section id="avantages" style={{ padding: secPad, background:"#DCE4EE" }}>
      <FadeUp>
        <div style={{ textAlign:"center", marginBottom: compact ? "2.5rem" : "4rem" }}>
          <div style={{ fontSize:"0.66rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#4A6685", fontWeight:500, marginBottom:"0.8rem" }}>Pourquoi Miroir 360°</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "clamp(1.45rem, 5vw, 2.2rem)" : "clamp(1.8rem,3vw,3rem)", fontWeight:300, color:"#151D28", paddingLeft:"0.25rem", paddingRight:"0.25rem" }}>Des avantages concrets, au quotidien</h2>
        </div>
      </FadeUp>
      <div style={{ display:"grid", gridTemplateColumns: mobile ? "minmax(0,1fr)" : tablet ? "repeat(2, minmax(0,1fr))" : "repeat(3, minmax(0,1fr))", gap:"2px", background:"rgba(74,102,133,0.15)" }}>
        {adv.map(({n,title,desc},i)=>(
          <FadeUp key={n} delay={i*55}>
            <div style={{ background:"#E8EDF3", padding: compact ? "1.45rem 1.15rem" : mobile ? "1.7rem 1.4rem" : "2.3rem", height:"100%", boxSizing:"border-box", transition:"background 0.25s, transform 0.25s" }} onMouseOver={e=>{e.currentTarget.style.background="white";e.currentTarget.style.transform="translateY(-3px)";}} onMouseOut={e=>{e.currentTarget.style.background="#E8EDF3";e.currentTarget.style.transform="none";}}>
              <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "2.2rem" : "2.7rem", fontWeight:300, color:"rgba(74,102,133,0.17)", lineHeight:1, marginBottom:"0.9rem" }}>{n}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "1.15rem" : "1.35rem", fontWeight:400, marginBottom:"0.65rem", color:"#151D28" }}>{title}</h3>
              <p style={{ fontSize:"0.85rem", color:"#5A6570", lineHeight:1.75, fontWeight:300, margin:0 }}>{desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};

const WhoSection = () => {
  const { tablet, mobile, compact } = useBreakpoint();
  const secPad = compact
    ? padBlock("3.25rem", "1rem")
    : mobile
      ? padBlock("4rem", "1.25rem")
      : tablet
        ? padBlock("5rem", "2.5rem")
        : padBlock("9rem", "6rem");
  const who: { icon: IconName; title: string; desc: string }[] = [
    { icon: "scissors", title: "Salons de coiffure & écoles", desc: "Facilite l'échange coiffeur–client, rassure après chaque coupe, améliore la formation des apprentis." },
    { icon: "cross", title: "Santé & EHPAD", desc: "Dermatologues, chirurgiens esthétiques, résidences séniors — suivi et soins facilités sans effort du patient." },
    { icon: "hotel", title: "Hôtels, spas & bien-être", desc: "Palaces, centres thermaux, piscines, instituts de beauté — un équipement premium pour vos clients exigeants." },
    { icon: "camera", title: "Télévision, mode & événementiel", desc: "Artistes, présentateurs, castings, cérémonies — une perfection visuelle irréprochable à chaque instant." },
    { icon: "home", title: "Particuliers", desc: "Salle de bain, chambre, dressing — pour toutes celles et ceux qui veulent la certitude d'être parfaits." },
  ];
  return (
    <section style={{ padding: secPad, display:"grid", gridTemplateColumns:tablet?"minmax(0,1fr)":"minmax(0,1.2fr) minmax(0,1fr)", gap:tablet?"3rem":"6rem", alignItems:"start", background:"#F3F6F9" }}>
      <div style={{ minWidth:0 }}>
        <FadeUp>
          <div style={{ fontSize:"0.66rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#4A6685", fontWeight:500, marginBottom:"1rem" }}>Qui l'utilise ?</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "clamp(1.5rem, 5.5vw, 2.2rem)" : "clamp(1.8rem,2.8vw,2.9rem)", fontWeight:300, lineHeight:1.2, color:"#151D28", marginBottom:"2rem" }}>Pour les particuliers<br/>comme pour les professionnels</h2>
        </FadeUp>
        {who.map(({icon,title,desc},i)=>(
          <FadeUp key={title} delay={i*70}>
            <div style={{ display:"flex", gap:"1.3rem", alignItems:"flex-start", padding:"1.4rem 0", borderBottom:"1px solid rgba(74,102,133,0.15)", borderTop: i===0?"1px solid rgba(74,102,133,0.15)":"none" }}>
              <div style={{ width:38, height:38, border:"1px solid rgba(74,102,133,0.28)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name={icon} size={16} color="#4A6685"/>
              </div>
              <div>
                <h4 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.15rem", fontWeight:400, marginBottom:"0.3rem", color:"#151D28" }}>{title}</h4>
                <p style={{ fontSize:"0.82rem", color:"#5A6570", lineHeight:1.65, fontWeight:300, margin:0 }}>{desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
      <div style={{ paddingTop: tablet ? 0 : "4rem", minWidth:0 }}>
        <FadeUp>
          <div style={{ fontSize:"0.66rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#4A6685", fontWeight:500, marginBottom:"1rem" }}>En chiffres</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "clamp(1.45rem, 4.5vw, 2rem)" : "clamp(1.65rem,2.4vw,2.5rem)", fontWeight:300, lineHeight:1.25, color:"#151D28", marginBottom:"1.3rem" }}>
            Un marché immense, <em style={{ color:"#4A6685", fontStyle:"italic" }}>un produit sans concurrent</em>
          </h2>
          <p style={{ fontSize:"0.9rem", color:"#5A6570", lineHeight:1.8, fontWeight:300, marginBottom:"1.8rem" }}>Il n'existe aucun équivalent à Miroir 360° sur le marché. Ce produit breveté répond à un besoin universel que personne n'avait encore résolu.</p>
        </FadeUp>
        {[
          {num:"30M",    desc:"utilisateurs de sèche-cheveux ou tondeuses en France", dark:false},
          {num:"36M",    desc:"logements en France — autant de foyers potentiels",     dark:false},
          {num:"Brevet", desc:"International déposé — aucun concurrent direct identifié", dark:true},
        ].map(({num,desc,dark},i)=>(
          <FadeUp key={num} delay={i*90}>
            <div style={{ padding:"1.35rem", marginBottom:"1px", background:dark?"#151D28":"#E8EDF3", borderLeft:`3px solid ${dark?"#8FA4B8":"#4A6685"}` }}>
              <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:dark?"1.5rem":"2.2rem", fontWeight:300, color:dark?"#F3F6F9":"#151D28", lineHeight:1.1, marginBottom:"0.25rem" }}>{num}</div>
              <div style={{ fontSize:"0.75rem", color:dark?"rgba(238,242,246,0.52)":"#5A6570", fontWeight:300 }}>{desc}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};

const VersionsSection = () => {
  const { tablet, mobile, compact } = useBreakpoint();
  const secPad = compact
    ? padBlock("3.25rem", "1rem")
    : mobile
      ? padBlock("4rem", "1.25rem")
      : tablet
        ? padBlock("5rem", "2.5rem")
        : padBlock("8rem", "6rem");
  const versions: { icon: IconName; tag: string; title: string; desc: string }[] = [
    { icon: "arrow_up", tag: "Nomade", title: "Support vertical", desc: "Sur barre sol-plafond. Déplaçable d'une pièce à l'autre ou à l'extérieur. Idéal pour les particuliers." },
    { icon: "rings", tag: "Suspendu", title: "Fixation plafond", desc: "Suspendu comme un lustre. Élégant, discret, il libère l'espace au sol. Parfait pour les intérieurs soignés." },
    { icon: "grid4", tag: "Mural", title: "Fixation murale", desc: "Comme une applique. Solution permanente et sobre pour salles de bain, salons de coiffure, hôtels." },
    { icon: "calendar", tag: "Prochainement", title: "Location événementielle", desc: "Pour mariages, salons, spectacles, traitements médicaux temporaires. Disponible bientôt." },
  ];
  return (
    <section id="versions" style={{ padding: secPad, background:"#DCE4EE" }}>
      <FadeUp>
        <div style={{ textAlign:"center", marginBottom: compact ? "2.5rem" : "4rem" }}>
          <div style={{ fontSize:"0.66rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#4A6685", fontWeight:500, marginBottom:"0.8rem" }}>Les versions</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "clamp(1.45rem, 5vw, 2.2rem)" : "clamp(1.8rem,3vw,2.9rem)", fontWeight:300, color:"#151D28", paddingLeft:"0.25rem", paddingRight:"0.25rem" }}>Quatre installations, une liberté totale</h2>
        </div>
      </FadeUp>
      <div style={{ display:"grid", gridTemplateColumns: mobile ? "minmax(0,1fr)" : tablet ? "repeat(2, minmax(0,1fr))" : "repeat(4, minmax(0,1fr))", gap:"2px", background:"rgba(74,102,133,0.15)" }}>
        {versions.map(({icon,tag,title,desc},i)=>(
          <FadeUp key={title} delay={i*70}>
            <div style={{ background:"#E8EDF3", padding: compact ? "1.45rem 1.15rem" : mobile ? "1.7rem 1.4rem" : "2.3rem 1.9rem", height:"100%", boxSizing:"border-box", transition:"background 0.25s, transform 0.25s" }} onMouseOver={e=>{e.currentTarget.style.background="white";e.currentTarget.style.transform="translateY(-4px)";}} onMouseOut={e=>{e.currentTarget.style.background="#E8EDF3";e.currentTarget.style.transform="none";}}>
              <div style={{ marginBottom:"1rem" }}><Icon name={icon} size={compact ? 19 : 21} color="#4A6685"/></div>
              <div style={{ display:"inline-block", fontSize:"0.58rem", letterSpacing:"0.1em", textTransform:"uppercase", padding:"0.2rem 0.52rem", background:"#151D28", color:"#F3F6F9", marginBottom:"0.8rem", fontFamily:"'DM Sans',sans-serif" }}>{tag}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "1.12rem" : "1.28rem", fontWeight:400, marginBottom:"0.62rem", color:"#151D28" }}>{title}</h3>
              <p style={{ fontSize:"0.82rem", color:"#5A6570", lineHeight:1.65, fontWeight:300, margin:0 }}>{desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};

const pressPartners: { key: string; name: string; logo?: string }[] = [
  { key: "fr2", name: "France 2", logo: "/france2.svg" },
  { key: "e1", name: "Europe 1", logo: "/europe1.svg" },
  { key: "fb", name: "France Bleu", logo: "/france_bleu.svg" },
  { key: "c25", name: "Chérie 25", logo: "/cherie25.svg" },
  { key: "ct", name: "Chicago Tribune", logo: "/Chicago_Tribune_Logo.svg" },
  { key: "bg", name: "Boston Globe", logo: "/The_Boston_Globe.svg" },
  { key: "lepine", name: "Concours Lépine", logo: "/Concours_Lépine,_Paris,_France.png" },
];

const PressSection = () => {
  const { mobile, tablet, compact } = useBreakpoint();
  const secPad = compact
    ? padBlock("3.25rem", "1rem")
    : mobile
      ? padBlock("4rem", "1.25rem")
      : tablet
        ? padBlock("5.5rem", "2.5rem")
        : padBlock("7rem", "6rem");
  const logoMaxH = compact ? 26 : mobile ? 30 : 38;
  const chipStyle: CSSProperties = {
    fontFamily: "'Cormorant Garamond',Georgia,serif",
    fontSize: "0.95rem",
    fontWeight: 400,
    color: "#aaa",
    padding: "0.5rem 1rem",
    border: "1px solid #CDD5DF",
    letterSpacing: "0.04em",
    transition: "color 0.2s, border-color 0.2s",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: logoMaxH + 16,
    boxSizing: "border-box",
  };
  const logoWrapStyle: CSSProperties = {
    padding: mobile ? "0.65rem 1rem" : "0.75rem 1.15rem",
    border: "1px solid rgba(74,102,133,0.2)",
    background: "rgba(255,255,255,0.55)",
    borderRadius: 2,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: logoMaxH + 16,
    transition: "border-color 0.2s, box-shadow 0.2s",
    maxWidth: mobile ? 160 : 180,
  };
  return (
    <section id="presse" style={{ padding: secPad, background:"#F3F6F9", textAlign:"center" }}>
      <FadeUp>
        <div style={{ fontSize:"0.66rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#5A6570", fontWeight:500, marginBottom:"2rem" }}>Ils en ont parlé</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap: compact ? "0.55rem" : "0.75rem", alignItems:"stretch", justifyContent:"center", marginBottom: compact ? "2.75rem" : "3.8rem" }}>
          {pressPartners.map(({ key, name, logo }) =>
            logo ? (
              <div
                key={key}
                style={logoWrapStyle}
                title={name}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "rgba(74,102,133,0.48)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(26,26,26,0.06)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(74,102,133,0.2)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- local SVG/PNG assets in /public */}
                <img
                  src={logo}
                  alt={name}
                  style={{
                    maxHeight: logoMaxH,
                    width: "auto",
                    maxWidth: "100%",
                    objectFit: "contain",
                    opacity: 0.88,
                    filter: "grayscale(0.25)",
                    transition: "opacity 0.2s, filter 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.filter = "none";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.88";
                    e.currentTarget.style.filter = "grayscale(0.25)";
                  }}
                />
              </div>
            ) : (
              <div
                key={key}
                style={chipStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#4A6685";
                  e.currentTarget.style.borderColor = "#4A6685";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "#aaa";
                  e.currentTarget.style.borderColor = "#CDD5DF";
                }}
              >
                {name}
              </div>
            )
          )}
        </div>
      </FadeUp>
      <FadeUp delay={150}>
        <blockquote style={{ maxWidth:600, margin:"0 auto", paddingLeft: compact ? "0.5rem" : "1rem", paddingRight: compact ? "0.5rem" : "1rem", fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "clamp(1.2rem, 4.5vw, 1.65rem)" : "clamp(1.45rem,2.5vw,2rem)", fontStyle:"italic", fontWeight:300, color:"#151D28", lineHeight:1.45, position:"relative" }}>
          <span style={{ position:"absolute", top:-14, left: mobile ? -4 : -16, fontSize: compact ? "3.5rem" : "5rem", color:"rgba(74,102,133,0.1)", fontFamily:"Georgia,serif", lineHeight:1 }}>"</span>
          Le rêve de toute femme.
          <cite style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontStyle:"normal", fontSize:"0.72rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"#4A6685", marginTop:"1rem" }}>— Presse internationale</cite>
        </blockquote>
      </FadeUp>
    </section>
  );
};

const CTASection = () => {
  const { tablet, mobile, compact } = useBreakpoint();
  const secPad = compact
    ? padBlock("3.5rem", "1rem")
    : mobile
      ? padBlock("4rem", "1.25rem")
      : tablet
        ? padBlock("5rem", "2.5rem")
        : padBlock("8rem", "6rem");
  return (
    <section id="contact" style={{ background:"#151D28", color:"#F3F6F9", padding: secPad, display:"grid", gridTemplateColumns: tablet ? "minmax(0,1fr)" : "minmax(0,1fr) minmax(0,1fr)", gap: tablet ? "2.5rem" : "6rem", alignItems:"center" }}>
      <FadeUp>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "clamp(1.75rem, 6vw, 2.6rem)" : "clamp(2.2rem,4vw,3.9rem)", fontWeight:300, lineHeight:1.1, minWidth:0 }}>
          Prêt à voir votre tête sous un <em style={{ color:"#8FA4B8", fontStyle:"italic" }}>tout nouvel angle</em>&thinsp;?
        </h2>
      </FadeUp>
      <FadeUp delay={140}>
        <div style={{ display:"flex", flexDirection:"column", gap:"1.4rem", minWidth:0 }}>
          <p style={{ fontSize: compact ? "0.86rem" : "0.9rem", color:"rgba(238,242,246,0.56)", lineHeight:1.8, fontWeight:300 }}>Pour commander, obtenir un devis ou discuter d'un projet professionnel, contactez Denis Thévenin directement.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
            {([
              { icon: "mail" as const, href: "mailto:lemiroir360@gmail.com", label: "lemiroir360@gmail.com" },
              { icon: "phone" as const, href: "tel:+33612298992", label: "06 12 29 89 92" },
            ] as const).map(({ icon, href, label }) => (
              <a key={href} href={href} style={{ display:"flex", alignItems:"center", gap:"0.8rem", color:"rgba(238,242,246,0.75)", textDecoration:"none", fontSize:"0.9rem", transition:"color 0.2s" }} onMouseOver={e=>e.currentTarget.style.color="#8FA4B8"} onMouseOut={e=>e.currentTarget.style.color="rgba(238,242,246,0.75)"}>
                <span style={{ width:31, height:31, border:"1px solid rgba(143,164,184,0.35)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon name={icon} size={13} color="#8FA4B8"/>
                </span>
                {label}
              </a>
            ))}
          </div>
          <div style={{ marginTop:"0.3rem" }}>
            <a href="mailto:lemiroir360@gmail.com" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", background:"#F3F6F9", color:"#151D28", padding: compact ? "0.8rem 1.5rem" : "0.85rem 1.9rem", fontSize:"0.79rem", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:500, textDecoration:"none", transition:"background 0.25s, color 0.25s", fontFamily:"'DM Sans',sans-serif", minHeight:44 }} onMouseOver={e=>{e.currentTarget.style.background="#8FA4B8";e.currentTarget.style.color="#F3F6F9";}} onMouseOut={e=>{e.currentTarget.style.background="#F3F6F9";e.currentTarget.style.color="#151D28";}}>
              Envoyer un message
            </a>
          </div>
        </div>
      </FadeUp>
    </section>
  );
};

const Footer = () => {
  const { mobile, tablet, compact } = useBreakpoint();
  const footPad = compact
    ? padBlock("1.5rem", "1rem")
    : mobile
      ? padBlock("1.6rem", "1.25rem")
      : tablet
        ? padBlock("1.75rem", "2.5rem")
        : padBlock("1.9rem", "6rem");
  return (
    <footer style={{ background:"#111", color:"rgba(238,242,246,0.4)", padding: footPad, display:"flex", flexDirection: mobile ? "column" : "row", justifyContent:"space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? "0.75rem" : 0, fontSize: compact ? "0.68rem" : "0.72rem", letterSpacing:"0.05em" }}>
      <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: compact ? "1rem" : "1.1rem", color:"rgba(238,242,246,0.6)", letterSpacing:"0.1em" }}>Miroir 360°</div>
      <div style={{ maxWidth: "100%", lineHeight:1.5 }}>© 2025 Denis Thévenin — Brevet international déposé</div>
      <a href="mailto:lemiroir360@gmail.com" style={{ color:"rgba(238,242,246,0.4)", textDecoration:"none", wordBreak:"break-all" }} onMouseOver={e=>e.currentTarget.style.color="#8FA4B8"} onMouseOut={e=>e.currentTarget.style.color="rgba(238,242,246,0.4)"}>lemiroir360@gmail.com</a>
    </footer>
  );
};

export default function App() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}body{background:#F3F6F9;font-family:'DM Sans',sans-serif;overflow-x:hidden;overflow-wrap:break-word}#hero{min-height:100vh}`}</style>
      <NavBar/>
      <Hero/>
      <Ticker/>
      <ConceptSection/>
      <ProductGallerySection/>
      <AdvantagesSection/>
      <WhoSection/>
      <VersionsSection/>
      <PressSection/>
      <CTASection/>
      <Footer/>
    </>
  );
}