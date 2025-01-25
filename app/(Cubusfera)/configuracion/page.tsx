import Container from "@/components/Container";
import Title from "@/components/Title";
import { createClient } from "@/utils/supabase/server";

export default async function Perfil() {
    const supabase = await createClient()
    const session = await supabase.auth.getUser()
    const discordUser = "Jose";
    return (
    <>
        <Title title="Tu perfil" subtitle={discordUser} />
        <Container>
            <div>¡Hola de nuevo!</div>
        </Container>
    </>
    )
}