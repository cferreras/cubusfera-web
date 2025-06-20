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
            "title": "Sigue la planificación del servidor",
            "body": "Todas las construcciones deben seguir la planificación establecida del servidor. No puedes construir libremente donde quieras. Debes colaborar en proyectos comunes y seguir las directrices de construcción.\n\nLas bases individuales están completamente prohibidas. Todo debe ser parte de la planificación comunitaria del servidor."
        },
        {
            "id": 6,
            "title": "Comunica y repara los daños",
            "body": "Si rompes algo accidentalmente, debes avisar inmediatamente y repararlo. No dejes estructuras dañadas sin comunicarlo.\n\nSi no puedes reparar el daño tú mismo, informa a los moderadores para que puedan solucionarlo."
        },
        {
            "id": 7,
            "title": "Prohibido duplicar items renovables",
            "body": "Está completamente prohibido duplicar items que son renovables por medios legítimos en el juego. Esto incluye cualquier método de duplicación mediante bugs, exploits o mecánicas no intencionadas.\n\nSi un item se puede obtener de forma renovable (granjas, generadores naturales, etc.), no debe ser duplicado artificialmente."
        },
        {
            "id": 8,
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