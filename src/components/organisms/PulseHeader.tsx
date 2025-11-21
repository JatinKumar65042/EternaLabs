import React, { useState } from 'react';
import { Settings, HelpCircle, Layout, Volume2, Bookmark, ListFilter, BookmarkX, Keyboard, Crosshair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecommendedSettingsModal } from './RecommendedSettingsModal';
import { DisplaySettingsModal } from './DisplaySettingsModal';
import { BlacklistModal } from './BlacklistModal';
import { HotkeysModal } from './HotkeysModal';
import { AlertsModal } from './AlertsModal';
import { SnipeSettingsModal } from './SnipeSettingsModal';
import { ChainSelector } from '@/components/molecules/ChainSelector';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ActiveWalletsPopover } from './ActiveWalletsPopover';

interface PulseHeaderProps {
    selectedChain: 'SOL' | 'BNB';
    onChainSelect: (chain: 'SOL' | 'BNB') => void;
    onDisplayClick: () => void;
}

export const PulseHeader: React.FC<PulseHeaderProps> = ({ selectedChain, onChainSelect, onDisplayClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
    const [isHotkeysModalOpen, setIsHotkeysModalOpen] = useState(false);
    const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
    const [isSnipeSettingsModalOpen, setIsSnipeSettingsModalOpen] = useState(false);

    return (
        <>
            <div className="h-12 border-b border-border/10 bg-black flex items-center justify-between px-4 shrink-0">
                {/* Left: Title & Chain */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-white tracking-tight">Pulse</h1>
                        <ChainSelector selectedChain={selectedChain} onSelect={onChainSelect} />
                    </div>
                </div>

                {/* Right: Controls */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-white rounded-md cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <HelpCircle size={16} />
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-transparent border-gray-700 hover:border-gray-500 text-white hover:bg-gray-800/50 gap-2 px-3 rounded-lg cursor-pointer transition-all duration-200 group"
                        onClick={onDisplayClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                        <span className="text-[13px] font-medium text-white group-hover:text-white">Display</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 transition-opacity"><path d="m6 9 6 6 6-6" /></svg>
                    </Button>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-white rounded-md cursor-pointer hover:bg-white/5"
                                onClick={() => setIsBlacklistModalOpen(true)}
                            >
                                <BookmarkX size={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-black/90 text-white border-gray-800 text-xs">
                            <p>Blacklist dev, handle, keywords</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-white rounded-md cursor-pointer hover:bg-white/5"
                                onClick={() => setIsHotkeysModalOpen(true)}
                            >
                                <Keyboard size={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-black/90 text-white border-gray-800 text-xs">
                            <p>Pulse Hotkeys</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-white rounded-md cursor-pointer hover:bg-white/5"
                                onClick={() => setIsAlertsModalOpen(true)}
                            >
                                <Volume2 size={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-black/90 text-white border-gray-800 text-xs">
                            <p>Alerts</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-white rounded-md cursor-pointer hover:bg-white/5"
                                onClick={() => setIsSnipeSettingsModalOpen(true)}
                            >
                                <Crosshair size={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-black/90 text-white border-gray-800 text-xs">
                            <p>Snipe settings</p>
                        </TooltipContent>
                    </Tooltip>

                    <ActiveWalletsPopover selectedChain={selectedChain} />
                </div>
            </div>

            <RecommendedSettingsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApply={() => setIsModalOpen(false)}
            />

            <BlacklistModal
                isOpen={isBlacklistModalOpen}
                onClose={() => setIsBlacklistModalOpen(false)}
            />

            <HotkeysModal
                isOpen={isHotkeysModalOpen}
                onClose={() => setIsHotkeysModalOpen(false)}
            />

            <AlertsModal
                isOpen={isAlertsModalOpen}
                onClose={() => setIsAlertsModalOpen(false)}
            />

            <SnipeSettingsModal
                isOpen={isSnipeSettingsModalOpen}
                onClose={() => setIsSnipeSettingsModalOpen(false)}
            />
        </>
    );
};
