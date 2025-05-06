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

const CollaborativeRoom = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<Loader/>}>
          
        <Header>
          <div>
            {/* Contents like document title will go here and share button will go here */}
          </div>
          <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

        </Header>
        <Editor/>
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  )
}

export default CollaborativeRoom