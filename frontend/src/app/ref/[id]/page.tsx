'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Shield, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { getProgram } from '@/utils/program';
import { PublicKey } from '@solana/web3.js';

import ClientWalletButton from '@/components/ClientWalletButton';

export default function ReferralPage() {
  const { id } = useParams();
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [status, setStatus] = useState<'idle' | 'linking' | 'success' | 'error'>('idle');

  const handleLink = async () => {
    if (!connected || !publicKey) return;
    
    setStatus('linking');
    try {
      const program = getProgram(connection, { publicKey, sendTransaction });
      
      // In a real execution, we'd derive the PDA and call register_referral
      console.log("Linking wallet to influencer:", id);
      
      await new Promise(r => setTimeout(r, 2000)); // Simulate tx latency
      setStatus('success');
      alert("WALLET LINKED: You are now tracked by @" + id);
    } catch (err) {
      console.error(err);
      setStatus('error');
      alert("Linking failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md glass p-10 rounded-3xl text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-glow">
          <Shield className="text-primary w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black tracking-tighter mb-4 uppercase">You've been invited</h1>
        <p className="text-foreground/50 mb-10">
          Link your wallet to <span className="text-primary font-bold">@{id}</span> to unlock 
          exclusive rewards and verified attribution on your swaps.
        </p>

        {!connected ? (
          <div className="space-y-4">
            <ClientWalletButton className="!w-full !justify-center !bg-primary !text-background !font-black !rounded-xl !h-14" />
            <p className="text-xs text-foreground/30">Connect your Solana wallet to continue</p>
          </div>
        ) : (
          <div className="space-y-4">
            {status === 'idle' && (
              <button 
                onClick={handleLink}
                className="w-full h-14 bg-primary text-background font-black rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-all"
              >
                LINK WALLET <ArrowRight className="w-5 h-5" />
              </button>
            )}
            
            {status === 'linking' && (
              <div className="w-full h-14 glass rounded-xl flex items-center justify-center gap-3 text-primary font-bold">
                <Loader2 className="w-5 h-5 animate-spin" /> LINKING ON-CHAIN...
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-6">
                <div className="w-full h-14 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center gap-3 text-primary font-bold">
                  <CheckCircle2 className="w-5 h-5" /> WALLET LINKED!
                </div>
                
                {/* Jupiter Terminal Integration */}
                <div id="integrated-terminal" className="w-full"></div>
                <button 
                  onClick={() => {
                    // @ts-ignore
                    window.Jupiter.init({
                      displayMode: "modal",
                      mint: "So11111111111111111111111111111111111111112",
                      containerId: "integrated-terminal",
                      // In a real app, this would be the influencer's referral account
                      referralAccount: "6p6W51H_placeholder", 
                      feeBps: 100 // 1% fee for the influencer
                    });
                  }}
                  className="w-full py-4 bg-secondary text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  START SWAPPING <ArrowRight className="w-5 h-5" />
                </button>

                <script src="https://terminal.jup.ag/main-v2.js" async></script>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
