import { Lexend } from "next/font/google";
const lexend = Lexend({ subsets: ['latin'] })
export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
            <body className={`${lexend.className}`}>
                <main>{children}</main>
            </body>
    );
}