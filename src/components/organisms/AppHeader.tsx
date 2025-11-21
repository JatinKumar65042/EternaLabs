'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Bell, Star, Wallet, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { SearchModal } from './SearchModal';
import { ExchangeModal } from './ExchangeModal';
import { WatchlistModal } from './WatchlistModal';
import { NotificationsModal } from './NotificationsModal';
import { WalletPopover } from './WalletPopover';
import { WithdrawModal } from './WithdrawModal';

interface AppHeaderProps {
    selectedChain?: 'SOL' | 'BNB';
    onChainSelect?: (chain: 'SOL' | 'BNB') => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ selectedChain = 'SOL', onChainSelect }) => {
    const [activeTab, setActiveTab] = useState('Pulse');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);
    const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
    const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false);
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
    const [isWalletPopoverOpen, setIsWalletPopoverOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const tabs = ['Discover', 'Pulse', 'Trackers', 'Perpetuals', 'Yield', 'Vision', 'Portfolio'];

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (isChainDropdownOpen && !target.closest('.chain-selector')) {
                setIsChainDropdownOpen(false);
            }
            if (isWalletPopoverOpen && !target.closest('.wallet-info')) {
                setIsWalletPopoverOpen(false);
            }
        };

        if (isChainDropdownOpen || isWalletPopoverOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isChainDropdownOpen, isWalletPopoverOpen]);

    return (
        <>
            <header className="h-14 border-b border-border/20 bg-black flex items-center justify-between px-4 shrink-0 z-50 relative">
                {/* Left: Logo & Nav */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 cursor-pointer">
                        {/* Logo Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 19H22L12 2Z" fill="white" />
                        </svg>
                        <span className="font-bold text-xl tracking-tight text-white">AXIOM <span className="font-normal text-gray-400 text-sm ml-0.5">Pro</span></span>
                    </div>

                    <nav className="hidden lg:flex items-center gap-1">
                        {tabs.map((item) => (
                            <button
                                key={item}
                                onClick={() => setActiveTab(item)}
                                className={cn(
                                    "h-9 px-3 text-[13px] font-medium transition-colors rounded-md",
                                    activeTab === item
                                        ? "text-blue-400 bg-[#1e293b] border border-blue-500/20"
                                        : "text-gray-500 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div
                        className="relative hidden xl:block group cursor-pointer"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-hover:text-white transition-colors" />
                        <div className="h-9 w-[280px] bg-[#111] border border-border/20 rounded-full pl-9 pr-10 flex items-center text-sm text-gray-500 group-hover:border-gray-700 transition-all">
                            Search by token or CA...
                        </div>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 border border-border/20 rounded px-1.5 py-0.5 bg-white/5">/</span>
                    </div>

                    {/* Network */}
                    <div className="flex items-center gap-2 relative chain-selector">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsChainDropdownOpen(!isChainDropdownOpen);
                            }}
                            className={cn(
                                "h-9 px-3 rounded-full border text-xs gap-2 transition-all flex items-center",
                                selectedChain === 'SOL'
                                    ? "border-green-900/30 bg-green-900/10 text-green-400 hover:bg-green-900/20 hover:border-green-900/50 hover:text-green-300"
                                    : "border-yellow-900/30 bg-yellow-900/10 text-yellow-400 hover:bg-yellow-900/20 hover:border-yellow-900/50 hover:text-yellow-300"
                            )}
                        >
                            <div className="relative h-3.5 w-3.5">
                                <Image
                                    src={selectedChain === 'SOL' ? '/images/solana-logo.png' : '/images/bnb-logo.png'}
                                    alt={selectedChain === 'SOL' ? 'Solana' : 'BNB'}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold">{selectedChain}</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-50"><path d="m6 9 6 6 6-6" /></svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isChainDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-40 bg-[#0a0b0d] border border-gray-800 rounded-lg shadow-xl z-50 py-1">
                                <button
                                    onClick={() => {
                                        onChainSelect?.('SOL');
                                        setIsChainDropdownOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                                        selectedChain === 'SOL'
                                            ? "bg-green-900/20 text-green-400"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <div className="relative h-4 w-4">
                                        <Image
                                            src="/images/solana-logo.png"
                                            alt="Solana"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="font-medium">Solana</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onChainSelect?.('BNB');
                                        setIsChainDropdownOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                                        selectedChain === 'BNB'
                                            ? "bg-yellow-900/20 text-yellow-400"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <div className="relative h-4 w-4">
                                        <Image
                                            src="/images/bnb-logo.png"
                                            alt="BNB"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="font-medium">BNB Chain</span>
                                </button>
                            </div>
                        )}
                        <Button
                            size="sm"
                            onClick={() => setIsExchangeModalOpen(true)}
                            className="h-8 rounded-full bg-[#5e87ff] hover:bg-[#4b70e0] text-white font-bold px-5 text-xs shadow-[0_0_15px_rgba(94,135,255,0.3)]"
                        >
                            Deposit
                        </Button>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-1 ml-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsWatchlistModalOpen(true)}
                            className="h-9 w-9 text-gray-500 hover:text-white rounded-full hover:bg-white/5"
                        >
                            <Star size={18} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsNotificationsModalOpen(true)}
                            className="h-9 w-9 text-gray-500 hover:text-white rounded-full hover:bg-white/5"
                        >
                            <Bell size={18} />
                        </Button>

                        {/* Wallet Status */}
                        <div className="relative wallet-info">
                            <div
                                onClick={() => setIsWalletPopoverOpen(!isWalletPopoverOpen)}
                                className="flex items-center bg-[#1A1D24] border border-white/5 rounded-full h-8 pl-3 pr-2 cursor-pointer hover:bg-[#252830] transition-colors gap-3"
                            >
                                <Wallet size={16} className="text-white" strokeWidth={2} />

                                <div className="flex items-center gap-2">
                                    <div className="relative h-3.5 w-3.5">
                                        <Image src="/images/header-solana.png" alt="SOL" fill className="object-contain" />
                                    </div>
                                    <span className="text-sm font-medium text-white leading-none">0</span>
                                </div>

                                <div className="h-4 w-[1px] bg-white/10" />

                                <div className="flex items-center gap-2">
                                    <div className="relative h-4 w-4">
                                        <Image src="/images/header-usdc.png" alt="USDC" fill className="object-contain" />
                                    </div>
                                    <span className="text-sm font-medium text-white leading-none">0</span>
                                </div>

                                <ChevronDown size={14} className="text-white ml-1" strokeWidth={2.5} />
                            </div>

                            <WalletPopover
                                isOpen={isWalletPopoverOpen}
                                onClose={() => setIsWalletPopoverOpen(false)}
                                onDeposit={() => setIsExchangeModalOpen(true)}
                                onWithdraw={() => setIsWithdrawModalOpen(true)}
                            />
                        </div>

                        <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-500 hover:text-white rounded-full hover:bg-white/5 ml-1">
                            <User size={20} />
                        </Button>
                    </div>
                </div>
            </header>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <ExchangeModal isOpen={isExchangeModalOpen} onClose={() => setIsExchangeModalOpen(false)} />
            <WatchlistModal isOpen={isWatchlistModalOpen} onClose={() => setIsWatchlistModalOpen(false)} />
            <NotificationsModal isOpen={isNotificationsModalOpen} onClose={() => setIsNotificationsModalOpen(false)} />
            <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />
        </>
    );
};
