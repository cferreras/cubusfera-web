import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Title(props: { title: string, subtitle: string }) {
    return (
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-black dark:to-gray-900 rounded-none border-0 mb-8">
            <CardHeader className="text-center py-20">
                <CardTitle className="text-5xl font-bold text-white dark:text-gray-100">
                    {props.title}
                </CardTitle>
                <CardDescription className="text-2xl text-gray-200 dark:text-gray-300">
                    {props.subtitle}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}