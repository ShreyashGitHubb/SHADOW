# SHADOW — The Proof-of-Influence Engine 🛡️

**Built for the Solana Frontier Hackathon.**

Shadow is a decentralized attribution protocol that solves the "Ad-Spend" problem for Solana projects. It allows developers to reward influencers based on **actual on-chain volume** rather than fake social metrics.

## 🚀 The Problem
Crypto marketing is currently a "black box." Projects pay influencers for shills with no way to track if a tweet actually caused a single person to buy on-chain. This leads to billions in wasted ad spend and incentivizes botting.

## ⚡ The Solution
Shadow creates a verifiable link between social influence and on-chain swaps.
1. **Influencers** create a unique Shadow ID on our smart contract.
2. **Users** link their wallets to an influencer via a one-time "Proof of Influence" transaction.
3. **Protocols** integrate the Shadow SDK (or Jupiter Terminal) to route a portion of swap fees back to the verified influencer.

## 🛠️ Tech Stack
- **Smart Contract**: Anchor / Rust (Solana Registry)
- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion
- **DEX Integration**: Jupiter Terminal V2
- **Infrastructure**: Helius (Indexing & Webhooks)

## 📁 Repository Structure
- `/shadow-contract`: The Anchor program managing the influencer registry.
- `/frontend`: The high-fidelity dashboard and referral onboarding flow.
- `/api`: The mock indexing engine for real-time attribution.

## 🏗️ Getting Started

### Prerequisites
- Node.js 18+
- A Solana Wallet (Phantom/Solflare)

### Installation
```bash
# Clone the repo
git clone https://github.com/your-username/shadow-protocol.git

# Install frontend dependencies
cd frontend
npm install

# Start the dev server
npm run dev
```

## 📜 Smart Contract Deployment
If you don't have a local Solana environment, we recommend deploying via **[Solana Playground](https://solpg.io)**.
1. Import `shadow-contract/programs/shadow/src/lib.rs`.
2. Build and Deploy to Devnet.
3. Update the `PROGRAM_ID` in `frontend/src/utils/program.ts`.

---
Built with ❤️ for the Solana Community.
