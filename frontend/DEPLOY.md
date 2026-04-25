# SHADOW Deployment & Final Polish Guide

Follow these steps to move from local development to a live production environment for the Solana Frontier Hackathon.

## 1. Deploy Smart Contract (Anchor)

Prerequisites: Solana CLI & Anchor CLI installed.

```bash
cd shadow-contract

# 1. Build the program
anchor build

# 2. Get the Program ID
anchor keys list


# 3. Update 'declare_id!' in programs/shadow/src/lib.rs with the new ID
# 4. Update 'shadow' in Anchor.toml with the new ID

# 5. Deploy to Devnet
anchor deploy --provider.cluster devnet
```

## 2. Deploy Frontend (Vercel)

```bash
cd frontend

# 1. Install Vercel CLI (optional)
# npm install -g vercel

# 2. Link and deploy
vercel
```

### Environment Variables for Vercel:
| Key | Value |
| --- | --- |
| `NEXT_PUBLIC_PROGRAM_ID` | Your Program ID from step 1 |
| `NEXT_PUBLIC_RPC_URL` | https://api.devnet.solana.com |
| `SHADOW_WEBHOOK_AUTH` | A secret token for your Helius webhook |

## 3. Set Up Helius Webhooks

1.  Go to [Helius.dev](https://helius.dev).
2.  Create a new Webhook.
3.  **URL**: `https://your-vercel-domain.vercel.app/api/shadow`
4.  **Transaction Type**: `SWAP`
5.  **Accounts**: Add your Shadow Program ID.

## 4. Conduct the "Live Test" Loop

1.  **Influencer**: Open your Vercel URL, connect wallet, and create a link.
2.  **User**: Open the link in an Incognito window (or second wallet).
3.  **Action**: Click "Link Wallet" -> Execute transaction.
4.  **Swap**: Use the Jupiter Terminal to swap 0.1 SOL for USDC.
5.  **Verify**: Check your Influencer Dashboard stats for the updated Volume/Earnings.

---

## 5. Final Polish Checklist
- [ ] Verify `favicon.ico` and protocol logos.
- [ ] Check mobile responsiveness on the Dashboard.
- [ ] Ensure all "Demo Mode" mocks are replaced with live `useSWR` or `useEffect` hooks.
