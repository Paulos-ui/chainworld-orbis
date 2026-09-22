export const BASE_WORLD_PROMPT = 
`ChainWorld is a persistent cinematic science fiction world where verified blockchain activity physically transforms the environment.

The world is a vast mineral megacity built across mountains, deep valleys, monumental bridges and ancient industrial structures. Warm amber energy represents verified onchain activity and travels physically through the world.

Create a premium cinematic action sequence with strong depth, realistic materials, atmospheric lighting, volumetric dust, dramatic scale and continuous environmental motion.

Use dynamic camera movement when appropriate, including tracking shots, aerial pursuit, rapid push-ins, sweeping crane movement and controlled cinematic acceleration.

Every blockchain event must cause a clearly visible physical consequence.

Keep geography and architecture coherent between scenes. Preserve the identity of ChainWorld while making each event visually distinct.

No text. No logos. No interface elements. No subtitles.
`;

const EVENT_RECIPES: Record<
  WorldEventKind,
  (detail: string) => string
> = {
  wallet: (detail) => 
${BASE_WORLD_PROMPT}

EVENT: WALLET ARRIVAL
DETAIL: ${detail}

A previously dormant district suddenly detects a new participant. Massive stone mechanisms awaken beneath the terrain. Amber energy races through buried channels as an enormous gateway rises from the ground.

The camera dives toward the awakening district, passes between moving architectural structures and follows the energy toward the gateway.

Dust erupts from the ground, mechanical sections rotate into position and distant structures illuminate sequentially.

End with the gateway fully activated and the surrounding district alive with motion.
,

  transfer: (detail) => 
${BASE_WORLD_PROMPT}

EVENT: VALUE TRANSFER
DETAIL: ${detail}

Create an intense high speed cinematic transfer sequence.

A concentrated stream of brilliant amber energy launches from one distant district and races across ChainWorld.

The camera aggressively tracks beside the energy as it accelerates through tunnels, across enormous bridges, around monumental structures and above deep valleys.

Physical mechanisms react as the energy passes. Gates open rapidly, turbines rotate, suspended structures shift and particles scatter through the atmosphere.

The energy reaches the destination with a powerful controlled impact that sends illuminated patterns through the surrounding architecture.

Maintain continuous forward momentum and strong cinematic action throughout the sequence.
,

  mint: (detail) => 
${BASE_WORLD_PROMPT}

EVENT: ASSET CREATION
DETAIL: ${detail}

Create a dramatic artifact forging sequence.

At the center of an enormous industrial chamber, streams of molten amber energy converge at high speed.

Mechanical rings rotate around the energy while fragments of mineral material rise from the floor and assemble in midair.

The camera circles the forming object while energy pulses through the chamber.

The fragments lock together progressively until a completely new sculptural artifact is created.

Finish with a powerful energy pulse revealing the completed object while the surrounding machinery settles.
,

  governance: (detail) => `
${BASE_WORLD_PROMPT}

EVENT: GOVERNANCE DECISION
DETAIL: ${detail}

Create a monumental city scale transformation.

Multiple energy routes ignite simultaneously across ChainWorld and race toward a gigantic central structure.

The camera sweeps rapidly above the city following several streams as bridges rotate, waterways redirect and enormous architectural sections begin moving.

The streams converge at the central structure.

A powerful amber pulse spreads outward across the landscape and permanently reorganizes parts of the city.

Show the scale of the transformation with a dramatic aerial reveal.
,

  contract: (detail) =>
${BASE_WORLD_PROMPT}

EVENT: SMART CONTRACT EXECUTION
DETAIL: ${detail}

Create a precise but intense mechanical chain reaction.

An amber signal enters a gigantic machine embedded inside the city.

The camera follows the signal through moving gears, rotating rings, mechanical gates and interconnected chambers.

Each mechanism activates the next with increasing speed.

The sequence culminates when a massive final mechanism locks into position and releases a controlled amber energy wave through the surrounding district.

Keep the action readable, physical and cinematic.
,
};

export function makeWorldEvent(
  kind: WorldEventKind,
  title: string,
  detail: string,
  txHash?: string
): WorldEvent {
  return {
    id: ${Date.now()}-${Math.random().toString(16).slice(2)}`,
    kind,
    title,
    detail,
    prompt: EVENT_RECIPES[kind](detail),
    createdAt: Date.now(),
    txHash,
  };
}
