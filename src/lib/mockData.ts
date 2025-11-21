import { Token } from '@/types';

// Helper to generate random contract IDs
const generateContractId = (prefix: string) => `${prefix.slice(0, 4)}...pump`;

// Helper to generate random badge values
const randomBadge = () => ({
    value: Math.floor(Math.random() * 90), // 0-90%
    color: (Math.random() > 0.6 ? 'green' : 'red') as 'green' | 'red'
});

const randomBadges = () => [
    randomBadge(),
    randomBadge(),
    randomBadge(),
    randomBadge(),
    randomBadge()
];

const tokenNames = [
    { symbol: 'GTA', name: 'GTA 6', bg: 'FF6B6B' },
    { symbol: 'ZIP67', name: '67 zip coin', bg: '4ECDC4' },
    { symbol: 'Sam3D', name: 'Meta Wallhack Ai', bg: 'FFD93D' },
    { symbol: 'MITCH', name: 'Justice For Mitch', bg: '95E1D3' },
    { symbol: 'DOGE2', name: 'Doge 2.0', bg: 'F9A826' },
    { symbol: 'PEPE', name: 'Pepe Coin', bg: '7EE081' },
    { symbol: 'SHIB', name: 'Shiba Inu 2', bg: 'FF6B9D' },
    { symbol: 'FLOKI', name: 'Floki Viking', bg: 'A8E6CF' },
    { symbol: 'BONK', name: 'Bonk Dog', bg: 'FFD3B6' },
    { symbol: 'WIF', name: 'dogwifhat', bg: 'FFFACD' },
    { symbol: '95', name: 'Official 95 Coin', bg: 'F38181' },
    { symbol: 'AgarFi', name: 'AgarFi', bg: 'AA96DA' },
    { symbol: 'UCU', name: 'UNITED CRYPTO UNION', bg: 'FCBAD3' },
    { symbol: 'PB', name: 'Privacy Backroom', bg: 'A8E6CF' },
    { symbol: 'MYRO', name: 'Myro Token', bg: 'FEC8D8' },
    { symbol: 'SMOG', name: 'Smog Finance', bg: 'D4A5A5' },
    { symbol: 'SOLANA', name: 'Solana 2', bg: '9D84B7' },
    { symbol: 'BODEN', name: 'Jeo Boden', bg: 'F9E79F' },
    { symbol: 'Overworked', name: 'Overworked Robot', bg: 'FFD3B6' },
    { symbol: 'GRUNI', name: 'Golden Rainbow Unicorn', bg: 'FFFACD' },
    { symbol: 'poopcorn', name: 'poopcorn', bg: 'C7CEEA' },
    { symbol: 'TRUMP', name: 'MAGA Coin', bg: 'E74C3C' },
    { symbol: 'POPCAT', name: 'Popcat Meme', bg: 'F39C12' },
    { symbol: 'MEW', name: 'cat in a dogs world', bg: 'E8DAEF' },
    { symbol: 'GIGA', name: 'GigaChad Token', bg: 'AED6F1' },
    { symbol: 'MICHI', name: 'Michi Cat', bg: 'F8C8DC' },
    { symbol: 'RETARDIO', name: 'Retardio', bg: '85C1E2' },
    { symbol: 'MOTHER', name: 'MOTHER IGGY', bg: 'D7BDE2' },
    { symbol: 'DADDY', name: 'DADDY TATE', bg: 'C39BD3' },
    { symbol: 'HOPPY', name: 'Hoppy Frog', bg: 'ABEBC6' },
    { symbol: 'HABIBI', name: 'Habibi Coin', bg: 'F8B88B' }
];

