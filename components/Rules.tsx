export default function Rules() {

    const rules = [
        {
            "id": 1,
            "title": "Sé amable con los demás",
            "body": "Sé respetuoso con los demás, aunque no te gusten. No se tolera ningún tipo de discurso de odio.\n\nNo discrimines por ningún motivo, incluidos, entre otros, la raza, el sexo, la sexualidad, la religión o cualquier discapacidad.\n\nNo hagas caza de brujas ni acoses a nuestros miembros, ni intentes incitar a la violencia."
        },
        {
            "id": 2,
            "title": "Mantén un contenido apropiado",
            "body": "No publiques contenido NSFW u obsceno de ningún tipo, esto incluye, pero no se limita a la desnudez, el sexo, la violencia dura, o cualquier otro contenido perturbador. Esta regla se aplica al texto, las imágenes, los vídeos, el audio, los enlaces, tu nombre de usuario, tu avatar, tu estado, y apariencia."
        },
        {
            "id": 3,
            "title": "No hagas publicidad",
            "body": "No se permite la publicidad no solicitada en los canales del servidor ni en los DMs de los miembros. Esto incluye la publicidad en tu nick. Cuando sea apropiado dentro de la conversación, se harán excepciones. Aunque eso no significa que deba ser el objetivo principal de la conversación."
        },
        {
            "id": 4,
            "title": "Juega limpio",
            "body": "Cualquier ventaja abusiva está completamente prohibida, ya sea por mods, exploits, programas externos, o mecánicas poco conocidas. Esto no quiere decir que todos los mods o mecánicas estén prohibidas, solo se prohíbe aquello que suponga una ventaja importante y que no esté adoptado en el servidor."
        },
        {
            "id": 5,
            "title": "Respeta el espacio de los demás y el entorno",
            "body": "Antes de construir algo asegúrate de alejarte lo suficiente de los terrenos de otros jugadores y el spawn, así mismo no modifiques el terreno de formas extremas que puedan resultar chocantes. Tampoco construyas o crees granjas que puedan mermar el rendimiento del servidor."
        },
        {
            "id": 6,
            "title": "Respeta la propiedad de otros jugadores",
            "body": "No robes de cofres de otros jugadores. Aunque un cofre esté desprotegido, no significa que puedas tomar su contenido sin permiso. Tampoco abuses cogiendo cosas de cofres de las granjas comunitarias."
        },
        {
            "id": 7,
            "title": "PvP consentido y justo",
            "body": "No realices PvP a menos que ambos jugadores tengan /pvp activado. En cualquier caso, está prohibido intentar robar los drops de los jugadores mediante bugs o exploits durante el combate."
        },
        {
            "id": 8,
            "title": "Juega en comunidad",
            "body": "Todos jugamos por un bien común, y es necesario apoyarnos para poder conseguirlo. No explotes ítems de alto valor perjudicando su obtención a los demás, ni te adueñes de ellos. Las ventas o intercambios están prohibidos, si puedes colaborar, plantéate hacerlo, es un servidor comunitario."
        },
        {
            "id": 9,
            "title": "Practica el sentido común",
            "body": "Por favor, intenta mantener la comunidad sana, no podemos (y no deberíamos) explicar todo punto por punto."
        }
    ];

    return (
        <div className="" id="normas">
            <div className="mx-auto max-w-7xl">
                <div className="py-8 mx-auto max-w-7xl ">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">

                            {/* Iterate rules here with map*/}
                            {rules.map((rule) => (
                                <div key={rule.id}>
                                    <dt className="text-left text-base">
                                        {rule.id}. <span>{rule.title}</span>
                                    </dt>
                                    <dd className="mt-2 text-left text-base dark:text-neutral-400 text-neutral-600 whitespace-pre-line">
                                        {rule.body}
                                    </dd>
                                </div>)
                            )}
                            <p className="text-sm dark:text-neutral-400 text-neutral-600 border-t border-black border-opacity-75 dark:border-gray-600 pt-4">
                                Todas las decisiones de los moderadores son definitivas y no se
                                pueden discutir.
                            </p>
                        </dl>
                    </div>
            </div >
        </div >)
}