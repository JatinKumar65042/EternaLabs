'use client'

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { TokenColumn } from './TokenColumn';
import { FilterSidebar } from './FilterSidebar';
import { MOCK_TOKENS, MOCK_TOKENS_BNB, updateTokenData, generateNewSOLToken, generateNewBNBToken } from '@/lib/mockData';
import { Token, MarketUpdate, SortField, SortDirection } from '@/types';
import { webSocketService } from '@/services/websocketMock';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { PulseHeader } from './PulseHeader';
import { ActionIcons } from '../molecules/ActionIcons';
import { useAppSelector } from '@/lib/store';

// Lazy load modals for better performance
const TickerSettingsModal = dynamic(() =>
    import('./TickerSettingsModal').then(mod => ({ default: mod.TickerSettingsModal })),
    { ssr: false }
);

const DisplaySettingsModal = dynamic(() =>
    import('./DisplaySettingsModal').then(mod => ({ default: mod.DisplaySettingsModal })),
    { ssr: false }
);

export const TokenTable: React.FC = () => {
    const [selectedChain, setSelectedChain] = useState<'SOL' | 'BNB'>('SOL');
    const [tokens, setTokens] = useState<Token[]>(MOCK_TOKENS);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [isTickerSettingsModalOpen, setIsTickerSettingsModalOpen] = useState(false);
    const [isDisplaySettingsModalOpen, setIsDisplaySettingsModalOpen] = useState(false);

    const {
        keywords,
        excludeKeywords,
        deselectedProtocols,
        deselectedQuoteTokens,
        minLiquidity,
        maxLiquidity,
        minVolume,
        maxVolume
    } = useAppSelector((state) => state.filter);

    const sortState = useAppSelector((state) => state.sort);

    // Switch data source when chain changes
    useEffect(() => {
        setIsLoading(true);
        const newTokens = selectedChain === 'SOL' ? MOCK_TOKENS : MOCK_TOKENS_BNB;
        setTokens(newTokens);

        // Reset websocket with new tokens
        webSocketService.setTokens(newTokens);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [selectedChain]);

    useEffect(() => {
        // Initialize WebSocket mock
        webSocketService.connect();

        const unsubscribe = webSocketService.subscribe((updates: MarketUpdate[]) => {
            setTokens((prevTokens) => {
                const newTokens = [...prevTokens];
                updates.forEach((update) => {
                    const index = newTokens.findIndex((t) => t.id === update.tokenId);
                    if (index !== -1) {
                        newTokens[index] = {
                            ...newTokens[index],
                            price: update.price,
                            priceChange24h: update.priceChange24h,
                        };
                    }
                });
                return newTokens;
            });
        });

        return () => {
            unsubscribe();
            webSocketService.disconnect();
        };
    }, [selectedChain]); // Re-subscribe when chain changes

    // Auto-update token data every 2 seconds for live changing effect
    useEffect(() => {
        const updateInterval = setInterval(() => {
            setTokens((prevTokens) => {
                // Update all tokens with new random data
                const updated = prevTokens.map(token => updateTokenData(token));
                return updated;
            });
        }, 2000); // Update every 2 seconds

        return () => {
            clearInterval(updateInterval);
        };
    }, []);

    // Dynamically add new tokens at random intervals (max 15 seconds) at the top of New Pairs column
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const scheduleNextToken = () => {
            // Generate random interval between 0-15 seconds (0-15000 milliseconds)
            const randomInterval = Math.random() * 15000;

            timeoutId = setTimeout(() => {
                setTokens((prevTokens) => {
                    // Generate a new token based on the selected chain
                    const newToken = selectedChain === 'SOL' ? generateNewSOLToken() : generateNewBNBToken();

                    // Prepend the new token to the beginning of the array
                    // This ensures it appears at the top of the New Pairs column
                    return [newToken, ...prevTokens];
                });

                // Schedule the next token with a new random interval
                scheduleNextToken();
            }, randomInterval);
        };

        // Start the first token addition
        scheduleNextToken();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [selectedChain]); // Re-create timeout chain when chain changes


    // Comprehensive filtering logic
    const filteredTokens = tokens.filter(token => {
        // Keyword search (must include)
        const searchTerms = keywords.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
        const matchesKeyword = searchTerms.length === 0 || searchTerms.some(term =>
            token.name.toLowerCase().includes(term) ||
            token.symbol.toLowerCase().includes(term)
        );

        // Exclude keywords (must NOT include)
        const excludeTerms = excludeKeywords.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
        const matchesExclude = excludeTerms.length === 0 || !excludeTerms.some(term =>
            token.name.toLowerCase().includes(term) ||
            token.symbol.toLowerCase().includes(term)
        );

        // Protocol filter (exclude deselected)
        const matchesProtocol = deselectedProtocols.length === 0 || !deselectedProtocols.includes(token.protocol);

        // Quote token filter (exclude deselected)
        const matchesQuoteToken = deselectedQuoteTokens.length === 0 || !deselectedQuoteTokens.includes(token.quoteToken);

        // Liquidity filter
        const matchesMinLiq = minLiquidity === null || token.liquidity >= minLiquidity;
        const matchesMaxLiq = maxLiquidity === null || token.liquidity <= maxLiquidity;

        // Volume filter
        const matchesMinVol = minVolume === null || token.volume24h >= minVolume;
        const matchesMaxVol = maxVolume === null || token.volume24h <= maxVolume;

        return matchesKeyword && matchesExclude && matchesProtocol && matchesQuoteToken &&
            matchesMinLiq && matchesMaxLiq && matchesMinVol && matchesMaxVol;
    });

    // Sort comparator functions
    const getSortComparator = (field: SortField | null, direction: SortDirection) => {
        if (!field) return null;

        const comparators: Record<SortField, (a: Token, b: Token) => number> = {
            marketCap: (a, b) => b.marketCap - a.marketCap,
            volume: (a, b) => b.volume24h - a.volume24h,
            liquidity: (a, b) => b.liquidity - a.liquidity,
            time: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            price: (a, b) => b.price - a.price,
            holders: (a, b) => b.holders - a.holders,
        };

        const comparator = comparators[field];
        return direction === 'desc' ? comparator : (a: Token, b: Token) => -comparator(a, b);
    };

    // Apply sorting to filtered tokens by column type
    const sortTokens = (tokens: Token[], columnType: 'new' | 'final_stretch' | 'migrated') => {
        const { field, direction } = sortState[columnType];
        const comparator = getSortComparator(field, direction);

        if (!comparator) return tokens;
        return [...tokens].sort(comparator);
    };

    // Separate by status, sort, and limit to 12 per column
    const MAX_DISPLAY_PER_COLUMN = 12;
    const newPairs = useMemo(() =>
        sortTokens(filteredTokens.filter((t) => t.status === 'new'), 'new').slice(0, MAX_DISPLAY_PER_COLUMN),
        [filteredTokens, sortState.new]
    );
    const finalStretch = useMemo(() =>
        sortTokens(filteredTokens.filter((t) => t.status === 'final_stretch'), 'final_stretch').slice(0, MAX_DISPLAY_PER_COLUMN),
        [filteredTokens, sortState.final_stretch]
    );
    const migrated = useMemo(() =>
        sortTokens(filteredTokens.filter((t) => t.status === 'migrated'), 'migrated').slice(0, MAX_DISPLAY_PER_COLUMN),
        [filteredTokens, sortState.migrated]
    );

    return (
        <div className="flex flex-col h-[100dvh] w-full bg-transparent overflow-hidden fixed inset-0">
            {/* Fixed Header */}
            <div className="sticky top-0 z-50 bg-background">
                <AppHeader selectedChain={selectedChain} onChainSelect={setSelectedChain} />
                <ActionIcons
                    onSettingsClick={() => setIsTickerSettingsModalOpen(true)}
                    onStarClick={() => {/* To be implemented */ }}
                    onChartClick={() => {/* To be implemented */ }}
                />
                <PulseHeader
                    selectedChain={selectedChain}
                    onChainSelect={setSelectedChain}
                    onDisplayClick={() => setIsDisplaySettingsModalOpen(true)}
                />
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 min-h-0 overflow-hidden relative">
                <div className="grid grid-cols-1 md:grid-cols-3 h-full w-full border-t border-border/20 bg-transparent">
                    <TokenColumn
                        title="New Pairs"
                        tokens={newPairs}
                        isLoading={isLoading}
                        description="Tokens listed in the last 24 hours"
                        showFilter={true}
                        onFilterClick={() => setIsFilterOpen(true)}
                        selectedChain={selectedChain}
                        columnType="new"
                    />
                    <TokenColumn
                        title="Final Stretch"
                        tokens={finalStretch}
                        isLoading={isLoading}
                        description="Tokens close to migration"
                        onFilterClick={() => setIsFilterOpen(true)}
                        selectedChain={selectedChain}
                        columnType="final_stretch"
                    />
                    <TokenColumn
                        title="Migrated"
                        tokens={migrated}
                        isLoading={isLoading}
                        description="Tokens that have migrated to DEX"
                        onFilterClick={() => setIsFilterOpen(true)}
                        selectedChain={selectedChain}
                        columnType="migrated"
                    />
                </div>
            </div>

            {/* Fixed Footer */}
            <div className="sticky bottom-0 z-50 shrink-0 bg-background border-t border-border/20">
                <AppFooter selectedChain={selectedChain} />
            </div>

            <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
            <TickerSettingsModal isOpen={isTickerSettingsModalOpen} onClose={() => setIsTickerSettingsModalOpen(false)} />
            <DisplaySettingsModal isOpen={isDisplaySettingsModalOpen} onClose={() => setIsDisplaySettingsModalOpen(false)} />
        </div>
    );
};
