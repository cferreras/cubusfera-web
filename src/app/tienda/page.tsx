import Container from "@/components/Container";
import Rank from "@/components/Rank";
import Title from "@/components/Title";

export default function Normas() {
    const content = {
        "oro": [
            "Rango visible en Discord y Minecraft",
            "/tpa y /tpahere",
            "/bed (teletransporte a tu cama)",
            "/spawn",
            "/nick",
            "/workbench (abre la meta de crafteo)",
            "/enderchest",
            "/wastebin (abre una basura que elimina objetos)",
            "600 bloques de protección"
        ],
        "diamante": [
            "Rango visible en Discord y Minecraft",
            "/tpa y /tpahere",
            "/sethome y /home",
            "/bed (tp a tu cama)",
            "/spawn",
            "/randomteleport || /rtp (te teletransporta a una zona aleatoria)",
            "/nick",
            "/workbench (abre la mesa de crafteo)",
            "/enderchest",
            "/grindstone (abre una afiladora)",
            "/stonecutter (abre una corta piedras)",
            "/wastebin (abre una basura que elimina objetos)",
            "1600 bloques de protección"
        ],
        "netherita": [
            "Rango visible en Discord y Minecraft",
            "/tpa y /tpahere",
            "/sethome y /home (Con 3 homes)",
            "/warp (teletransporte a zonas de interés como granjas)",
            "/back (vuelve a tu ultima posición)",
            "/bed (tp a tu cama)",
            "/spawn",
            "/randomteleport || /rtp (te teletransporta a una zona aleatoria)",
            "/nick",
            "/workbench (abre la mesa de crafteo)",
            "/enderchest",
            "/grindstone (abre una afiladora)",
            "/stonecutter (abre una corta piedras)",
            "/anvil (abre un yunque)",
            "/wastebin (abre una basura que elimina objetos)",
            "4000 bloques de protección"
        ]   
    }
    return (
        <>
            <Title title="Tienda" subtitle="Tienda del servidor" />
            <Container>
                <div className="md:flex md:space-x-4 space-y-4 md:space-y-0 px-4">
                    <Rank title={"Oro"} description={"Rango oro a partir de 2€"} content={content.oro} />
                    <Rank title={"Diamante"} description={"Rango diamante a partir de 4€"} content={content.diamante} />
                    <Rank title={"Netherita"} description={"Rango netherita a partir de 6€"} content={content.netherita} />
                </div>
            </Container >
        </>
    );


}