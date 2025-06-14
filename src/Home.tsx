import { createEffect, createSignal, onMount } from "solid-js";
import sdk from "@farcaster/frame-sdk";
import type { Context } from "@farcaster/frame-core";
import {
  createWalletClient,
  custom,
  parseEther,
  type WalletClient,
} from "viem";
import { base } from "viem/chains";

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = createSignal(false);
  const [context, setContext] = createSignal<Context.FrameContext>();
  const [client, setClient] = createSignal<WalletClient>();
  const [address, setAddress] = createSignal<`0x${string}` | undefined>();
  const [isLoading, setIsLoading] = createSignal(false);

  // Farcaster Mini App Integration
  createEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      await sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded()) {
      setIsSDKLoaded(true);
      load();
    }
  });
  // end Farcaster Mini App Integration

  // Farcaster Injected Wallet Integration
  createEffect(async () => {
    const walletClient = createWalletClient({
      account: address(),
      chain: base,
      transport: custom(sdk.wallet.ethProvider),
    });
    setClient(walletClient);

    // you may want to change the below to another address or use requestAddresses()
    // see https://viem.sh/docs/clients/wallet
    const addresses = await walletClient.getAddresses();
    setAddress(addresses[0]);
  });
  // end Farcaster Injected Wallet Integration

  const shareCast = async () => {
    sdk.actions.composeCast({
      text: "Farewell Warpcast, I just minted the new POAP! Get yours too and support Farcaster choooo chooo🚂! Thanks @gabo and @samuellhuber.eth",
      embeds: ["https://fc-poap.dtech.vision/"],
      close: true,
    });
  };

  const mintPoap = async (amount: string) => {
    const currentClient = client();
    const currentAddress = address();

    if (!currentClient || !currentAddress) {
      console.error("Wallet client or address not initialized");
      return;
    }

    try {
      setIsLoading(true);
      const hash = await currentClient.sendTransaction({
        account: currentAddress,
        chain: base,
        to: "0xd1A84b374fd0B9466C1e99DDCE15dc6179C8376a",
        value: parseEther(amount.toString()),
      });

      await shareCast();
      return hash;
    } catch (error) {
      console.error("Transaction failed:", error);
      window.alert(
        error instanceof Error
          ? error.message
          : "Transaction failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="mt-10">
      <section id="poap" class="poap-section card">
        <h2 class="poap-title">
          <img
            class="poap-logo"
            src="https://ethereumupgrades.com/assets/img/poap-logo.webp"
            alt="POAP Logo"
          />
          <img
            class="poap-text"
            src="https://ethereumupgrades.com/assets/img/poap.png"
            alt="POAP Text"
          />
          <img
            style={{ height: "60px" }}
            src="https://dtech.vision/favicon.svg"
            alt="dTech Logo"
          />
        </h2>
        <div class="poap-directions">
          <p>
            To mint the Farewell Warpcast POAP,{" "}
            <strong>
              send 0.001 ETH to{" "}
              <a
                href="https://nouns.build/dao/base/0x8de71d80ee2c4700bc9d4f8031a2504ca93f7088/789"
                target="_blank"
                rel="noreferrer"
                class="ethstaker-link"
              >
                Purple DAO
              </a>
            </strong>{" "}
            before May 24, 11:59 PM UTC
          </p>
          <ul>
            <li>
              To get the Farewell Warpcast POAP you have to send using this mini
              app as we'll issue you the POAP.
            </li>
          </ul>
        </div>
        <div>
          <div class="card poap-option-card">
            <div class="poap-img-wrapper">
              <a
                href="https://poap.gallery/drops/189671"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://assets.poap.xyz/5adeb818-235d-4824-9ba5-ffb3e46c4279.png?size=large"
                  alt="POAP Artwork"
                  title="POAP Artwork"
                  class="poap-img"
                />
              </a>
            </div>
            <div class="poap-cost">Support Purple DAO</div>
            <div class="poap-details">
              <button
                type="button"
                disabled={isLoading()}
                onClick={() => mintPoap("0.001")}
                class="poap-airship-button"
              >
                {isLoading() ? "Minting..." : "Mint POAP"}
              </button>
            </div>
          </div>
        </div>

        <style>
          {`
            :root {
              --bg: 255, 254, 246;
              --card: #ffffff;
              --text: #966103;
              --accent-text: #b8810c;
              --accent-bg: #f8f0d3;
              --accent-border: #b8810c;
              --accent-text-hover: #dcae0e;
              --accent-bg-hover: #f6e8b4;
              --shadow: rgba(0, 0, 0, 0.05);
              --border: #dfe3ec;
              --font-main: 'Inter', 'Segoe UI', sans-serif;
            }

            body {
              font-family: var(--font-main);
              color: var(--text);
              background: rgba(255,254,246,100);
            }

            .card {
              background: var(--card);
              border: 1px solid var(--border);
              box-shadow: 0 4px 12px var(--shadow);
              padding: 24px;
              border-radius: 14px;
              margin-bottom: 30px;
            }

            .poap-section {
              max-width: 1000px;
              margin: 0 auto;
              margin-top: 2rem;
              margin-bottom: 2rem;
              background-image: linear-gradient(rgba(255, 255, 255, 0.97), rgba(255, 255, 255, 0.97)), url(https://ethereumupgrades.com/assets/img/poap-bg.svg);
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              color: #473e6b;
            }

            .poap-title {
              display: flex;
              align-items: center;
              gap: 1rem;
              margin-bottom: 2rem;
            }

            .poap-logo {
              height: 40px;
            }

            .poap-text {
              height: 30px;
            }

            .poap-directions {
              margin-bottom: 2rem;
            }

            .poap-directions ul {
              list-style-type: disc;
              padding-left: 1.5rem;
              margin-top: 1rem;
            }

            .poap-directions li {
              margin: 10px 0;
            }

            a {
              color: var(--accent-text);
              font-weight: 500;
              text-decoration: none;
            }

            a:hover {
              color: var(--accent-text-hover);
              text-decoration: none;
            }

            .ethstaker-link {
              color: #6d62df;
              text-decoration: none;
            }

            .ethstaker-link:hover {
              color: #8579ff;
              text-decoration: underline;
            }

            .poap-options {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              align-items: stretch;
              gap: 25px;
              margin-bottom: 2rem;
            }

            .poap-option-card {
              flex: 1;
              min-width: 280px;
              max-width: 450px;
              border: 1px solid #473e6b !important;
              border-radius: 32px !important;
              box-shadow: -6px 8px #ecebff !important;
              padding: 16px;
              transition: all 0.3s ease !important;
              background: var(--card);
            }

            .poap-option-card:hover {
              box-shadow: -12px 14px #ecebff !important;
              transform: translate(6px, -6px);
            }

            .poap-img-wrapper {
              border: 1px solid #eac9f8;
              border-radius: 24px;
              padding: 16px;
              background: #f5f4ff;
              display: flex;
              gap: 1rem;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              margin-bottom: 1rem;
            }

            .poap-img-wrapper a {
              text-decoration: none !important;
            }

            .poap-img {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              transition: transform 0.2s ease;
            }

            .poap-img:hover {
              transform: scale(1.05);
            }

            .poap-cost {
              font-size: 1.1rem;
              font-weight: 500;
              margin: 1rem 0;
              color: #473e6b;
              text-align: center;
            }

            .poap-details {
              text-align: center;
            }

            .poap-airship-button {
              background: #7c3aed;
              color: white;
              padding: 0.75rem 2rem;
              border-radius: 50px;
              text-decoration: none !important;
              font-weight: 500;
              transition: all 0.2s ease;
              display: inline-block;
            }

            .poap-airship-button:hover {
              background: #6d28d9;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
              color: white;
              text-decoration: none;
            }

            .poap-sponsor {
              text-align: center;
              margin-top: 3rem;
              padding-top: 2rem;
              border-top: 1px solid var(--border);
            }

            .poap-sponsor-img {
              margin-top: 1rem;
              margin-left: auto;
              margin-right: auto;
              display: block;
              max-width: 200px;
            }

            @media screen and (min-width: 768px) {
              .poap-img {
                width: 120px;
                height: 120px;
              }

              .poap-img-wrapper {
                padding: 16px 24px;
              }
            }

            @media screen and (max-width: 767px) {
              .poap-section {
                margin: 1rem;
              }

              .poap-options {
                gap: 16px;
              }

              .poap-option-card {
                width: 100%;
              }

              .poap-img-wrapper {
                gap: 0.75rem;
              }

              .poap-img-wrapper a:not(:first-child) {
                margin-top: 0;
              }
            }
          `}
        </style>
      </section>
    </div>
  );
}
