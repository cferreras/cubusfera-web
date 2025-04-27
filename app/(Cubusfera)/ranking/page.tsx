import { Metadata } from "next";
import Image from "next/image";
import AchievementCard from "@/components/AchievementCard";
import Container from "@/components/Container";
import { createClient } from "@/utils/supabase/server";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export const metadata: Metadata = {
    title: 'Ranking Mensual – Cubusfera',
    description: 'Ranking mensual de jugadores del servidor de Minecraft Cubusfera',
}

type SearchParams = {
    page?: string;
    [key: string]: string | string[] | undefined;
};

type PageProps = {
    searchParams: Promise<SearchParams>;
};

async function getMonthlyAchievements(page = 1) {
    const supabase = await createClient();
    
    // Get unique months first
    const { data: uniqueMonths } = await supabase
        .from('monthly_achievements')
        .select('month_year')
        .order('month_year', { ascending: false });

    const uniqueMonthsSet = new Set(uniqueMonths?.map(m => m.month_year));
    const totalMonths = uniqueMonthsSet.size;
    const selectedMonth = Array.from(uniqueMonthsSet)[page - 1];

    // Get achievements for the selected month
    const { data: achievements } = await supabase
        .from('monthly_achievements')
        .select(`
            *,
            profiles:profile_id (
                minecraft_username
            )
        `)
        .eq('month_year', selectedMonth)
        .order('rank')
        .lte('rank', 5);

    return { 
        achievements: achievements || [], 
        hasMore: page < totalMonths,
        currentMonth: selectedMonth,
        totalPages: totalMonths
    };
}

export default async function Achievements({
    searchParams,
}: PageProps) {
    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams.page) || 1;
    const { achievements, hasMore, currentMonth } = await getMonthlyAchievements(currentPage);
    
    const snapshotDate = achievements[0]?.created_at
        ? new Date(achievements[0].created_at).toLocaleString('es-ES', {
            dateStyle: 'full',
            timeStyle: 'short'
        })
        : 'No disponible';
    
    // Format the selected month for display
    const displayMonth = new Date(currentMonth).toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    // Group achievements by category
    const categories = {
        'Tiempo de Juego': { icon: 'Clock', suffix: 'horas' },
        'Bloques Minados': { icon: 'Pickaxe', suffix: 'bloques' },
        'Mobs Eliminados': { icon: 'Sword', suffix: 'mobs' },
        'Muertes': { icon: 'Skull', suffix: 'muertes' },
        'Nivel de Experiencia': { icon: 'Star', suffix: 'niveles' },
        'Distancia Recorrida': { icon: 'Map', suffix: 'km' },
    };

    const achievementCards = Object.entries(categories).map(([category, { icon: Icon, suffix }]) => {
        const categoryAchievements = achievements
            .filter(a => a.category === category)
            .slice(0, 3); // Top 3 players

        return {
            category,
            Icon,
            topPlayer: categoryAchievements[0]?.profiles?.minecraft_username || 'N/A',
            value: categoryAchievements[0]?.value || 0,
            suffix,
        };
    });

    const leaderboards = Object.entries(categories).map(([category, { suffix }]) => ({
        category,
        entries: achievements
            .filter(a => a.category === category)
            .map(entry => ({
                position: entry.rank,
                username: entry.profiles?.minecraft_username || 'N/A',
                value: `${entry.value} ${suffix}`,
                avatarUrl: `https://mc-heads.net/avatar/${entry.profiles?.minecraft_username}/32`
            }))
    }));

    return (
        <Container className="py-20">
            <div className="flex flex-col gap-1 mb-12">
                <h1 className="text-lg">Ranking Mensual</h1>
                <p className="text-base text-muted-foreground">
                    Top jugadores para {displayMonth}
                </p>
                <p className="text-sm text-muted-foreground">
                    Última actualización: {snapshotDate} UTC
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievementCards.map((achievement, index) => (
                    <AchievementCard 
                        key={index} 
                        achievement={{
                            ...achievement,
                            winner: achievement.topPlayer,
                            profileUrl: `/perfil/${achievement.topPlayer}`,
                            icon: achievement.Icon
                        }} 
                    />
                ))}
            </div>

            <div className="mt-16">
                <h2 className="text-lg font-bold mb-8">Tabla de Clasificación</h2>
                <div className="grid gap-8 md:grid-cols-2">
                    {leaderboards.map((leaderboard, index) => (
                        <div key={index} className="bg-card border rounded-3xl p-6">
                            <h3 className="font-semibold mb-4">{leaderboard.category}</h3>
                            <div className="space-y-2">
                                {leaderboard.entries.map((entry, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <span className="w-8 text-muted-foreground">
                                                #{entry.position}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <Image 
                                                    src={entry.avatarUrl}
                                                    alt={`${entry.username}'s avatar`}
                                                    className="rounded"
                                                    width={24}
                                                    height={24}
                                                    unoptimized
                                                />
                                                <a 
                                                    href={`/perfil/${entry.username}`}
                                                    className="hover:underline text-primary"
                                                >
                                                    {entry.username}
                                                </a>
                                            </div>
                                        </div>
                                        <span className="text-muted-foreground">{entry.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                href={`/ranking?page=${currentPage - 1}`}
                                aria-disabled={currentPage === 1}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                        {currentPage > 1 && (
                            <PaginationItem>
                                <PaginationLink href={`/ranking?page=${currentPage - 1}`}>
                                    {currentPage - 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink isActive>{currentPage}</PaginationLink>
                        </PaginationItem>
                        {hasMore && (
                            <PaginationItem>
                                <PaginationLink href={`/ranking?page=${currentPage + 1}`}>
                                    {currentPage + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationNext 
                                href={`/ranking?page=${currentPage + 1}`}
                                aria-disabled={!hasMore}
                                className={!hasMore ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </Container>
    );
}