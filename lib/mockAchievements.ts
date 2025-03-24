import { MonthlyAchievement, CategoryLeaderboard } from '../types/achievements';

export const mockAchievements: MonthlyAchievement[] = [
    {
        category: 'Most Playtime',
        winner: 'Player123',
        value: '126 hours',
        icon: 'Clock'
    },
    {
        category: 'Blocks Mined',
        winner: 'MinerPro',
        value: '45,892 blocks',
        icon: 'Pickaxe'
    },
    {
        category: 'Mobs Killed',
        winner: 'Hunter567',
        value: '1,234 mobs',
        icon: 'Sword'
    },
    {
        category: 'Deaths',
        winner: 'UnluckyPlayer',
        value: '89 deaths',
        icon: 'Skull'
    },
    {
        category: 'Experience Level',
        winner: 'XPMaster',
        value: 'Level 156',
        icon: 'Star'
    },
    {
        category: 'Distance Traveled',
        winner: 'Explorer99',
        value: '789 km',
        icon: 'Map'
    }
];

export const mockLeaderboards: CategoryLeaderboard[] = [
    {
        category: 'Most Playtime',
        entries: [
            { username: 'Player123', value: '126 hours', position: 1 },
            { username: 'Player456', value: '118 hours', position: 2 },
            { username: 'Player789', value: '98 hours', position: 3 },
            { username: 'Player101', value: '87 hours', position: 4 },
            { username: 'Player202', value: '76 hours', position: 5 },
        ]
    },
    {
        category: 'Bloques Minados',
        entries: [
            { username: 'MinerPro', value: '45,892 bloques', position: 1 },
            { username: 'DiamondDigger', value: '43,567 bloques', position: 2 },
            { username: 'MineCrafter99', value: '41,234 bloques', position: 3 },
            { username: 'BlockBuster', value: '38,901 bloques', position: 4 },
            { username: 'StoneBreaker', value: '35,678 bloques', position: 5 },
        ]
    },
    // Add similar entries for other categories...
];