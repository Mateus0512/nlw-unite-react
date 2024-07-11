import { Activity, CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Activities(){
    interface Activity {
        date: string,
        activities: 
        {
          id: string,
          title: string,
          occurs_at: string
        }[]
    }

    const {tripId} = useParams();
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(()=>{
        api.get(`/trips/${tripId}/activities`).then(response=> setActivities(response.data.activities))
    },[tripId]);
    return(
        <div className="space-y-8 ">
            {activities.map(categoty=>{
                return(
                    <div key={categoty.date} className="space-y-2.5 ">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-xl text-zinc-300 font-semibold">{format(categoty.date, 'd')}</span>
                            <span className="text-xs text-zinc-500">{format(categoty.date, 'EEEE', {locale: ptBR})}</span>
                        </div>
                        {categoty.activities.length>0 
                        ? 
                        <div className="space-y-2.5 ">
                            {categoty.activities.map(activity =>{
                                return(
                                    <div key={activity.id} className="space-y-2.5">
                                        <div className="px-4 py-2.5 bg-zinc-900 rounded-lg shadow-shape flex items-center gap-3">
                                            <CircleCheck className="size-5 text-lime-300 " />
                                            <span className="text-zinc-100 ">{activity.title}</span>
                                            <span className="text-zinc-400 text-sm ml-auto">{format(activity.occurs_at, 'HH:mm')}h</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        :<p className="text-zinc-500 text-sm">Nenhuma atidade cadastrada nessa data.</p>
                        }
                        
                    </div>
                )
            })}


        </div>
    )
}