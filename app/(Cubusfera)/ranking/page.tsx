import AchievementCard from "@/components/AchievementCard";
import Container from "@/components/Container";
import { createClient } from "@/utils/supabase/server";

async function getMonthlyAchievements() {
    const supabase = await createClient();
    const currentMonth = new Date();
    const monthString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;

    const { data: achievements } = await supabase
        .from('monthly_achievements')
        .select(`
            *,
            profiles:profile_id (
                minecraft_username
            )
        `)
        .eq('month_year', monthString)
        .order('rank')
        .lte('rank', 5);

    return achievements || [];
}

export default async function Achievements() {
    const achievements = await getMonthlyAchievements();
    const snapshotDate = achievements[0]?.created_at
        ? new Date(achievements[0].created_at).toLocaleString('es-ES', {
            dateStyle: 'full',
            timeStyle: 'short'
        })
        : 'No disponible';

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
            Icon,  // Pass the actual icon component
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

    const currentMonth = new Date().toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    return (
        <Container className="py-20">
            <div className="flex flex-col gap-1 mb-12">
                <h1 className="text-lg font-bold">Ranking Mensual</h1>
                <p className="text-base text-muted-foreground">
                    Top jugadores para {currentMonth}
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
                        <div key={index} className="bg-card rounded-lg p-6">
                            <h3 className="font-semibold mb-4">{leaderboard.category}</h3>
                            <div className="space-y-2">
                                {leaderboard.entries.map((entry, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <span className="w-8 text-muted-foreground">
                                                #{entry.position}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <img 
                                                    src={entry.avatarUrl}
                                                    alt={`${entry.username}'s avatar`}
                                                    className="w-6 h-6 rounded"
                                                    width={24}
                                                    height={24}
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
        </Container>
    );
}