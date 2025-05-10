'use client'
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React, { ReactNode } from 'react'
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

const CollaborativeRoom = () => {
  return (
    <div>
        <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<Loader/>}>
          
        <Header>
          <div className='flex flex-1 w-full items-center gap-2 justify-end sm:gap-3'>
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