import type { FrameEmbedNext } from "./schema";

const fcMetadata: FrameEmbedNext = {
  version: "next",
  imageUrl: new URL("https://dtech.vision/tmp/poap.jpg"),
  button: {
    title: "Mint Farewell Warpcast POAP",
    action: {
      type: "launch_frame",
      name: "Farewell Warpcast POAP",
      url: new URL("https://fc-poap.dtech.vision"),
      // url: new URL("https://eco-realized-bool-adware.trycloudflare.com"),
      splashImageUrl: new URL(
        "https://assets.poap.xyz/5adeb818-235d-4824-9ba5-ffb3e46c4279.png",
      ),
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export default function getFCembed(): string {
  return JSON.stringify(fcMetadata);
}
