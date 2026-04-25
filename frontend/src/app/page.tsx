'use client';

import React from 'react';
import { Shield, Zap, BarChart3, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import ClientWalletButton from '@/components/ClientWalletButton';

export default function LandingPage() {
  return (
    <main className="flex-grow flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full max-w-7xl px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-glow">
            <Shield className="text-background w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter">SHADOW</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-bold hover:text-primary transition-all">DASHBOARD</Link>
          <ClientWalletButton className="!bg-primary !text-background !font-bold hover:!opacity-90 transition-all !rounded-xl" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-6 inline-block">
            Revolutionizing Crypto Marketing
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            STOP PAYING FOR <br />
            <span className="text-gradient">FAKE SHILLS.</span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mb-12">
            The first decentralized attribution engine on Solana. Pay influencers for 
            <span className="text-foreground font-bold"> actual volume</span> they drive, verified in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard" className="px-8 py-4 bg-primary text-background font-black rounded-xl flex items-center gap-2 hover:scale-105 transition-all">
              LAUNCH DASHBOARD <ChevronRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 glass text-foreground font-bold rounded-xl hover:bg-white/5 transition-all">
              READ THE DOCS
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="w-full bg-accent/50 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-primary" />}
            title="Instant Settlement"
            description="Influencers receive their share of swap fees the moment the transaction hits the ledger."
          />
          <FeatureCard 
            icon={<BarChart3 className="text-secondary" />}
            title="Real-time Analytics"
            description="Detailed dashboards showing ROI, conversion rates, and volume driven by every single link."
          />
          <FeatureCard 
            icon={<Shield className="text-white" />}
            title="Zero Trust"
            description="No manual reporting. The blockchain is the source of truth for every referral."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 text-center text-foreground/40 text-sm">
        © 2026 Shadow Protocol. Built for the Solana Frontier Hackathon.
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 glass rounded-2xl hover:border-primary/30 transition-all group">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-foreground/50 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
