'use client'

import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Token, SortField, ColumnType } from '@/types';
import { TokenCard } from '@/components/molecules/TokenCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Zap, ArrowRightLeft, Fuel, Coins, ShieldOff, Settings, Star, TrendingUp, ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { setTradingSettingsOpen } from '@/lib/features/uiSlice';
import { setSortBy, toggleSortDirection } from '@/lib/features/sortSlice';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useProgressiveLoad } from '@/hooks/useProgressiveLoad';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface TokenColumnProps {
    title: string;
    tokens: Token[];
    isLoading?: boolean;
    description?: string;
    onFilterClick?: () => void;
    showFilter?: boolean;
    selectedChain?: 'SOL' | 'BNB';
    columnType: ColumnType; // 'new' | 'final_stretch' | 'migrated'
}

export const TokenColumn: React.FC<TokenColumnProps> = ({
    title,
    tokens,
    isLoading = false,
    onFilterClick,
    showFilter = false,
    selectedChain = 'SOL',
    columnType
}) => {
    const [selectedPriority, setSelectedPriority] = React.useState<'P1' | 'P2' | 'P3'>('P1');
    const [hoveredPriority, setHoveredPriority] = React.useState<'P1' | 'P2' | 'P3' | null>(null);
    const activeIconFilters = useAppSelector((state) => state.filter.activeIconFilters);
    const sortState = useAppSelector((state) => state.sort[columnType]);
    const dispatch = useAppDispatch();

    // Progressive loading for staggered token appearance
    const visibleCount = useProgressiveLoad(tokens.length, 30, 0);

    // State for each priority's selected option
    const [priorityOptions, setPriorityOptions] = React.useState({
        P1: { type: 'gas', value: '0.001' },
        P2: { type: 'off', value: 'Off' },
        P3: { type: 'off', value: 'Off' }
    });

    // Memoize callbacks to prevent unnecessary re-renders
    const handlePriorityClick = useCallback((p: 'P1' | 'P2' | 'P3') => {
        setSelectedPriority(p);
    }, []);

    const handleSortChange = useCallback((field: SortField) => {
        dispatch(setSortBy({ column: columnType, field }));
    }, [dispatch, columnType]);

    const handleSortToggle = useCallback(() => {
        dispatch(toggleSortDirection(columnType));
    }, [dispatch, columnType]);

    const handleTradingSettingsClick = useCallback(() => {
        dispatch(setTradingSettingsOpen(true));
    }, [dispatch]);

    const handleOptionSelect = (priority: 'P1' | 'P2' | 'P3', type: string, value: string) => {
        setPriorityOptions(prev => ({
            ...prev,
            [priority]: { type, value }
        }));
    };

    // Helper to get classes for priority button
    const getPriorityClasses = (p: 'P1' | 'P2' | 'P3') => {
        const baseClasses = "text-[10px] font-bold transition-all px-1.5 py-0.5 rounded cursor-pointer";
        if (selectedPriority === p) {
            return `${baseClasses} text-blue-400 bg-blue-500/10`;
        }
        return `${baseClasses} text-gray-600 hover:text-gray-400`;
    };

    // Sort options
    const sortOptions: { label: string; value: SortField }[] = [
        { label: 'Market Cap', value: 'marketCap' },
        { label: 'Volume 24h', value: 'volume' },
        { label: 'Liquidity', value: 'liquidity' },
        { label: 'Time', value: 'time' },
        { label: 'Price', value: 'price' },
        { label: 'Holders', value: 'holders' },
    ];

    const SortIcon = sortState.field ? (sortState.direction === 'desc' ? ArrowDown : ArrowUp) : ArrowUpDown;

    return (
        <div className="flex flex-col h-full min-h-0 border-r border-border/10 last:border-r-0 bg-gradient-to-b from-gray-900/20 to-gray-900/10">
            {/* Header */}
            <div className="px-3 py-2 border-b border-border/10 flex items-center justify-between shrink-0 h-[42px] bg-card/5">
                <div className="flex items-center gap-2">
                    <h2 className="font-bold text-[13px] text-white tracking-tight">{title}</h2>
                    {/* Active Icon Filter Badges */}
                    <div className="flex items-center gap-1">
                        {activeIconFilters.settings && (
                            <div className="p-1 bg-blue-500/20 rounded">
                                <Settings size={10} className="text-blue-400" />
                            </div>
                        )}
                        {activeIconFilters.star && (
                            <div className="p-1 bg-blue-500/20 rounded">
                                <Star size={10} className="text-blue-400" />
                            </div>
                        )}
                        {activeIconFilters.chart && (
                            <div className="p-1 bg-blue-500/20 rounded">
                                <TrendingUp size={10} className="text-blue-400" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Lightning Counter */}
                    <div className="flex items-center gap-1 text-gray-500">
                        <Zap size={10} className="fill-current" />
                        <span className="text-[11px] font-medium">0</span>
                    </div>

                    {/* Filter Group */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 relative">
                            <div className="relative h-3 w-3">
                                <Image
                                    src={selectedChain === 'SOL' ? '/images/solana-logo.png' : '/images/bnb-logo.png'}
                                    alt={selectedChain === 'SOL' ? 'Solana' : 'BNB'}
                                    width={12}
                                    height={12}
                                    priority
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex items-center gap-0.5 ml-1" onMouseLeave={() => setHoveredPriority(null)}>
                                {(['P1', 'P2', 'P3'] as const).map((p) => (
                                    <div key={p} className="relative group">
                                        <button
                                            onClick={() => handlePriorityClick(p)}
                                            onDoubleClick={() => dispatch(setTradingSettingsOpen(true))}
                                            onMouseEnter={() => setHoveredPriority(p)}
                                            className={getPriorityClasses(p)}
                                        >
                                            {p}
                                        </button>

                                        {/* Hover Menu */}
                                        {hoveredPriority === p && (
                                            <div className="absolute top-full right-0 mt-2 w-32 bg-[#0a0b0d] border border-gray-800 rounded-lg shadow-xl z-50 p-1 flex flex-col gap-0.5">
                                                <div className="text-[10px] font-medium text-gray-400 px-2 py-1 border-b border-gray-800 mb-1">
                                                    {p} Settings
                                                </div>

                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleOptionSelect(p, 'speed', '20%'); }}
                                                    className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 text-[11px] w-full text-left cursor-pointer ${priorityOptions[p].value === '20%' ? 'text-yellow-400' : 'text-gray-400'}`}
                                                >
                                                    <Zap size={10} />
                                                    <span>20%</span>
                                                </button>

                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleOptionSelect(p, 'gas', '0.001'); }}
                                                    className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 text-[11px] w-full text-left cursor-pointer ${priorityOptions[p].value === '0.001' ? 'text-yellow-400' : 'text-gray-400'}`}
                                                >
                                                    <Fuel size={10} />
                                                    <span>0.001</span>
                                                </button>

                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleOptionSelect(p, 'amount', '0.01'); }}
                                                    className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 text-[11px] w-full text-left cursor-pointer ${priorityOptions[p].value === '0.01' ? 'text-yellow-400' : 'text-gray-400'}`}
                                                >
                                                    <Coins size={10} />
                                                    <span>0.01</span>
                                                </button>

                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleOptionSelect(p, 'off', 'Off'); }}
                                                    className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 text-[11px] w-full text-left cursor-pointer ${priorityOptions[p].value === 'Off' ? 'text-gray-400' : 'text-gray-500'}`}
                                                >
                                                    <ShieldOff size={10} />
                                                    <span>Off</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sort Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="text-gray-500 hover:text-white transition-colors cursor-pointer flex items-center gap-0.5"
                                    title="Sort tokens"
                                >
                                    <SortIcon size={12} className={sortState.field ? 'text-blue-400' : ''} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 bg-[#0a0b0d] border-gray-800">
                                {sortOptions.map((option) => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        onClick={() => handleSortChange(option.value)}
                                        className="text-xs cursor-pointer hover:bg-white/5 flex items-center justify-between"
                                    >
                                        <span className={sortState.field === option.value ? 'text-blue-400 font-medium' : 'text-gray-300'}>
                                            {option.label}
                                        </span>
                                        {sortState.field === option.value && (
                                            sortState.direction === 'desc' ? <ArrowDown size={10} className="text-blue-400" /> : <ArrowUp size={10} className="text-blue-400" />
                                        )}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button
                            onClick={onFilterClick}
                            className="text-gray-500 hover:text-white transition-colors ml-1 cursor-pointer"
                        >
                            <ArrowRightLeft size={12} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-thin">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="p-2 flex gap-3 border-b border-border/10 h-[100px]"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            {/* Left: Avatar skeleton */}
                            <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                                <Skeleton variant="shimmer" className="h-[52px] w-[52px] rounded-md" />
                                <Skeleton variant="shimmer" className="h-2 w-12" />
                            </div>
                            {/* Middle: Info skeleton */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                {/* Row 1 */}
                                <div className="flex items-center gap-1.5">
                                    <Skeleton variant="shimmer" className="h-3 w-16" />
                                    <Skeleton variant="shimmer" className="h-3 w-24 bg-gray-700/50" />
                                </div>
                                {/* Row 2 */}
                                <div className="flex items-center gap-2">
                                    <Skeleton variant="shimmer" className="h-2 w-8" />
                                    <Skeleton variant="shimmer" className="h-2 w-6 rounded-full" />
                                    <Skeleton variant="shimmer" className="h-2 w-6 rounded-full" />
                                    <Skeleton variant="shimmer" className="h-2 w-6 rounded-full" />
                                </div>
                                {/* Row 3: Badges */}
                                <div className="flex items-center gap-2 mt-1">
                                    <Skeleton variant="shimmer" className="h-4 w-10 rounded" />
                                    <Skeleton variant="shimmer" className="h-4 w-10 rounded" />
                                    <Skeleton variant="shimmer" className="h-4 w-10 rounded" />
                                    <Skeleton variant="shimmer" className="h-4 w-10 rounded" />
                                </div>
                            </div>
                            {/* Right: Stats skeleton */}
                            <div className="flex flex-col items-end justify-between min-w-[100px] py-0.5">
                                <div className="space-y-1 w-full">
                                    <Skeleton variant="shimmer" className="h-3 w-20 ml-auto" />
                                    <Skeleton variant="shimmer" className="h-3 w-16 ml-auto bg-gray-700/50" />
                                </div>
                                <Skeleton variant="shimmer" className="h-6 w-16 rounded-full bg-blue-900/30" />
                            </div>
                        </div>
                    ))
                ) : (
                    <ErrorBoundary>
                        {tokens.slice(0, visibleCount).map((token, index) => (
                            <div
                                key={token.id}
                                className="animate-fadeIn"
                                style={{ animationDelay: `${index * 30}ms` }}
                            >
                                <TokenCard token={token} index={index} />
                            </div>
                        ))}
                    </ErrorBoundary>
                )}
            </div>
        </div>
    );
};
