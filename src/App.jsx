import React, { useRef, useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// EDIT ME — swap in the real names, dates, venues, and parents' names.
// Order: Engagement -> Bollywood Night -> Wedding.
// ---------------------------------------------------------------------------
const COUPLE = { partnerA: "Varghese", partnerB: "Aleena" };
const PARENTS = {
  groom: "Mr. Jose Ukken & Mrs. Shoba Jose",
  bride: "Mr. & Mrs. Babu Varghese",
};

const SECTIONS = [
  {
    key: "engagement",
    nav: "Engagement",
    intro: "PLEASE JOIN US TO CELEBRATE THE ENGAGEMENT OF",
    date: "Sunday, September 27, 2026",
    swapNames: true, 
    time: "3pm at chruch and 6:30pm at reception",
    quote: "\u201CThis is my beloved, and this is my friend.\u201D — Song of Solomon 5:16",
    ceremony: { label: "CEREMONY", name: "ST. MARY'S FORANE CHURCH", address: "Chalakudy, Kerala" },
    reception: { label: "RECEPTION", name: "HEARTLAND CONVENTION CENTRE", address: "Chalakudy, Kerala" },
    closing: "we invite you to share in our joy and celebrate with us",
    dressing: "Dress code:Any solid colour",
    theme: "dusk",
  },
  {
    key: "bollywood",
    nav: "Bollywood Night",
    intro: "PLEASE JOIN THE GROOM'S FAMILY FOR THE  മധുരംവെപ്പ് CELEBRATION",
    date: "Bollywood Night",
    time: "WEDNESDAY, SEPTEMBER 30, 2026 · SIX IN THE EVENING",
    quote: "Let the music find you, and don't stop till the last song fades.",
    venue: { label: "VENUE", name: "GROOM'S RESIDENCE", address: "Chalakudy, Kerala" },
    closing: "Dance floor opens for all",
    dressing: "Dress code:Bollywood / Indian attire",
    theme: "night",
  },
  {
    key: "wedding",
    nav: "Wedding",
    intro: "PLEASE JOIN US TO CELEBRATE THE MARRIAGE OF",
    date: "Sunday, October 4, 2026",
    time: "AT THREE O'CLOCK IN THE AFTERNOON",
    quote: "\u201CTherefore what God has joined together, let no one separate.\u201D — Mark 10:9",
    ceremony: { label: "CEREMONY", name: "ST. MARY'S FORANE CHURCH", address: "Chalakudy, Kerala" },
    reception: { label: "RECEPTION", name: "CIAL CONVENTION CENTRE", address: "Nedumbassery, Kerala" },
    closing: "As our two lives blend into one, we look forward to celebrating with you",
    dressing: "Dress code:Any pastel colour",
    theme: "dawn",
  },
];

// ---------------------------------------------------------------------------

 function useBackgroundMusic() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.35; // adjust 0–1 to taste
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return { playing, toggle, error: false };
}

function Backdrop({ theme }) {
  if (theme === "dusk") {
    return (
      <div className="backdrop backdrop-dusk">
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="glow glow-c" />
      </div>
    );
  }
  if (theme === "night") {
    return (
      <div className="backdrop backdrop-night">
        <div className="bokeh bokeh-1" />
        <div className="bokeh bokeh-2" />
        <div className="bokeh bokeh-3" />
        <div className="bokeh bokeh-4" />
        <div className="bokeh bokeh-5" />
      </div>
    );
  }
  return (
    <div className="backdrop backdrop-dawn">
      <div className="bloom bloom-left" />
      <div className="bloom bloom-right" />
      <div className="horizon" />
    </div>
  );
}

function VenueBlock({ block }) {
  return (
    <div className="venue-block">
      <p className="venue-label">{block.label}</p>
      <p className="venue-name">{block.name}</p>
      <p className="venue-address">{block.address}</p>
    </div>
  );
}

function Section({ data, innerRef }) {
  return (
    <section ref={innerRef} className={`panel theme-${data.theme}`} id={data.key}>
      <Backdrop theme={data.theme} />
      <div className="panel-card">
        <p className="intro">{data.intro}</p>

        {data.key !== "bollywood" ? (
  <h2 className="names">
    {data.swapNames ? COUPLE.partnerB : COUPLE.partnerA}
    <span className="amp">&amp;</span>
    {data.swapNames ? COUPLE.partnerA : COUPLE.partnerB}
  </h2>
) : (
          <h2 className="names names-single">{data.date}</h2>
        )}

        {data.key !== "bollywood" && <p className="date-script">{data.date}</p>}
        <p className="time-line">{data.time}</p>

        <p className="quote">{data.quote}</p>

        <div className="venues">
          {data.ceremony && <VenueBlock block={data.ceremony} />}
          {data.reception && <VenueBlock block={data.reception} />}
          {data.venue && <VenueBlock block={data.venue} />}
        </div>
        {data.dressing && <p  className="dressing">{data.dressing}  </p>}

        <p className="closing">{data.closing}</p>
      </div>
    </section>
  );
}

