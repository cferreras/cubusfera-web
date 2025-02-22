import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TooltipContent, Tooltip, TooltipTrigger } from "./ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Skeleton } from "./ui/skeleton";
import EditBio from "./EditBio";
import { Button } from "./ui/button";

export default function ProfileTitle(props: {
    tooltip: string;
    title: string;
    rank: string;
    avatar?: string;
    editBio?: {
        id: string;
        bio: string;
        setbio: (bio: string) => void;
        discord: string;
        setDiscord: (discord: string) => void;
        twitter: string;
        setTwitter: (twitter: string) => void;
        instagram: string;
        setInstagram: (instagram: string) => void;
        youtube: string;
        setYoutube: (youtube: string) => void;
        location: string;
        setLocation: (location: string) => void;
    };
}) {
    return (
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-black dark:to-gray-900 rounded-none border-0 mb-8">
            <CardHeader className="container max-w-7xl text-left space-y-2 py-20">
                <div className="flex flex-col text-center justify-center self-center align-middle">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar className="h-32 w-32 mx-auto border-4 border-white">
                                    <AvatarImage
                                        src={`https://mc-heads.net/avatar/${props.tooltip}/64`}
                                        alt={`Avatar de ${props.tooltip}`}
                                    />
                                    <AvatarFallback>{props.tooltip[0]}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <div>{props.tooltip}</div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="flex flex-col justify-between py-2">
                        <CardTitle className="text-3xl font-medium capitalize text-white h-12 min-w-52">
                            {!props.title ? <Skeleton className="w-32 h-8 mx-auto" /> : props.title}
                        </CardTitle>
                        <div className="text-md  text-white max-w-64 pb-2">
                            {props.rank} en Cubusfera desde el <span>1 de enero de 2023</span>.
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {props.editBio && <EditBio
                            userId={props.editBio.id ?? ""}
                            currentBio={props.editBio.bio}
                            onUpdateBio={props.editBio.setbio}
                            discord={props.editBio.discord}
                            onUpdateDiscord={props.editBio.setDiscord}
                            twitter={props.editBio.twitter}
                            onUpdateTwitter={props.editBio.setTwitter}
                            instagram={props.editBio.instagram}
                            onUpdateInstagram={props.editBio.setInstagram}
                            youtube={props.editBio.youtube}
                            onUpdateYoutube={props.editBio.setYoutube}
                            location={props.editBio.location}
                            onUpdateLocation={props.editBio.setLocation}
                        />}
                        {props.editBio && <Button variant="secondary">
                            Ver perfil publico
                        </Button>}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}