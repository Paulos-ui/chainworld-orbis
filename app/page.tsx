import { ChainWorldApp } from "@/components/chainworld-app";
import { ChainWorldStory } from "@/components/chainworld-story";

export default function Home() {
  return (
    <main>
      <nav className="site-nav"><a className="brand" href="#top"><i/>CHAINWORLD</a><div><a href="#world">Live world</a><a href="#about">About</a><a href="https://github.com/paulos-ui/chainworld-orbis" target="_blank" rel="noreferrer">Repository ↗</a></div></nav>
      <section className="hero" id="top">
        <div className="hero-index">CW / 001</div>
        <div className="hero-copy"><p className="kicker">AN ON-CHAIN WORLD / POWERED BY ORBIS</p><h1>The chain<br/>becomes <em>place.</em></h1><p className="hero-lede">ChainWorld translates blockchain activity into a continuous, living video world. Transactions move matter. Mints create artifacts. Consensus reshapes the landscape—in real time.</p><a className="hero-cta" href="#world"><span>Enter the live world</span><i>↓</i></a></div>
        <div className="hero-sculpture" aria-hidden="true"><div className="strata s1"/><div className="strata s2"/><div className="strata s3"/><div className="strata s4"/><div className="amber-line"/><span className="coordinate c1">BLOCK / 21,884,103</span><span className="coordinate c2">STATE / EVOLVING</span></div>
        <div className="hero-foot"><span>01 — EXPERIENCE</span><span>SCROLL TO DESCEND INTO THE LEDGER</span></div>
      </section>
      <section className="manifesto"><p>Most chains are <span>observed.</span></p><p>ChainWorld is <em>inhabited.</em></p><div className="manifesto-note">A new interface for real-time on-chain activity, where data is not represented—it has consequence.</div></section>
      <ChainWorldApp />
      <ChainWorldStory />
      <section className="how"><div><p className="kicker">SYSTEM / HOW IT WORKS</p><h2>Four layers.<br/>One continuous world.</h2></div><ol><li><span>01</span><b>Observe</b><p>Wallet and chain events enter the event layer.</p></li><li><span>02</span><b>Interpret</b><p>ChainWorld maps each event to a coherent world-state transition.</p></li><li><span>03</span><b>Steer</b><p>Orbis receives a continuity-aware prompt while generation remains live.</p></li><li><span>04</span><b>Experience</b><p>The same world visibly evolves instead of producing disconnected clips.</p></li></ol></section>
      <section className="guide"><p className="kicker">USER GUIDE</p><div><h2>Enter. Initialize.<br/>Change the world.</h2><p>Connect your wallet to establish an on-chain identity. Connect Orbis and initialize the genesis world. Use the event instruments to demonstrate transfer, mint, governance and contract transitions. With Auto-Steer enabled, every event immediately becomes a visual state change.</p><a href="#world">Return to console ↑</a></div></section>
      <footer><a className="brand" href="#top"><i/>CHAINWORLD</a><p>Built for the Visko Orbis Online Challenge · 2026</p><a href="https://github.com/paulos-ui/chainworld-orbis" target="_blank" rel="noreferrer">paulos-ui / GitHub ↗</a></footer>
    </main>
  );
}
