"use client";

import { useCallback, useEffect, useState } from "react";

type EthereumProvider = {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  on?(event: string, listener: (...args: unknown[]) => void): void;
  removeListener?(event: string, listener: (...args: unknown[]) => void): void;
};

declare global {
  interface Window { ethereum?: EthereumProvider; }
}

export function useWallet() {
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState("");
  const [error, setError] = useState("");
  const [connecting, setConnecting] = useState(false);

  const refresh = useCallback(async () => {
    if (!window.ethereum) return;
    const accounts = (await window.ethereum.request({ method: "eth_accounts" })) as string[];
    const chain = (await window.ethereum.request({ method: "eth_chainId" })) as string;
    setAddress(accounts[0] || "");
    setChainId(chain);
  }, []);

  useEffect(() => {
    void refresh();
    const provider = window.ethereum;
    if (!provider?.on) return;
    const onAccounts = (...args: unknown[]) => setAddress(((args[0] as string[]) || [])[0] || "");
    const onChain = (...args: unknown[]) => setChainId(String(args[0] || ""));
    provider.on("accountsChanged", onAccounts);
    provider.on("chainChanged", onChain);
    return () => {
      provider.removeListener?.("accountsChanged", onAccounts);
      provider.removeListener?.("chainChanged", onChain);
    };
  }, [refresh]);

  const connect = async () => {
    if (!window.ethereum) {
      setError("No injected wallet found. Install MetaMask or another EIP-1193 wallet.");
      return;
    }
    setConnecting(true); setError("");
    try {
      const accounts = (await window.ethereum.request({ method: "eth_requestAccounts" })) as string[];
      const chain = (await window.ethereum.request({ method: "eth_chainId" })) as string;
      setAddress(accounts[0] || ""); setChainId(chain);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Wallet connection was rejected.");
    } finally { setConnecting(false); }
  };

  return { address, chainId, connected: Boolean(address), connecting, error, connect };
}
