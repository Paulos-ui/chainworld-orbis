"use client";

import { useEffect, useMemo, useState } from "react";
import { OrbisPlayer } from "@/components/orbis-player";
import { useOrbisSession } from "@/hooks/use-orbis-session";
import { useWallet } from "@/hooks/use-wallet";
import { BASE_WORLD_PROMPT, makeWorldEvent, type WorldEvent, type WorldEventKind } from "@/lib/chainworld";

const demos: {kind: WorldEventKind; label: string; detail: string}[] = [
  { kind: "transfer", label: "Transfer", detail: "2.40 ETH · 0x71…9A → 0x2C…18" },
  { kind: "mint", label: "Mint", detail: "Artifact #1847 · new provenance created" },
  { kind: "governance", label: "Governance", detail: "Proposal 42 · consensus reached" },
  { kind: "contract", label: "Contract", detail: "Settlement contract · execution confirmed" },
];

export function ChainWorldSession({ clearJwt, getCurrentJwt }: {clearJwt:()=>void; getCurrentJwt:()=>string|null}) {
  const session = useOrbisSession(clearJwt, getCurrentJwt);
  const wallet = useWallet();
  const [worldEvents, setWorldEvents] = useState<WorldEvent[]>([]);
  const [autoSteer, setAutoSteer] = useState(true);
  const shortAddress = wallet.address ? `${wallet.address.slice(0,6)}…${wallet.address.slice(-4)}` : "Not connected";
  const chainNumber = wallet.chainId ? parseInt(wallet.chainId, 16) : 0;

  useEffect(() => {
    if (!wallet.address || worldEvents.some((e) => e.kind === "wallet")) return;
    const event = makeWorldEvent("wallet", "Wallet entered", shortAddress);
    setWorldEvents((current) => [event, ...current].slice(0, 8));
  }, [wallet.address, shortAddress, worldEvents]);

  const stateLabel = useMemo(() => session.runStarted ? (session.paused ? "WORLD PAUSED" : "WORLD LIVE") : session.connected ? "ORBIS READY" : "OFFLINE", [session.connected, session.paused, session.runStarted]);

  const beginWorld = async () => {
    session.setPrompt(BASE_WORLD_PROMPT);
    await session.startWithPrompt(BASE_WORLD_PROMPT);
  };

  const trigger = async (kind: WorldEventKind, title: string, detail: string) => {
    const event = makeWorldEvent(kind, title, detail);
    setWorldEvents((current) => [event, ...current].slice(0, 8));
    if (autoSteer && session.runStarted) await session.steerWithPrompt(event.prompt);
  };

  return (
    <section className="world-console" id="world">
      <div className="console-topline"><span>LIVE SYSTEM / ORBIS STABLE</span><span className={session.runStarted ? "live-dot active" : "live-dot"}>{stateLabel}</span></div>
      <div className="console-grid">
        <div className="world-stage">
          <OrbisPlayer connected={session.connected} muted={session.muted} runStarted={session.runStarted} status={session.status}/>
          <div className="stage-coordinate"><span>WORLD STATE</span><b>{worldEvents[0]?.kind.toUpperCase() || "GENESIS"}</b></div>
        </div>
        <aside className="world-panel">
          <div className="panel-section identity"><p className="micro">IDENTITY</p><strong>{shortAddress}</strong><span>{chainNumber ? `Chain ${chainNumber}` : "Connect a wallet to bind identity"}</span><button className="paper-button" onClick={wallet.connect} disabled={wallet.connecting}>{wallet.connected ? "Wallet connected" : wallet.connecting ? "Requesting…" : "Connect wallet"}</button>{wallet.error && <small className="panel-error">{wallet.error}</small>}</div>
          <div className="panel-section"><div className="panel-heading"><p className="micro">WORLD ENGINE</p><label className="switch"><input type="checkbox" checked={autoSteer} onChange={(e)=>setAutoSteer(e.target.checked)}/><span/>AUTO-STEER</label></div>
            {!session.connected ? <button className="primary-action" onClick={session.connectSession} disabled={session.controlsBusy}>Connect Orbis</button> : !session.runStarted ? <button className="primary-action" onClick={beginWorld} disabled={session.controlsBusy}>Initialize world</button> : <div className="engine-actions"><button onClick={session.toggleMuted}>{session.muted ? "Sound off" : "Sound on"}</button><button onClick={session.paused ? session.resume : session.pause}>{session.paused ? "Resume" : "Pause"}</button><button onClick={session.reset}>Reset</button></div>}
            {session.error && <small className="panel-error">{session.error}</small>}
          </div>
          <div className="panel-section"><p className="micro">EVENT INSTRUMENTS</p><div className="event-buttons">{demos.map((d)=><button key={d.kind} disabled={!session.runStarted || session.controlsBusy} onClick={()=>trigger(d.kind, d.label, d.detail)}><i>{d.label.slice(0,1)}</i><span>{d.label}<small>{d.detail}</small></span></button>)}</div></div>
          <div className="panel-section ledger"><p className="micro">LIVE LEDGER</p>{worldEvents.length ? worldEvents.map((event)=><div className="ledger-row" key={event.id}><i/><span><b>{event.title}</b><small>{event.detail}</small></span><time>{new Date(event.createdAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</time></div>) : <p className="empty-ledger">Waiting for the first world event.</p>}</div>
        </aside>
      </div>
    </section>
  );
}
