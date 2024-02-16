import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { auth } from "@clerk/nextjs";

export async function GET(req: Request, res: Response){
    const {userId} = auth();
    if(!userId){
        return new Response(JSON.stringify({message: "unauthorized"}), {status:401});
    }
    try {
        const data = await prisma.post.findMany();
        return new Response(JSON.stringify(data), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({message: "Internal server error"}), {status: 500});
    }
}