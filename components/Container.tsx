export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-8 xl:mx-auto  px-2 md:px-8 py-5 max-w-6xl mt-40 mb-4 bg-white shadow">
            {children}
        </div>
    )
}