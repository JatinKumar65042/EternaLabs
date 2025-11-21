'use client'

import React, { useMemo, useCallback } from 'react';
import { Token } from '@/types';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Copy, Globe, Twitter, Search, User, Link2, Shield, Zap, Music, Users, BarChart2, Sprout, Crosshair, Lock, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAppSelector } from '@/lib/store';
import { formatCurrency, formatTimeAgo, getAvatarColor } from '@/utils/formatters';

interface TokenCardProps {
    token: Token;
    index: number;
}

// Memoize the component to prevent unnecessary re-renders
export const TokenCard = React.memo<TokenCardProps>(({ token, index }) => {
    // Memoize Redux selectors to avoid unnecessary recalculations
    const quickBuySize = useAppSelector((state) => state.settings.quickBuySize);
    const metricsSize = useAppSelector((state) => state.settings.metricsSize);

    // Memoize expensive calculations
    const formattedMarketCap = useMemo(() => formatCurrency(token.marketCap), [token.marketCap]);
    const formattedVolume = useMemo(() => formatCurrency(token.volume24h), [token.volume24h]);
    const timeAgo = useMemo(() => formatTimeAgo(token.createdAt), [token.createdAt]);
    const avatarColor = useMemo(() => getAvatarColor(token.symbol), [token.symbol]);

    // Alternating background: even indices get a slightly lighter bg
    const bgColor = useMemo(() => index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]', [index]);

    // Calculate bonding percentage (0-100%)
    const bondingPercentage = useMemo(() => token.badges[3]?.value || 0, [token.badges]);

    // Memoize button styles calculation
    const getButtonStyles = useCallback(() => {
        switch (quickBuySize) {
            case 'small':
                return "h-6 px-3 text-[11px]";
            case 'large':
                return "h-8 px-4 text-[12px]";
            case 'mega':
                return "h-10 px-5 text-[13px]";
            case 'ultra':
                return "h-12 px-6 text-[14px]";
            default:
                return "h-6 px-3 text-[11px]";
        }
    }, [quickBuySize]);

    const buttonStyles = useMemo(() => getButtonStyles(), [getButtonStyles]);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Card className={cn("p-2 hover:bg-accent/5 transition-colors border-b border-border/10 shadow-none rounded-none group h-[100px] relative overflow-hidden cursor-pointer", bgColor)}>
                    <div className="flex gap-3 h-full">
                        {/* Left: Image & Contract */}
                        <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                                        <Avatar className="h-[52px] w-[52px] rounded-md ring-1 ring-green-500/50">
                                            <AvatarImage src={token.logoUrl} alt={token.symbol} className="object-cover" />
                                            <AvatarFallback className={cn("rounded-md text-xs font-bold", avatarColor)}>
                                                {token.symbol.slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-[2px]">
                                            <div className="bg-green-500 rounded-full p-[3px]">
                                                <Shield size={7} className="text-black fill-black" />
                                            </div>
                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent side="right" className="w-80 bg-black/95 border-gray-800 p-4">
                                    <div className="space-y-3">
                                        {/* Large token image preview */}
                                        <div className="relative">
                                            <img
                                                src={token.logoUrl}
                                                alt={token.symbol}
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                        </div>
                                        {/* Similar Tokens section */}
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-semibold text-gray-400">Similar Tokens</h3>
                                            <div className="space-y-2">
                                                {/* Sample similar token */}
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Avatar className="h-8 w-8 rounded-md">
                                                        <AvatarImage src={token.logoUrl} />
                                                        <AvatarFallback className={cn("rounded-md text-xs", avatarColor)}>
                                                            {token.symbol.slice(0, 1)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <p className="text-white font-medium">{token.symbol}</p>
                                                        <p className="text-gray-500 text-[10px]">TX: {timeAgo}</p>
                                                    </div>
                                                    <span className="text-blue-400 font-bold">{formattedMarketCap}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <span className="text-[9px] text-gray-500 font-medium">{token.contractId}</span>
                        </div>

                        {/* Middle: Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                            {/* Row 1: Symbol, Name, Copy */}
                            <div className="flex items-center gap-1.5">
                                <span className="font-bold text-[14px] text-white truncate leading-none tracking-tight">{token.symbol}</span>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="text-[12px] text-gray-500 hover:text-blue-400 truncate max-w-[100px] leading-none font-normal cursor-pointer transition-colors">
                                            {token.name}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="bg-black/90 text-white border-gray-700">
                                        <span>{token.name}</span>
                                    </TooltipContent>
                                </Tooltip>
                                <Copy size={11} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                            </div>

                            {/* Row 2: Time, Socials */}
                            <div className="flex items-center gap-3 text-[11px] mt-0.5">
                                <span className="text-green-500 font-bold">{timeAgo}</span>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Music size={11} className="hover:text-white cursor-pointer transition-colors" />
                                    <Twitter size={11} className="hover:text-white cursor-pointer transition-colors" />
                                    <Link2 size={11} className="hover:text-white cursor-pointer transition-colors" />
                                    <Search size={11} className="hover:text-white cursor-pointer transition-colors" />
                                    <div className="flex items-center gap-0.5 hover:text-white cursor-pointer transition-colors">
                                        <Users size={11} />
                                        <span className="text-[10px] font-bold text-white">{token.userCount}</span>
                                    </div>
                                    <div className="flex items-center gap-0.5 hover:text-white cursor-pointer transition-colors">
                                        <BarChart2 size={11} />
                                        <span className="text-[10px] font-bold text-gray-500">{token.chartCount}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Badges */}
                            <div className="flex items-center gap-2 mt-1.5">
                                {/* Badge 1: User */}
                                <div className={cn(
                                    "flex items-center gap-1 bg-[#0a0a0a] rounded px-1.5 py-0.5 border",
                                    token.badges[0].color === 'red' ? 'border-red-900/30' : 'border-green-900/30'
                                )}>
                                    <User size={9} className={token.badges[0].color === 'red' ? 'text-red-500' : 'text-green-500'} />
                                    <span className={cn(
                                        "text-[9px] font-bold",
                                        token.badges[0].color === 'red' ? 'text-red-500' : 'text-green-500'
                                    )}>{token.badges[0].value}%</span>
                                </div>
                                {/* Badge 2: Sprout */}
                                <div className={cn(
                                    "flex items-center gap-1 bg-[#0a0a0a] rounded px-1.5 py-0.5 border",
                                    token.badges[1].color === 'red' ? 'border-red-900/30' : 'border-green-900/30'
                                )}>
                                    <Sprout size={9} className={token.badges[1].color === 'red' ? 'text-red-500' : 'text-green-500'} />
                                    <span className={cn(
                                        "text-[9px] font-bold",
                                        token.badges[1].color === 'red' ? 'text-red-500' : 'text-green-500'
                                    )}>{token.badges[1].value}%</span>
                                </div>
                                {/* Badge 3: Crosshair */}
                                <div className={cn(
                                    "flex items-center gap-1 bg-[#0a0a0a] rounded px-1.5 py-0.5 border",
                                    token.badges[2].color === 'red' ? 'border-red-900/30' : 'border-green-900/30'
                                )}>
                                    <Crosshair size={9} className={token.badges[2].color === 'red' ? 'text-red-500' : 'text-green-500'} />
                                    <span className={cn(
                                        "text-[9px] font-bold",
                                        token.badges[2].color === 'red' ? 'text-red-500' : 'text-green-500'
                                    )}>{token.badges[2].value}%</span>
                                </div>
                                {/* Badge 4: Lock */}
                                <div className={cn(
                                    "flex items-center gap-1 bg-[#0a0a0a] rounded px-1.5 py-0.5 border",
                                    token.badges[3].color === 'red' ? 'border-red-900/30' : 'border-green-900/30'
                                )}>
                                    <Lock size={9} className={token.badges[3].color === 'red' ? 'text-red-500' : 'text-green-500'} />
                                    <span className={cn(
                                        "text-[9px] font-bold",
                                        token.badges[3].color === 'red' ? 'text-red-500' : 'text-green-500'
                                    )}>{token.badges[3].value}%</span>
                                </div>
                                {/* Badge 5: TreePine */}
                                <div className={cn(
                                    "flex items-center gap-1 bg-[#0a0a0a] rounded px-1.5 py-0.5 border",
                                    token.badges[4].color === 'red' ? 'border-red-900/30' : 'border-green-900/30'
                                )}>
                                    <TreePine size={9} className={token.badges[4].color === 'red' ? 'text-red-500' : 'text-green-500'} />
                                    <span className={cn(
                                        "text-[9px] font-bold",
                                        token.badges[4].color === 'red' ? 'text-red-500' : 'text-green-500'
                                    )}>{token.badges[4].value}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Stats & Action */}
                        <div className="flex flex-col items-end justify-between min-w-[100px] py-0.5">
                            <div className="text-right w-full">
                                {/* MC & V */}
                                <div className="flex flex-col items-end gap-0.5">
                                    <div className="flex items-center justify-end gap-1.5 leading-none">
                                        <span className={cn("text-gray-500 font-medium", metricsSize === 'large' ? "text-[11px]" : "text-[10px]")}>MC</span>
                                        <span className={cn("text-blue-400 font-bold", metricsSize === 'large' ? "text-[15px]" : "text-[12px]")}>{formattedMarketCap}</span>
                                    </div>
                                    <div className="flex items-center justify-end gap-1.5 leading-none">
                                        <span className={cn("text-gray-500 font-medium", metricsSize === 'large' ? "text-[11px]" : "text-[10px]")}>V</span>
                                        <span className={cn("text-white font-bold", metricsSize === 'large' ? "text-[15px]" : "text-[12px]")}>{formattedVolume}</span>
                                    </div>
                                </div>

                                {/* F & TX */}
                                <div className="flex items-center justify-end gap-2 text-[10px] mt-2 leading-none w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 text-[9px] font-medium">F</span>
                                        <div className="flex items-center gap-0.5">
                                            <div className="h-2 w-2 rounded-sm bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500" />
                                            <span className="text-white font-bold">0.025</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500 text-[9px] font-medium">TX</span>
                                        <span className="text-white font-bold">19</span>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <div className="mt-1 w-full flex justify-end">
                                <Button
                                    size="sm"
                                    className={cn(
                                        "bg-[#5e87ff] hover:bg-blue-600 text-white rounded-full font-bold shadow-[0_0_10px_rgba(94,135,255,0.3)] transition-all duration-200",
                                        buttonStyles
                                    )}
                                >
                                    <Zap size={10} className="mr-1 fill-current" />
                                    0 SOL
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/90 text-green-500 border-green-500/20 font-medium">
                <span>Bonding: {bondingPercentage}%</span>
            </TooltipContent>
        </Tooltip>
    );
}, (prevProps, nextProps) => {
    // Custom comparison - only re-render if key token data changed
    return (
        prevProps.token.id === nextProps.token.id &&
        prevProps.token.marketCap === nextProps.token.marketCap &&
        prevProps.token.volume24h === nextProps.token.volume24h &&
        prevProps.token.liquidity === nextProps.token.liquidity &&
        prevProps.index === nextProps.index
    );
});
