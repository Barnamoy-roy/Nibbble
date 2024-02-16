import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request, {params}:{params: {id: string}}){
    const shotId = params.id;
    try {
        const shot = await prisma.post.findUnique({
            where: {
                id: shotId
            }
        })
        return new Response(JSON.stringify({shot: shot}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({error: error}), ({status: 500}))
    }
}