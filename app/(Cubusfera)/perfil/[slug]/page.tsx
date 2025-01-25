"use client"
import Container from "@/components/Container";
import ProfileTitle from "@/components/ProfileTitle";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Perfil() {
    // get params from the URL
    const { slug } = useParams();
    const slugString = Array.isArray(slug) ? slug[0] : slug || "No user session";
    return (<>
        <ProfileTitle title={slugString} rank="Owner" tooltip={slugString} />
        <Container>

            <div className="grid grid-cols-12 gap-8 mt-3">
                <div className="col-span-8 space-y-2">
                    <div className="flex gap-2">
                        <Link href="#" className="text-lg space-x-1 hover:underline"><span className="font-bold">8</span><span className="opacity-75">Amigos</span></Link>
                    </div>
                    <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at nisl nec nunc facilisis ultricies. Donec eget ris
                    </p>

                </div>
                <div className="col-span-4 space-y-2">
                    <div className="flex items-center text-lg opacity-75">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 7.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12" />
                            </svg>
                        </span>
                        <span>España</span>
                    </div>
                    <div className="flex items-center text-lg opacity-75">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M11 14v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zm-4 4v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zM3 22V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5zM5 8h14V6H5zm0 0V6z" />
                            </svg>
                        </span>
                        <span>Se unió en enero de 2025</span>
                    </div>



                </div>
            </div>
        </Container>
    </>
    )
}