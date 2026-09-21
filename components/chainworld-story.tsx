"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const chapters = [
  { n: "01", title: "A ledger you can enter", body: "Blockchains are rich with activity, but we experience them as hashes, tables and charts. ChainWorld gives that activity a spatial language." },
  { n: "02", title: "Events become matter", body: "A transfer becomes a moving resource. A mint becomes a new artifact. Governance reshapes shared infrastructure. Every event has a visual consequence." },
  { n: "03", title: "The world never cuts away", body: "Orbis keeps the scene alive while ChainWorld steers it. The point is not to generate clips—it is to maintain a world that reacts as the chain changes." },
];

export function ChainWorldStory() {
  const root = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (!root.current) return;
      const r = root.current.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, -r.top / Math.max(1, span))));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);
  const active = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
  return (
    <section className="story" ref={root} id="about">
      <div className="story-sticky">
        <div className="story-map" aria-hidden="true" style={{ "--story-progress": progress } as CSSProperties}>
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="world-core"><span>CHAIN</span><b>WORLD</b></div>
          {chapters.map((_, i) => <i key={i} className={`story-node ${i <= active ? "is-active" : ""}`} style={{ transform: `rotate(${i * 112 + progress * 35}deg) translateX(${150 + i * 28}px)` }} />)}
        </div>
        <div className="story-copy">
          <p className="kicker">ABOUT THE PROJECT / {String(active + 1).padStart(2,"0")}</p>
          {chapters.map((chapter, i) => (
            <article key={chapter.n} className={`story-chapter ${active === i ? "is-active" : ""}`}>
              <span>{chapter.n}</span><h2>{chapter.title}</h2><p>{chapter.body}</p>
            </article>
          ))}
          <div className="story-progress"><i style={{ width: `${progress * 100}%` }} /></div>
        </div>
      </div>
    </section>
  );
}
