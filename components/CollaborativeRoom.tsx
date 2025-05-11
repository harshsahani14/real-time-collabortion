'use client'
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React, { ReactNode, useRef, useState } from 'react'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Loader from './Loader'
import ActiveCollaborators from './ActiveCollaborators'
import { Input } from './ui/input'
import Image from 'next/image'

const CollaborativeRoom = ( { roomId,roomMetadata} : CollaborativeRoomProps  ) => {

  const currentUserType = "editor"

  const [title,setTitle] = useState(roomMetadata.title)
  const [editing,setEditing] = useState(false);
  const [loading,setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    
  }

  return (
    <div>
        <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<Loader/>}>
          
        <Header>

          <div ref={containerRef} className=' flex w-fit items-center justify-center gap-2 '>
          {
            editing && !loading ? (
              <Input
                type='text'
                value={title}
                placeholder='Enter document title'
                ref={inputRef}     
                className='document-title-input'
                onChange={(e)=> setTitle(e.target.value) }  
                disabled={!editing}     
                onKeyDown={updateTitleHandler}  
              />
            ) : (
              <>
                <p>{title}</p>
              </>
            )
          }

          { currentUserType === 'editor' && !editing &&
          
          (<Image
            src={'/assets/icons/edit.svg'}
            alt='edit'
            height={24}
            width={24}
            onClick={()=> setEditing(true)}
            className='pointer'
          />

          )
        }

        { currentUserType !== 'editor' && !editing &&
          
          (<p className='view-only-tag'>View only</p>)
        }

        { loading && (<p className='text-sm text-gray-400'>Saving...</p>)
        }

          </div>
          <div  className='flex flex-1 w-full items-center gap-2 justify-end sm:gap-3'>
            <ActiveCollaborators/>
          
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Header>
        <Editor/>
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  )
}

export default CollaborativeRoom