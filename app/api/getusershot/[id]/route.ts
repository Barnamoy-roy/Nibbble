import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, {params}:{params: {id: string}}){
    const userId = params.id;
    try {
        const userShots = await prisma.post.findMany({
            where: {
                userId: userId
            }
        })
        return new Response(JSON.stringify({shots: userShots}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({error: error}), ({status: 500}))
    }
}