const generateToken = (id: number, status: 'new' | 'final_stretch' | 'migrated', baseTime: number): Token => {
    const tokenInfo = tokenNames[id % tokenNames.length];
    const isNew = status === 'new';
    const isFinal = status === 'final_stretch';

    // Random protocol and quote token assignment
    const protocols = ['Pump', 'Mayhem', 'Bonk', 'Raydium', 'Moonshot', 'Orca', 'Jupiter Studio', 'Meteora AMM', 'Daos.fun', 'LaunchLab'];
    const quoteTokens = ['SOL', 'USDC', 'USDT'];

    return {
        id: id.toString(),
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
        address: generateContractId(tokenInfo.symbol + Math.random().toString(36).substring(7)),
        price: isNew ? Math.random() * 0.1 : (isFinal ? Math.random() * 15 + 0.5 : Math.random() * 50 + 1),
        priceChange24h: Math.floor(Math.random() * 80),
        volume24h: isNew ? Math.floor(Math.random() * 5000) : (isFinal ? Math.floor(Math.random() * 500000) + 50000 : Math.floor(Math.random() * 800000) + 100000),
        marketCap: isNew ? Math.floor(Math.random() * 10000) + 2000 : (isFinal ? Math.floor(Math.random() * 600000) + 30000 : Math.floor(Math.random() * 200000) + 30000),
        liquidity: isNew ? Math.floor(Math.random() * 8000) + 2000 : (isFinal ? Math.floor(Math.random() * 500000) + 30000 : Math.floor(Math.random() * 150000) + 30000),
        holders: isNew ? Math.floor(Math.random() * 20) : (isFinal ? Math.floor(Math.random() * 600) + 100 : Math.floor(Math.random() * 1000) + 200),
        createdAt: new Date(Date.now() - baseTime).toISOString(),
        logoUrl: `https://ui-avatars.com/api/?name=${tokenInfo.symbol}&background=${tokenInfo.bg}`,
        status,
        txns: isNew ? Math.floor(Math.random() * 50) + 1 : (isFinal ? Math.floor(Math.random() * 6000) + 500 : Math.floor(Math.random() * 10000) + 1000),
        audit: 'passed',
        contractId: generateContractId(tokenInfo.symbol),
        userCount: isNew ? Math.floor(Math.random() * 15) : (isFinal ? Math.floor(Math.random() * 100) + 10 : Math.floor(Math.random() * 300) + 20),
        chartCount: isNew ? Math.floor(Math.random() * 5) : (isFinal ? Math.floor(Math.random() * 150) + 10 : Math.floor(Math.random() * 1000) + 50),
        badges: randomBadges(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        quoteToken: quoteTokens[Math.floor(Math.random() * quoteTokens.length)]
    };
};

// Generate 56 tokens (show only 10-12 per column after filtering)
export const MOCK_TOKENS: Token[] = [
    // New Pairs (20 tokens)
    ...Array.from({ length: 20 }, (_, i) => generateToken(i, 'new', (i + 1) * 5000 + Math.random() * 10000)),

    // Final Stretch (18 tokens)
    ...Array.from({ length: 18 }, (_, i) => generateToken(i + 20, 'final_stretch', (i + 1) * 3600000 + Math.random() * 7200000)),

    // Migrated (18 tokens)
    ...Array.from({ length: 18 }, (_, i) => generateToken(i + 38, 'migrated', (i + 1) * 1800000 + Math.random() * 3600000))
];

const bnbTokenNames = [
    { symbol: 'CAKE', name: 'PancakeSwap', bg: 'D1884F' },
    { symbol: 'BAKE', name: 'BakeryToken', bg: 'CD853F' },
    { symbol: 'XVS', name: 'Venus', bg: 'F0E68C' },
    { symbol: 'ALPACA', name: 'Alpaca Finance', bg: '98FB98' },
    { symbol: 'TWT', name: 'Trust Wallet', bg: '87CEEB' },
    { symbol: 'BSW', name: 'Biswap', bg: 'FF6347' },
    { symbol: 'BABY', name: 'BabySwap', bg: 'FFB6C1' },
    { symbol: 'CHESS', name: 'Tranchess', bg: 'D3D3D3' },
    { symbol: 'MBOX', name: 'MOBOX', bg: '87CEFA' },
    { symbol: 'DOGE', name: 'Binance-Peg Dogecoin', bg: 'F0E68C' },
    { symbol: 'SHIB', name: 'Binance-Peg SHIBA INU', bg: 'FF69B4' },
    { symbol: 'SAFEMOON', name: 'SafeMoon', bg: '00FA9A' },
    { symbol: 'RICH', name: 'Rich Quack', bg: 'FFFF00' },
    { symbol: 'CATE', name: 'CateCoin', bg: 'D3D3D3' },
    { symbol: 'FEG', name: 'FEG Token', bg: '000000' },
    { symbol: 'PIT', name: 'Pitbull', bg: 'A52A2A' },
    { symbol: 'HAM', name: 'Hamster', bg: 'B0C4DE' },
    { symbol: 'SFM', name: 'SafeMoon V2', bg: '40E0D0' },
    { symbol: 'FLOKI', name: 'Floki', bg: 'DAA520' },
    { symbol: 'BRISE', name: 'Bitgert', bg: '4682B4' },
    { symbol: 'BNX', name: 'BinaryX', bg: 'FF4500' },
    { symbol: 'RACA', name: 'Radio Caca', bg: '8A2BE2' },
    { symbol: 'YOOSHI', name: 'YooShi', bg: '32CD32' },
    { symbol: 'QUACK', name: 'Rich Quack', bg: 'FFD700' },
    { symbol: 'VINU', name: 'Vita Inu', bg: '00BFFF' },
    { symbol: 'ZOO', name: 'ZooKeeper', bg: '228B22' },
    { symbol: 'NAFT', name: 'Nafter', bg: 'FF1493' },
    { symbol: 'SFP', name: 'SafePal', bg: '708090' },
    { symbol: 'LAZIO', name: 'Lazio Fan Token', bg: '87CEEB' },
    { symbol: 'PORTO', name: 'Porto Fan Token', bg: '0000CD' },
    { symbol: 'SANTOS', name: 'Santos Fan Token', bg: '000000' },
    { symbol: 'BETA', name: 'Beta Finance', bg: '32CD32' },
    { symbol: 'DAR', name: 'Mines of Dalarnia', bg: 'FF8C00' },
    { symbol: 'HIGH', name: 'Highstreet', bg: '9370DB' },
    { symbol: 'MC', name: 'Merit Circle', bg: 'FF6347' },
    { symbol: 'MOVR', name: 'Moonriver', bg: 'FFA500' },
    { symbol: 'WAN', name: 'Wanchain', bg: '00CED1' },
    { symbol: 'REEF', name: 'Reef', bg: 'FF00FF' },
    { symbol: 'LIT', name: 'Litentry', bg: '00FF7F' },
    { symbol: 'DODO', name: 'DODO', bg: 'FFD700' },
    { symbol: 'BEL', name: 'Bella Protocol', bg: '000000' },
    { symbol: 'WING', name: 'Wing Finance', bg: '1E90FF' },
    { symbol: 'BURGER', name: 'BurgerCities', bg: 'FFA07A' },
    { symbol: 'SPARTAN', name: 'Spartan Protocol', bg: '8B4513' },
    { symbol: 'CREAM', name: 'Cream Finance', bg: 'ADD8E6' },
    { symbol: 'AUTO', name: 'Auto', bg: 'F08080' },
    { symbol: 'EPS', name: 'Ellipsis', bg: '000080' },
    { symbol: 'MDS', name: 'Midas Protocol', bg: 'FFD700' },
    { symbol: 'XWG', name: 'X World Games', bg: '000000' },
    { symbol: 'HERO', name: 'Metahero', bg: '00BFFF' }
];

const generateBNBToken = (id: number, status: 'new' | 'final_stretch' | 'migrated', baseTime: number, offset: number = 0): Token => {
    // Use offset to ensure different tokens for different categories
    const tokenInfo = bnbTokenNames[(id + offset) % bnbTokenNames.length];
    const isNew = status === 'new';
    const isFinal = status === 'final_stretch';

    // BNB specific protocols
    const protocols = ['PancakeSwap', 'BakerySwap', 'Biswap', 'ApeSwap', 'BabySwap'];
    const quoteTokens = ['WBNB', 'BUSD', 'USDT'];

    return {
        id: `bnb-${id}`,
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
        address: `0x${Math.random().toString(16).substring(2, 42)}`,
        price: isNew ? Math.random() * 0.01 : (isFinal ? Math.random() * 5 + 0.1 : Math.random() * 20 + 0.5),
        priceChange24h: Math.floor(Math.random() * 60),
        volume24h: isNew ? Math.floor(Math.random() * 3000) : (isFinal ? Math.floor(Math.random() * 300000) + 30000 : Math.floor(Math.random() * 500000) + 80000),
        marketCap: isNew ? Math.floor(Math.random() * 8000) + 1000 : (isFinal ? Math.floor(Math.random() * 400000) + 20000 : Math.floor(Math.random() * 150000) + 20000),
        liquidity: isNew ? Math.floor(Math.random() * 5000) + 1000 : (isFinal ? Math.floor(Math.random() * 300000) + 20000 : Math.floor(Math.random() * 100000) + 20000),
        holders: isNew ? Math.floor(Math.random() * 15) : (isFinal ? Math.floor(Math.random() * 400) + 50 : Math.floor(Math.random() * 800) + 100),
        createdAt: new Date(Date.now() - baseTime).toISOString(),
        logoUrl: `https://ui-avatars.com/api/?name=${tokenInfo.symbol}&background=${tokenInfo.bg}`,
        status,
        txns: isNew ? Math.floor(Math.random() * 40) + 1 : (isFinal ? Math.floor(Math.random() * 4000) + 300 : Math.floor(Math.random() * 8000) + 800),
        audit: 'passed',
        contractId: `0x${Math.random().toString(16).substring(2, 10)}...bsc`,
        userCount: isNew ? Math.floor(Math.random() * 10) : (isFinal ? Math.floor(Math.random() * 80) + 5 : Math.floor(Math.random() * 200) + 15),
        chartCount: isNew ? Math.floor(Math.random() * 3) : (isFinal ? Math.floor(Math.random() * 100) + 5 : Math.floor(Math.random() * 800) + 30),
        badges: randomBadges(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        quoteToken: quoteTokens[Math.floor(Math.random() * quoteTokens.length)]
    };
};

export const MOCK_TOKENS_BNB: Token[] = [
    // New Pairs (20 tokens) - Start from index 0
    ...Array.from({ length: 20 }, (_, i) => generateBNBToken(i, 'new', (i + 1) * 5000 + Math.random() * 10000, 0)),

    // Final Stretch (18 tokens) - Start from index 20
    ...Array.from({ length: 18 }, (_, i) => generateBNBToken(i + 20, 'final_stretch', (i + 1) * 3600000 + Math.random() * 7200000, 20)),

    // Migrated (18 tokens) - Start from index 38
    ...Array.from({ length: 18 }, (_, i) => generateBNBToken(i + 38, 'migrated', (i + 1) * 1800000 + Math.random() * 3600000, 38))
];

// Counters for generating new tokens dynamically
let solTokenCounter = 100;
let bnbTokenCounter = 100;

// Generate a new SOL token with current timestamp (0 elapsed time)
export const generateNewSOLToken = (): Token => {
    const tokenInfo = tokenNames[solTokenCounter % tokenNames.length];
    const protocols = ['Pump', 'Mayhem', 'Bonk', 'Raydium', 'Moonshot', 'Orca', 'Jupiter Studio', 'Meteora AMM', 'Daos.fun', 'LaunchLab'];
    const quoteTokens = ['SOL', 'USDC', 'USDT'];

    const token: Token = {
        id: `new-sol-${solTokenCounter}`,
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
        address: generateContractId(tokenInfo.symbol + Math.random().toString(36).substring(7)),
        price: Math.random() * 0.1,
        priceChange24h: Math.floor(Math.random() * 80),
        volume24h: Math.floor(Math.random() * 5000),
        marketCap: Math.floor(Math.random() * 10000) + 2000,
        liquidity: Math.floor(Math.random() * 8000) + 2000,
        holders: Math.floor(Math.random() * 20),
        createdAt: new Date().toISOString(), // Current time = 0 elapsed seconds
        logoUrl: `https://ui-avatars.com/api/?name=${tokenInfo.symbol}&background=${tokenInfo.bg}`,
        status: 'new',
        txns: Math.floor(Math.random() * 50) + 1,
        audit: 'passed',
        contractId: generateContractId(tokenInfo.symbol),
        userCount: Math.floor(Math.random() * 15),
        chartCount: Math.floor(Math.random() * 5),
        badges: randomBadges(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        quoteToken: quoteTokens[Math.floor(Math.random() * quoteTokens.length)]
    };

    solTokenCounter++;
    return token;
};

// Generate a new BNB token with current timestamp (0 elapsed time)
export const generateNewBNBToken = (): Token => {
    const tokenInfo = bnbTokenNames[bnbTokenCounter % bnbTokenNames.length];
    const protocols = ['PancakeSwap', 'BakerySwap', 'Biswap', 'ApeSwap', 'BabySwap'];
    const quoteTokens = ['WBNB', 'BUSD', 'USDT'];

    const token: Token = {
        id: `new-bnb-${bnbTokenCounter}`,
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
        address: `0x${Math.random().toString(16).substring(2, 42)}`,
        price: Math.random() * 0.01,
        priceChange24h: Math.floor(Math.random() * 60),
        volume24h: Math.floor(Math.random() * 3000),
        marketCap: Math.floor(Math.random() * 8000) + 1000,
        liquidity: Math.floor(Math.random() * 5000) + 1000,
        holders: Math.floor(Math.random() * 15),
        createdAt: new Date().toISOString(), // Current time = 0 elapsed seconds
        logoUrl: `https://ui-avatars.com/api/?name=${tokenInfo.symbol}&background=${tokenInfo.bg}`,
        status: 'new',
        txns: Math.floor(Math.random() * 40) + 1,
        audit: 'passed',
        contractId: `0x${Math.random().toString(16).substring(2, 10)}...bsc`,
        userCount: Math.floor(Math.random() * 10),
        chartCount: Math.floor(Math.random() * 3),
        badges: randomBadges(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        quoteToken: quoteTokens[Math.floor(Math.random() * quoteTokens.length)]
    };

    bnbTokenCounter++;
    return token;
};

// Export function to update token data (for real-time updates)
export const updateTokenData = (token: Token): Token => {
    const priceChange = (Math.random() - 0.5) * 0.1; // ±10% change
    const volumeChange = (Math.random() - 0.5) * 0.2; // ±20% change

    return {
        ...token,
        price: Math.max(0.001, token.price * (1 + priceChange)),
        volume24h: Math.max(0, token.volume24h * (1 + volumeChange)),
        txns: token.txns + Math.floor(Math.random() * 5),
        userCount: Math.max(0, token.userCount + Math.floor(Math.random() * 7) - 3),
        chartCount: Math.max(0, token.chartCount + Math.floor(Math.random() * 5) - 2),
        badges: token.badges.map(badge => ({
            value: Math.min(90, Math.max(0, badge.value + Math.floor(Math.random() * 20) - 10)),
            color: (Math.random() > 0.8 ? (badge.color === 'red' ? 'green' : 'red') : badge.color) as 'green' | 'red'
        }))
    };
};
