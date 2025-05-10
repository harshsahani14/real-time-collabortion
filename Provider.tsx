"use client"
import React, { ReactNode } from 'react'
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
  } from "@liveblocks/react";
import Loader from './components/Loader';
import { clerkUsers } from './lib/actions/user.actions';


const Provider = ( { children }: { children: ReactNode } ) => {
  return (
    <LiveblocksProvider
    resolveUsers={ ({userIds})=>{

      const users = clerkUsers({userIds});

      return users;
    }}
    authEndpoint={'/api/liveblocks-auth'}>
      <ClientSideSuspense fallback={<Loader/>}>
        {children}
      </ClientSideSuspense>
    
  </LiveblocksProvider>
  )
}

export default Provider