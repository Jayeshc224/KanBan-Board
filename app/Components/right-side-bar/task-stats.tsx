import { Separator } from "@/components/ui/separator";


type TaskCard={
    label:string;
    value:number;
}




export default function TaskStats() {

    const statisticsCards:TaskCard[] = [
        {label:"total",value:23},
        {label:"waiting",value:15},
        {label:"in progress",value:8},
        {label:"completed",value:9},
    ]


    return (
        <div className="flex flex-col gap-2">
            <span className="font-bold text-xl">Tasks</span>
            <div className="grid grid-cols-2 gap-3 mt-3">
                {statisticsCards.map((statCard,index)=>(
                    <SingleCard key={index} statCard={statCard} />
                ))}

            </div>
        </div>

        
    );

}

    function SingleCard({statCard}:{statCard:TaskCard}){
        return (
            <div className="p-3 bg-gray-100 dark:bg-black rounded-xl">
                <span className="text-[12px] text-gray-600 dark:text-gray-400">{statCard.label.toUpperCase()}     
                </span>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-1 h-4 bg-primary rounded-full"></div>
                    <span className="text-lg font-bold">{statCard.value}</span>
                </div>
            </div>
        );
    }
