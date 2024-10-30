export default function Title(props: { title: string, subtitle: string }) {
    return (
        <div className="bg-banner bg-no-repeat bg-center bg-cover  px-8 pt-20 pb-28 bg-blend-multiply bg-purple-700 -mb-60">
            <div className='mx-auto container max-w-6xl space-y-2'>
                <h1 className="text-5xl text-white font-bold">
                    {props.title}
                </h1>
                <h2 className="text-2xl text-muted">
                    {props.subtitle}
                </h2>
            </div>
        </div>
    );
}
