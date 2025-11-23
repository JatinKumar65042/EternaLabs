import React from 'react';
import Image from 'next/image';

interface ChainSelectorProps {
    selectedChain: 'SOL' | 'BNB';
    onSelect: (chain: 'SOL' | 'BNB') => void;
}

export const ChainSelector: React.FC<ChainSelectorProps> = ({ selectedChain, onSelect }) => {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => onSelect('SOL')}
                className={`h-6 w-6 rounded-full flex items-center justify-center border transition-all cursor-pointer ${selectedChain === 'SOL'
                    ? 'bg-[#14F195]/20 border-[#14F195] shadow-[0_0_10px_rgba(20,241,149,0.3)]'
                    : 'bg-[#14F195]/5 border-[#14F195]/20 hover:bg-[#14F195]/10'
                    }`}
                title="Solana"
            >
                <div className="relative h-3.5 w-3.5">
                    <Image
                        src="/images/solana-logo.png"
                        alt="Solana"
                        fill
                        className="object-contain"
                    />
                </div>
            </button>
            <button
                onClick={() => onSelect('BNB')}
                className={`h-6 w-6 rounded-full flex items-center justify-center border transition-all cursor-pointer ${selectedChain === 'BNB'
                    ? 'bg-[#F3BA2F]/20 border-[#F3BA2F] shadow-[0_0_10px_rgba(243,186,47,0.3)]'
                    : 'bg-[#F3BA2F]/5 border-[#F3BA2F]/20 hover:bg-[#F3BA2F]/10'
                    }`}
                title="BNB Chain"
            >
                <div className="relative h-3.5 w-3.5">
                    <Image
                        src="/images/bnb-logo.png"
                        alt="BNB"
                        fill
                        className="object-contain"
                    />
                </div>
            </button>
        </div>
    );
};
