import { IZudo } from "@/components/zudo";
import { User, Zuto } from "@prisma/client";


//Should implement better algorithm

export const getCompatableResource = (zuto:Zuto[], users:User[]):IZudo[]=>{
    const result:IZudo[] = [];

    zuto.map(i=>{
        users.map(z=>{
            if(i.recipientId == z.id && i.style){
                result.push({
                    profile:z.profile,
                    zuto:{message:i.message, style:i.style}
                })
            }
        }) 
    });
    return result;
}