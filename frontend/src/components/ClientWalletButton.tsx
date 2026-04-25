'use client';

import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function ClientWalletButton({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-12 w-48 bg-white/5 animate-pulse rounded-xl ${className}`} />
    );
  }

  return <WalletMultiButton className={className} />;
}
