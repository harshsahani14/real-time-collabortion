import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import React from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Document = () => {
  return (
    <div>
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

    </div>
  
  )
}

export default Document