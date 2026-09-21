import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./styles.css";

export const metadata: Metadata = {
  title: "ChainWorld — The chain becomes place",
  description: "A living Web3 world that translates on-chain activity into continuous real-time video with Visko Orbis.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
