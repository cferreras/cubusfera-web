export interface MonthlyAchievement {
    category: string;
    winner: string;
    value: number;
    icon: string;
    suffix: string;
    profileUrl?: string;
    avatarUrl?: string;
}

export interface LeaderboardEntry {
    username: string;
    value: string;
    position: number;
    avatarUrl?: string;
}

export interface CategoryLeaderboard {
    category: string;
    entries: LeaderboardEntry[];
}