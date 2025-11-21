'use client'

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import {
    setKeywords,
    setExcludeKeywords,
    toggleProtocol,
    toggleQuoteToken,
    setDeselectedProtocols,
    setDeselectedQuoteTokens,
    resetFilters
} from '@/lib/features/filterSlice';

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const protocols = [
    { name: 'Pump', color: 'emerald', icon: '🚀' },
    { name: 'Mayhem', color: 'red', icon: '💥' },
    { name: 'Bonk', color: 'yellow', icon: '👊' },
    { name: 'Bags', color: 'emerald', icon: '💰' },
    { name: 'Moonshot', color: 'purple', icon: '🌙' },
    { name: 'Heaven', color: 'gray', icon: '☁️' },
    { name: 'Daos.fun', color: 'blue', icon: '🌊' },
    { name: 'Candle', color: 'orange', icon: '🕯️' },
    { name: 'Sugar', color: 'pink', icon: '🍭' },
    { name: 'Believe', color: 'emerald', icon: '💚' },
    { name: 'Jupiter Studio', color: 'orange', icon: '🪐' },
    { name: 'Moonit', color: 'yellow', icon: '⚡' },
    { name: 'Boop', color: 'blue', icon: '🌀' },
    { name: 'LaunchLab', color: 'blue', icon: '@' },
    { name: 'Dynamic BC', color: 'red', icon: '🔥' },
    { name: 'Raydium', color: 'purple', icon: '⚛️' },
    { name: 'Meteora AMM', color: 'orange', icon: '☄️' },
    { name: 'Meteora AMM V2', color: 'red', icon: '☄️' },
    { name: 'Pump AMM', color: 'gray', icon: '🚀' },
    { name: 'Orca', color: 'yellow', icon: '🐋' },
];

const quoteTokens = [
    { name: 'SOL', color: 'emerald', icon: '≡' },
    { name: 'USDC', color: 'blue', icon: '◉' },
    { name: 'USDT', color: 'yellow', icon: '◉' },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const {
        keywords,
        excludeKeywords,
        deselectedProtocols,
        deselectedQuoteTokens
    } = useAppSelector((state) => state.filter);

    const handleApply = () => {
        onClose();
    };

    const handleReset = () => {
        dispatch(resetFilters());
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-[550px] border-l border-gray-800 bg-black p-0 overflow-y-auto">
                {/* Header */}
                <SheetHeader className="sticky top-0 z-10 bg-black border-b border-gray-800 px-5 py-4">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-white text-lg font-semibold">Filters</SheetTitle>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                            <X size={18} className="text-gray-400" />
                        </Button>
                    </div>
                </SheetHeader>

                <div className="px-5 py-4 space-y-6">
                    {/* Protocols */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-gray-300">
                                Protocols <span className="text-xs text-gray-500">(click to exclude)</span>
                            </Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => dispatch(setDeselectedProtocols([]))}
                                className="h-7 text-xs text-gray-400 hover:text-white"
                            >
                                Select All
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {protocols.map((protocol) => {
                                const isDeselected = deselectedProtocols.includes(protocol.name);
                                return (
                                    <button
                                        key={protocol.name}
                                        onClick={() => dispatch(toggleProtocol(protocol.name))}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-xs font-medium transition-all border cursor-pointer",
                                            isDeselected
                                                ? 'border-red-500/30 bg-red-500/10 text-red-400/40 line-through opacity-40'
                                                : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50'
                                        )}
                                    >
                                        <span className="mr-1">{protocol.icon}</span>
                                        {protocol.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quote Tokens */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-gray-300">
                                Quote Tokens <span className="text-xs text-gray-500">(click to exclude)</span>
                            </Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => dispatch(setDeselectedQuoteTokens([]))}
                                className="h-7 text-xs text-gray-400 hover:text-white"
                            >
                                Select All
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            {quoteTokens.map((token) => {
                                const isDeselected = deselectedQuoteTokens.includes(token.name);
                                return (
                                    <button
                                        key={token.name}
                                        onClick={() => dispatch(toggleQuoteToken(token.name))}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-xs font-medium transition-all border cursor-pointer",
                                            isDeselected
                                                ? 'border-red-500/30 bg-red-500/10 text-red-400/40 line-through opacity-40'
                                                : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50'
                                        )}
                                    >
                                        <span className="mr-1">{token.icon}</span>
                                        {token.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Search Keywords */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="search" className="text-sm font-medium text-gray-300">
                                Search Keywords
                            </Label>
                            <Input
                                id="search"
                                placeholder="keyword1, keyword2..."
                                value={keywords}
                                onChange={(e) => dispatch(setKeywords(e.target.value))}
                                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="exclude" className="text-sm font-medium text-gray-300">
                                Exclude Keywords
                            </Label>
                            <Input
                                id="exclude"
                                placeholder="keyword1, keyword2..."
                                value={excludeKeywords}
                                onChange={(e) => dispatch(setExcludeKeywords(e.target.value))}
                                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={handleReset}
                            className="flex-1 bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
                        >
                            Reset
                        </Button>
                        <Button
                            onClick={handleApply}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Apply All
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
