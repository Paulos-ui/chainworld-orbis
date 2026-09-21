export type WorldEventKind = "wallet" | "transfer" | "mint" | "governance" | "contract";

export type WorldEvent = {
  id: string;
  kind: WorldEventKind;
  title: string;
  detail: string;
  prompt: string;
  createdAt: number;
  txHash?: string;
};

export const BASE_WORLD_PROMPT = `A continuous cinematic world called ChainWorld: a vast warm mineral landscape where blockchain activity exists as physical architecture. Terraced sandstone data-cities rise from a shallow mirror lake, translucent amber ledger ribbons travel between structures, and pale ceramic monoliths represent verified blocks. Natural daylight, atmospheric scale, restrained materials, architectural photography, coherent geography, slow continuous camera drift. No text, no logos, no neon cyberpunk.`;

export const EVENT_RECIPES: Record<WorldEventKind, (detail: string) => string> = {
  wallet: (detail) => `${BASE_WORLD_PROMPT} A new participant has entered (${detail}). A slender ivory gateway rises from the lake and opens, sending subtle concentric ripples through the existing city. Preserve the same world, camera continuity, geography and material language.`,
  transfer: (detail) => `${BASE_WORLD_PROMPT} A value transfer is occurring (${detail}). A stream of liquid amber light moves visibly from one inhabited terrace to another, crossing the water on a temporary bridge before being absorbed into the destination. Preserve continuity; evolve the current scene rather than cutting away.`,
  mint: (detail) => `${BASE_WORLD_PROMPT} A new digital asset is minted (${detail}). A unique sculptural artifact grows from an empty ceramic plinth, assembling layer by layer from mineral particles. Existing structures remain unchanged and the camera continues its motion.`,
  governance: (detail) => `${BASE_WORLD_PROMPT} A governance decision resolves (${detail}). Multiple small pathways converge toward a central council monolith; when consensus is reached its stone fins unfold and alter the city's shared water channels. Preserve the current environment and cinematic continuity.`,
  contract: (detail) => `${BASE_WORLD_PROMPT} A smart-contract event executes (${detail}). A precise mechanical transformation travels across one district: stone panels rotate, lock into place, and expose an amber inner structure. Keep the same world and continuous camera.`
};

export function makeWorldEvent(kind: WorldEventKind, title: string, detail: string, txHash?: string): WorldEvent {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    kind,
    title,
    detail,
    prompt: EVENT_RECIPES[kind](detail),
    createdAt: Date.now(),
    txHash,
  };
}
