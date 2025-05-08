'use client'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const AddDocumentBtn = ( {userId,email}: AddDocumentBtnProps ) => {

    const addDocumentHandler = async ()=>{
        
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