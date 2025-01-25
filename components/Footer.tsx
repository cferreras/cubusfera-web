export default function Footer() {
    return (
        <div className="mx-auto container  max-w-7xl pb-4 mt-auto bottom-0">
        <div className="sm:inline-flex justify-between w-full space-y-4 sm:space-y-1 items-center">

            <div>
                <div>
                    © Cubusfera
                </div>

                <div className='opacity-60 flex items-center space-x-2 mt-auto text-sm underline'>
                    <a href="https://cubusfera.com/terminos">Términos y condiciones</a>
                        </div>
            </div>

            <div className="sm:text-right">
                <div>No somos un servicio oficial de Minecraft</div>
                <div>No aprobados o asociados con Mojang o Microsoft</div>
            </div>
        </div>
        </div>
    )
}