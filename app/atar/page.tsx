import type { Metadata } from "next";
import { AtarClient } from "./AtarClient";

export const metadata: Metadata = {
  title: "ATAR Calculator · HSCLE",
  description: "Estimate your ATAR from your HSC marks using UAC's official 2025 scaling data.",
};

export default function AtarPage() {
  return <AtarClient />;
}
