import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {ArrowUpRight} from "lucide-react"

export default function Rank(props: { title: string, description: string, content: string[] }) {
    return (
        <Card className="md:w-1/3 border">
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="max-h-80 line-clamp-[12]">
                    {props.content.map((content, index) => (
                        <li className="list-disc ml-5 " key={index}>{content}</li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <a href="https://cubusfera.tebex.io/category/1704918" className="w-full bg-indigo-700 hover:bg-indigo-600 flex  text-white py-3 px-6 rounded-lg justify-center gap-4">Ver más <ArrowUpRight /></a>
            </CardFooter>
        </Card>
    )
}