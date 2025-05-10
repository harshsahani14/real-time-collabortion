'use client'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createDocument } from '@/lib/actions/room.actions'

const AddDocumentBtn = ( {userId,email}: AddDocumentBtnProps ) => {

  const router = useRouter()

    const addDocumentHandler = async ()=>{
        
      try{
        const room = await createDocument({userId,email});

        if(room) router.push(`/documents/${room.id}`)
      }
      catch(error){
        console.log(error)
      }
    }
  return (
    <Button type='submit' className=' gradient-blue shadow-md flex gap-1'  onClick={addDocumentHandler}>
        <Image  
            src="/assets/icons/add.svg"
            alt='Add Button'
            width={24}
            height={24}
        >
            
        </Image>
        <p className='hidden sm:block'>Start a blank documnet</p>
    </Button >
  )
}

export default AddDocumentBtn