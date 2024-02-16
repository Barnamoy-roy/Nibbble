import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request, {params}:{params: {id: string}}){
    const postId = params.id;
    const body = await req.json();
    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title: body.newTitle,
                desc: body.newDescription
            }
        })
        return new Response(JSON.stringify({updatedPost: updatedPost}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({error: error}), ({status: 500}))
    }
}