function Hero({ innerRef }) {
  return (
    <section ref={innerRef} className="panel theme-hero">
      <div className="backdrop backdrop-hero" />
      <div className="panel-card hero-card">
        <p className="hero-kicker">TOGETHER WITH THEIR FAMILIES</p>
        <p className="hero-parents">{PARENTS.groom}</p>
        <p className="hero-and">and</p>
        <p className="hero-parents">{PARENTS.bride}</p>
        <p className="hero-request">
          request the honour of your presence at the wedding celebrations of
        </p>
        <h1 className="hero-names">
             <div style={{ display: 'flex', gap: '16px' }}>
             
    
          {COUPLE.partnerA}
          <span className="amp">&amp;</span>
       
          {COUPLE.partnerB}
          </div>
        </h1>
        <p className="hero-scroll">Scroll to see each celebration</p>
      </div>
    </section>
  );
}

export default function App() {
  const { playing, toggle, error } = useBackgroundMusic();
  const heroRef = useRef(null);
  const refs = useRef(SECTIONS.map(() => React.createRef()));

  const scrollTo = (i) => refs.current[i].current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="wc-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Parisienne&family=Cormorant+Garamond:ital@1&family=Jost:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        .wc-root {
          font-family: 'Jost', sans-serif;
          scroll-snap-type: y proximity;
          overflow-y: auto;
          height: 100vh;
          scroll-behavior: smooth;
        }

        .panel {
          min-height: 100vh;
          scroll-snap-align: start;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 60px 24px;
        }

        .backdrop { position: absolute; inset: 0; z-index: 0; }

        /* ---------- Hero: family invitation ---------- */
        .backdrop-hero { background: linear-gradient(180deg, #F7F1E9 0%, #EFE4D2 100%); }
        .theme-hero .panel-card, .theme-hero .panel-card * { color: #4A4038; }
        .hero-card { max-width: 520px; }
        .hero-kicker { font-size: 11px; letter-spacing: 0.28em; margin: 0 0 20px; opacity: 0.75; }
        .hero-parents { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(18px, 2.4vw, 22px); margin: 4px 0; }
        .hero-and { font-size: 11px; letter-spacing: 0.2em; margin: 6px 0; opacity: 0.6; }
        .hero-request { font-size: 13px; letter-spacing: 0.05em; line-height: 1.7; margin: 24px 0 20px; opacity: 0.85; }
        .hero-names { font-family: 'Parisienne', cursive; font-weight: 400; font-size: clamp(38px, 7vw, 64px); margin: 6px 0 26px; }
        .hero-scroll { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.55; }

        /* ---------- Engagement: candlelit dusk ---------- */
        .backdrop-dusk { background: radial-gradient(120% 90% at 50% 30%, #3a3128 0%, #1e1712 70%, #14100c 100%); }
        .backdrop-dusk .glow { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.55; }
        .glow-a { width: 280px; height: 280px; background: #C9A86A; top: 8%; left: 12%; }
        .glow-b { width: 220px; height: 220px; background: #B8894F; bottom: 10%; right: 14%; }
        .glow-c { width: 340px; height: 340px; background: #7A5A34; top: 40%; left: 60%; opacity: 0.3; }

        /* ---------- Bollywood Night: warm bokeh party ---------- */
        .backdrop-night { background: radial-gradient(120% 90% at 50% 40%, #35123a 0%, #1c0a26 65%, #10061c 100%); }
        .backdrop-night .bokeh {
          position: absolute; border-radius: 50%; filter: blur(2px);
          animation: bokeh-drift 9s ease-in-out infinite;
        }
        .bokeh-1 { width: 18px; height: 18px; background: #E2A64C; top: 18%; left: 20%; animation-delay: 0s; }
        .bokeh-2 { width: 12px; height: 12px; background: #E85D9E; top: 65%; left: 12%; animation-delay: 1.4s; }
        .bokeh-3 { width: 22px; height: 22px; background: #E2A64C; top: 30%; left: 78%; animation-delay: 2.6s; }
        .bokeh-4 { width: 14px; height: 14px; background: #7FD8D0; top: 75%; left: 70%; animation-delay: 0.8s; }
        .bokeh-5 { width: 16px; height: 16px; background: #E85D9E; top: 45%; left: 50%; animation-delay: 3.4s; }
        @keyframes bokeh-drift {
          0%, 100% { transform: translateY(0); opacity: 0.55; filter: blur(2px); }
          50% { transform: translateY(-16px); opacity: 1; filter: blur(0.5px); }
        }

        /* ---------- Wedding: soft dawn, floral + horizon ---------- */
        .backdrop-dawn { background: linear-gradient(180deg, #EAF2EF 0%, #F7F1E9 55%, #EDE1CC 100%); }
        .backdrop-dawn .horizon { position: absolute; left: 0; right: 0; top: 42%; height: 1px; background: rgba(58,50,46,0.12); }
        .bloom { position: absolute; top: -60px; width: 260px; height: 260px; border-radius: 50%; filter: blur(50px); opacity: 0.5; }
        .bloom-left { left: -60px; background: radial-gradient(circle, #F4CBD2 0%, #C9DCC3 70%, transparent 100%); }
        .bloom-right { right: -60px; background: radial-gradient(circle, #EFD9B8 0%, #C9DCC3 70%, transparent 100%); }

        .panel-card {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 560px;
        }

        .intro { font-size: 12px; letter-spacing: 0.22em; font-weight: 400; margin: 0 0 26px; }

        .names { font-family: 'Parisienne', cursive; font-weight: 400; font-size: clamp(34px, 6vw, 54px); line-height: 1.25; margin: 0 0 18px; }
        .names-single { font-size: clamp(38px, 7vw, 62px); }
        .amp { display: block; font-size: 0.5em; margin: 4px 0; opacity: 0.75; }

        .date-script { font-family: 'Parisienne', cursive; font-size: clamp(20px, 3vw, 26px); margin: 0 0 10px; }
        .time-line { font-size: 12px; letter-spacing: 0.14em; margin: 0 0 24px; opacity: 0.85; }

        .quote {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(14px, 1.8vw, 16.5px);
          line-height: 1.6;
          max-width: 40ch;
          margin: 0 auto 30px;
          opacity: 0.85;
        }

        .venues { display: flex; flex-direction: column; gap: 20px; margin-bottom: 28px; }
        .venue-block { }
        .venue-label { font-size: 10px; letter-spacing: 0.24em; margin: 0 0 6px; opacity: 0.55; }
        .venue-name { font-size: 14px; letter-spacing: 0.08em; margin: 0 0 2px; font-weight: 500; }
        .venue-address { font-size: 12.5px; letter-spacing: 0.04em; margin: 0; opacity: 0.75; }

        .dressing { font-size: 12px; letter-spacing: 0.14em; margin: 0 0 24px; opacity: 0.85; }
        .closing { font-family: 'Parisienne', cursive; font-size: clamp(18px, 2.4vw, 22px); margin: 0; opacity: 0.85; }

        .theme-dusk .panel-card, .theme-dusk .panel-card * { color: #EDE3D3; }
        .theme-night .panel-card, .theme-night .panel-card * { color: #F3E4EE; }
        .theme-dawn .panel-card, .theme-dawn .panel-card * { color: #4A4038; }

        .side-nav {
          position: fixed; right: 24px; top: 50%; transform: translateY(-50%); z-index: 6;
          display: flex; flex-direction: column; gap: 16px; align-items: flex-end;
        }
        .side-nav button { background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 0; }
        .side-nav-label { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(120,110,100,0.9); opacity: 0; transition: opacity 0.2s ease; }
        .side-nav button:hover .side-nav-label { opacity: 1; }
        .side-nav-dot { width: 6px; height: 6px; border-radius: 50%; background: #B49361; opacity: 0.6; transition: opacity 0.2s ease, transform 0.2s ease; }
        .side-nav button:hover .side-nav-dot { opacity: 1; transform: scale(1.3); }

        .music-toggle {
          position: fixed; bottom: 24px; left: 24px; z-index: 6;
          display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
        }
        .music-toggle button {
          border: 1px solid rgba(255,255,255,0.35);
          border-radius: 999px; padding: 9px 16px; cursor: pointer;
          font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
          color: #EDE3D3; background: rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
        }
        .music-hint { font-size: 10px; color: rgba(0,0,0,0.5); background: rgba(255,255,255,0.7); padding: 4px 8px; border-radius: 6px; max-width: 180px; }

        @media (max-width: 640px) {
          .side-nav { right: 12px; gap: 12px; }
          .side-nav-label { display: none; }
        }
      `}</style>

      <Hero innerRef={heroRef} />

      {SECTIONS.map((s, i) => (
        <Section data={s} innerRef={refs.current[i]} key={s.key} />
      ))}

      <nav className="side-nav" aria-label="Jump to event">
        {SECTIONS.map((s, i) => (
          <button key={s.key} onClick={() => scrollTo(i)}>
            <span className="side-nav-label">{s.nav}</span>
            <span className="side-nav-dot" />
          </button>
        ))}
      </nav>

      <div className="music-toggle">
        <button onClick={toggle}>{playing ? "Pause music" : "Play soft music"}</button>
        {error && (
          <span className="music-hint">
           
          </span>
        )}
      </div>
    </div>
  );
}