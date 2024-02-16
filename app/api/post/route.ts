import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

import { auth } from "@clerk/nextjs";

export async function POST(req: Request, res: Response){

    try {
        const {userId} = auth();
        if(!userId){
            return new Response(JSON.stringify({message: "unauthorized"}), {status:401});
        }
        const body = await req.json();
        const {title, picture, description, postId} = body;

        const post = await prisma.post.create({
            data: {
                title: title,
                desc: description,
                image: picture,
                userId: userId,
                postId: postId,
            }
        })
        
        return new Response(JSON.stringify({newpost: post}), {status: 200});

    } catch (error) {
        return new Response(JSON.stringify({message: "Internal server error"}), {status: 500});
    }
}