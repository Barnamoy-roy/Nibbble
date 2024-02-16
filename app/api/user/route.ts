import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request, res: Response){
    try {
        const {userId} = auth();
        const {user} = useUser();
        if(!userId){
            return new Response(JSON.stringify({message: "unauthorized"}), {status:401});
        }
    } catch (error) {
        
    }
}