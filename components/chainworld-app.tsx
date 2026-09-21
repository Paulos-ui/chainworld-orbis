"use client";

import { ReactorProvider } from "@reactor-team/js-sdk";
import { useCallback, useRef } from "react";
import { ChainWorldSession } from "@/components/chainworld-session";
import { ORBIS_MODEL_NAME, ORBIS_TRACKS, requestReactorJwt } from "@/lib/orbis";

export function ChainWorldApp() {
  const jwtPromise = useRef<Promise<string> | null>(null);
  const currentJwt = useRef<string | null>(null);
  const getJwt = useCallback(async () => {
    const pending = (jwtPromise.current ??= requestReactorJwt());
    try { const jwt = await pending; currentJwt.current = jwt; return jwt; }
    catch (error) { if (jwtPromise.current === pending) jwtPromise.current = null; throw error; }
  }, []);
  const clearJwt = useCallback(() => { jwtPromise.current = null; currentJwt.current = null; }, []);
  const getCurrentJwt = useCallback(() => currentJwt.current, []);
  return (
    <ReactorProvider apiUrl="https://api.reactor.inc" modelName={ORBIS_MODEL_NAME} modelTracks={[...ORBIS_TRACKS]} connectOptions={{ autoConnect: false }} jwtToken={getJwt}>
      <ChainWorldSession clearJwt={clearJwt} getCurrentJwt={getCurrentJwt}/>
    </ReactorProvider>
  );
}
