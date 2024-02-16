// prisma 
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(req: Request, {params}:{params: {id: string}}){
    const postId = params.id;
    try {
        const post = await prisma.post.delete({
            where: {
                id: postId
            }
        })
        return new Response(JSON.stringify({deletedPost: post}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({errorOccured: error}), {status: 500})
    }   
}