import React, { useState } from 'react';
import { X, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TickerSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TickerSettingsModal: React.FC<TickerSettingsModalProps> = ({ isOpen, onClose }) => {
    const [quickbuyMode, setQuickbuyMode] = useState<'never' | 'always' | 'hover'>('never');
    const [showActivePositions, setShowActivePositions] = useState(true);
    const [sortBy, setSortBy] = useState('Price');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-[500px] bg-[#0a0b0d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                    <h2 className="text-sm font-medium text-white">Ticker Row Settings</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Show Quickbuy */}
                    <div className="space-y-3">
                        <label className="text-xs text-gray-400">Show Quickbuy</label>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Never */}
                            <div className="flex flex-col items-center gap-2">
                                <button
                                    onClick={() => setQuickbuyMode('never')}
                                    className={cn(
                                        "w-full h-16 rounded-lg border flex items-center justify-center transition-all relative overflow-hidden",
                                        quickbuyMode === 'never'
                                            ? "border-blue-500 bg-blue-500/10"
                                            : "border-gray-800 bg-[#111] hover:border-gray-700"
                                    )}
                                >
                                    <div className="flex items-center gap-2 opacity-50">
                                        <div className="w-3 h-3 rounded bg-gray-600" />
                                        <span className="text-xs text-gray-400 font-medium">Ticker</span>
                                    </div>
                                </button>
                                <span className="text-[10px] text-gray-500">Never</span>
                            </div>

                            {/* Always */}
                            <div className="flex flex-col items-center gap-2">
                                <button
                                    onClick={() => setQuickbuyMode('always')}
                                    className={cn(
                                        "w-full h-16 rounded-lg border flex items-center justify-center transition-all relative overflow-hidden",
                                        quickbuyMode === 'always'
                                            ? "border-blue-500 bg-blue-500/10"
                                            : "border-gray-800 bg-[#111] hover:border-gray-700"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded bg-gray-600" />
                                        <span className="text-xs text-gray-400 font-medium">Ticker</span>
                                        <span className="text-[10px] text-blue-400">⚡1.77</span>
                                    </div>
                                </button>
                                <span className="text-[10px] text-gray-500">Always</span>
                            </div>

                            {/* On Hover */}
                            <div className="flex flex-col items-center gap-2">
                                <button
                                    onClick={() => setQuickbuyMode('hover')}
                                    className={cn(
                                        "w-full h-16 rounded-lg border flex items-center justify-center transition-all relative overflow-hidden",
                                        quickbuyMode === 'hover'
                                            ? "border-blue-500 bg-blue-500/10"
                                            : "border-gray-800 bg-[#111] hover:border-gray-700"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded bg-gray-600" />
                                        <span className="text-xs text-gray-400 font-medium">Ticker</span>
                                        <span className="text-[10px] text-blue-400">⚡1.77</span>
                                    </div>
                                </button>
                                <span className="text-[10px] text-gray-500">On Hover</span>
                            </div>
                        </div>
                    </div>

                    {/* Show Active Positions Market Caps */}
                    <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-400">Show Active Positions Market Caps</label>
                        <button
                            onClick={() => setShowActivePositions(!showActivePositions)}
                            className={cn(
                                "w-10 h-5 rounded-full relative transition-colors duration-200",
                                showActivePositions ? "bg-blue-500" : "bg-gray-700"
                            )}
                        >
                            <div className={cn(
                                "absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform duration-200",
                                showActivePositions ? "translate-x-5" : "translate-x-0"
                            )} />
                        </button>
                    </div>

                    {/* Sort Watchlist By */}
                    <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-400">Sort Watchlist By</label>
                        <div className="flex items-center gap-2">
                            <button className="h-8 px-3 bg-[#111] border border-gray-800 rounded flex items-center gap-2 text-xs text-white hover:border-gray-700 transition-colors min-w-[120px] justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">🏷️</span>
                                    <span>Price</span>
                                </div>
                                <ArrowUpDown size={12} className="text-gray-500" />
                            </button>
                            <button className="h-8 w-8 bg-[#111] border border-gray-800 rounded flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-700 transition-colors">
                                <ArrowUpDown size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Done Button */}
                    <Button
                        onClick={onClose}
                        className="w-full h-10 bg-[#5e87ff] hover:bg-[#4b70e0] text-white font-medium rounded-lg"
                    >
                        Done
                    </Button>
                </div>
            </div>
        </div>
    );
};
