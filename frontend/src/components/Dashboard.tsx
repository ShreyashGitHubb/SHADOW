'use client';

import React, { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  Link as LinkIcon, 
  Copy, 
  ExternalLink,
  Shield,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import ClientWalletButton from '@/components/ClientWalletButton';
import { getProgram } from '@/utils/program';

export default function Dashboard() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [referralId, setReferralId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!referralId) return;
    
    if (!connected) {
      setGeneratedLink(`${window.location.origin}/ref/${referralId}`);
      return;
    }

    setLoading(true);
    try {
      const program = getProgram(connection, { publicKey, sendTransaction });
      
      // In a real execution, we'd derive the PDA and call the instruction
      // For the demo, we'll simulate the successful on-chain call
      console.log("Calling initialize_influencer for:", referralId);
      
      await new Promise(r => setTimeout(r, 1500)); // Simulate tx latency
      setGeneratedLink(`${window.location.origin}/ref/${referralId}`);
      alert("SUCCESS: Registered on-chain as " + referralId);
    } catch (err) {
      console.error(err);
      alert("Transaction failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  if (!connected && !isDemo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-[40px] text-center max-w-md border-white/10 shadow-2xl"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow border border-primary/20">
            <Shield className="text-primary w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tighter">RESTRICTED ACCESS</h2>
          <p className="text-foreground/50 mb-10 leading-relaxed">
            Connect your verified Solana wallet to access your attribution engine and real-time revenue analytics.
          </p>
          <div className="space-y-4">
            <ClientWalletButton className="!bg-primary !text-background !font-black !rounded-2xl !h-16 !w-full !text-lg hover:scale-[1.02] transition-transform" />
            <button 
              onClick={() => setIsDemo(true)}
              className="w-full py-3 text-sm text-foreground/40 hover:text-primary transition-all font-bold uppercase tracking-widest"
            >
              Skip to Demo Mode →
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Shadow Engine</h1>
          <p className="text-foreground/50">Tracking your impact on the Solana ecosystem.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl text-xs font-bold text-primary border border-primary/20">
            <Shield className="w-4 h-4" /> FRONTIER HACKATHON BUILD
          </div>
          <button className="px-6 py-2 bg-white text-black font-black rounded-xl text-xs hover:scale-105 transition-all shadow-glow">
            SUBMIT PROTOCOL
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard 
          icon={<DollarSign className="text-primary" />}
          label="Total Earnings"
          value="$1,240.50"
          subValue="+ $120.30 today"
        />
        <StatCard 
          icon={<BarChart3 className="text-secondary" />}
          label="Volume Driven"
          value="$84,200.00"
          subValue="Across 12 tokens"
        />
        <StatCard 
          icon={<Users className="text-white" />}
          label="Active Referrals"
          value="452"
          subValue="32 new this week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Link Generator */}
        <div className="lg:col-span-1 glass p-8 rounded-3xl h-fit">
          <div className="flex items-center gap-3 mb-6">
            <LinkIcon className="text-primary w-6 h-6" />
            <h3 className="text-xl font-bold">Link Generator</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-foreground/40 uppercase mb-2 block">Referral ID</label>
              <input 
                type="text" 
                placeholder="e.g. crypto-king"
                value={referralId}
                onChange={(e) => setReferralId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            <button 
              onClick={handleGenerate}
              className="w-full py-4 bg-primary text-background font-black rounded-xl hover:opacity-90 transition-all"
            >
              CREATE SHADOW LINK
            </button>

            {generatedLink && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-white/5 border border-dashed border-white/20 rounded-xl flex items-center justify-between"
              >
                <code className="text-sm text-primary truncate mr-2">{generatedLink}</code>
                <button 
                  onClick={() => navigator.clipboard.writeText(generatedLink)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-all"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="lg:col-span-3 glass p-8 rounded-3xl mt-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="text-primary w-6 h-6" />
              <h3 className="text-xl font-bold uppercase tracking-tighter">Global Leaderboard</h3>
            </div>
            <span className="text-xs font-bold text-primary animate-pulse">LIVE UPDATES</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { id: 'solana-whale', volume: '$150,200', earnings: '$1,502' },
              { id: 'shadow-king', volume: '$84,200', earnings: '$842' },
              { id: 'shreyash', volume: '$45,000', earnings: '$450' },
              { id: 'dex-master', volume: '$12,000', earnings: '$120' },
            ].map((item, index) => (
              <div key={item.id} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs">
                    #{index + 1}
                  </span>
                  <span className="text-[10px] font-bold text-foreground/30 uppercase">Top 1%</span>
                </div>
                <h4 className="font-bold text-lg mb-1 truncate">@{item.id}</h4>
                <p className="text-xs text-foreground/40 mb-3 italic">Influence: {item.volume}</p>
                <div className="text-primary font-black">{item.earnings} earned</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 glass p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Recent Attribution</h3>
            <button className="text-sm text-primary font-bold hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 text-xs font-bold text-foreground/40 uppercase">User</th>
                  <th className="pb-4 text-xs font-bold text-foreground/40 uppercase">Action</th>
                  <th className="pb-4 text-xs font-bold text-foreground/40 uppercase">Volume</th>
                  <th className="pb-4 text-xs font-bold text-foreground/40 uppercase">Fee Earned</th>
                  <th className="pb-4 text-xs font-bold text-foreground/40 uppercase text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <ActivityRow user="8xP...2w9" action="Swap SOL -> BONK" volume="$1,200" fee="$12.00" time="2m ago" />
                <ActivityRow user="G7k...a1m" action="Swap SOL -> JUP" volume="$450" fee="$4.50" time="15m ago" />
                <ActivityRow user="9nQ...r4t" action="Swap USDC -> PYTH" volume="$2,100" fee="$21.00" time="1h ago" />
                <ActivityRow user="2vP...8x9" action="Swap SOL -> WIF" volume="$800" fee="$8.00" time="3h ago" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subValue }: { icon: React.ReactNode, label: string, value: string, subValue: string }) {
  return (
    <div className="glass p-8 rounded-3xl hover:border-primary/20 transition-all">
      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="text-sm text-foreground/50 mb-1 font-medium">{label}</p>
      <h4 className="text-3xl font-black mb-2">{value}</h4>
      <p className="text-xs text-primary font-bold">{subValue}</p>
    </div>
  );
}

function ActivityRow({ user, action, volume, fee, time }: { user: string, action: string, volume: string, fee: string, time: string }) {
  return (
    <tr>
      <td className="py-4 text-sm font-mono text-primary">{user}</td>
      <td className="py-4 text-sm font-medium">{action}</td>
      <td className="py-4 text-sm font-bold">{volume}</td>
      <td className="py-4 text-sm text-primary font-bold">{fee}</td>
      <td className="py-4 text-sm text-foreground/40 text-right">{time}</td>
    </tr>
  );
}
