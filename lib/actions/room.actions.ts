'use server';

import { nanoid } from 'nanoid'
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { json } from 'stream/consumers';
import { parseStringify } from '../utils';


export const createDocument = async ( {userId,email}:CreateDocumentParams)=>{

    const roomId = nanoid();

    try{

        const metadata = {
            creatorId:userId,
            email:email,
            title:'Untitled'
        }
        const usersAccesses : RoomAccesses = {
            [email] : ['room:write']
        }

        const room = await liveblocks.createRoom(roomId, 
            {
                metadata,
                usersAccesses,
                defaultAccesses:[]
            }
        );

        revalidatePath('/')

        return parseStringify(room)
    }
    catch(error){
        console.log(` Error while creating a room, ${error}`)
    }

} 

export const getDocument = async ( {roomId,userId}:{ roomId:string;userId:string} )=>{

    try{

        const room =  await liveblocks.getRoom(roomId);

        // const hasAccess = Object.keys(room).includes(userId);

        // if(!hasAccess) return new Error('The user has no access to the document')

            
        return parseStringify(room);
    }
    catch(error){
        console.log(error)
    }
}