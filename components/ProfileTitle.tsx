import Tooltip from "./Tooltip";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfileTitle(props: {
    tooltip: string;
    title: string;
    rank: string;
    avatar?: string;
}) {
    return (
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-black dark:to-gray-900 rounded-none border-0 mb-8">

                <CardHeader className="container max-w-7xl text-left space-y-2 py-20">
                    <div className="xl:mx-auto flex space-x-4">
                        <Tooltip text={props.tooltip} position="top">
                            <Avatar className="rounded-lg h-28 w-28">
                                <AvatarImage
                                    src={props.avatar ?? "https://mc-heads.net/avatar/MHF_Steve/112"}
                                    alt={props.title}
                                />
                                <AvatarFallback>{props.title.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Tooltip>
                        <div className="flex flex-col justify-between py-2">
                            <CardTitle className="text-5xl font-medium capitalize text-white">
                                {props.title}
                            </CardTitle>
                            <div>
                                <Badge variant="destructive" className="text-2xl px-3 py-1">
                                    {props.rank}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardHeader>
        </Card>
    );
}