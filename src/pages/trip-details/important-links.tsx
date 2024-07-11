import { Calendar, Link2, Plus, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";


interface ImportantLinksProps {
    openCreateLinkModal: () => void,
    isCreateLinkModalOpen: boolean,
    closeCreateLinkModal: () => void
    
}

interface Links {
        id: string,
        title: string,
        url: string
}

export function ImportantLinks({openCreateLinkModal, isCreateLinkModalOpen,closeCreateLinkModal}:ImportantLinksProps){
    const {tripId} = useParams();
    const [links, setLinks] = useState<Links[]>([]);

    

    useEffect(()=>{
        api.get(`/trips/${tripId}/links`).then(response=> setLinks(response.data.links))
    },[tripId]);

    async function createLink(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title')?.toString();
        const url = data.get('url')?.toString();

        api.post(`/trips/${tripId}/links`,{
            title,
            url
        });

        window.document.location.reload();
    }

    return(
        <div className="space-y-6 ">
            <h2 className="font-semibold text-xl">Links importantes</h2>
            <div className="space-y-5">

                
                {links.map(link =>{
                    return(
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5 ">
                            <span className="block text-zinc-100 font-medium">{link.title}</span>
                            <a href="#" className="block text-zinc-400 text-xs truncate hover:text-zinc-200">{link.url}</a>
                        </div>
                        <Link2 className="text-zinc-400 size-5 shrink-0" />

                    </div>
                    )
                })}
                

            </div>
            <Button type="button" onClick={openCreateLinkModal} variant="secundary" size="full" ><Plus className="size-5"/> Cadastrar novo link  </Button>



            {isCreateLinkModalOpen &&
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between ">
                    <h2 className="text-lg font-semibold">Cadastrar link</h2>
                    <button type="button" onClick={closeCreateLinkModal}><X className="size-5 text-zinc-400" /></button>
                </div>
                    <p className="text-sm text-zinc-400">Todos convidados podem visualizar os links importantes.</p>
                </div>


                <form onSubmit={createLink} className="space-y-3">

                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Tag className="text-zinc-400 size-4" />
                        <input type="text" name="title" placeholder="Título do link" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                    </div>

                    <div className="h-14 px-4  bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Calendar className="text-zinc-400 size-4" />
                        <input type="text" name="url" placeholder="URL" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                    </div>


                    <Button  variant="primary" size="full" type="submit">Salvar Link</Button>
                </form>


            </div>
            </div>
        }



        </div>

        


    )
}