import { currentUser } from "@clerk/nextjs/server";
import { liveblocks } from "@/lib/liveblocks"
import { redirect } from "next/navigation";
import { getUserColor } from "@/lib/utils";


export async function POST(request: Request) {

    const clerkUser = await currentUser();
  // Get the current user from your database
    if(!clerkUser) redirect('/sign-up')

   const { id,firstName,lastName,emailAddresses,imageUrl  } = clerkUser
    const user = {
    id,
    metadata:{
      id,
      name:`${firstName} ${lastName}` || "",
      email:emailAddresses[0].emailAddress,
      avatar:imageUrl,
      color:getUserColor(id)
    }
  }

  // Start an auth session inside your endpoint
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.metadata.email,
      groupIds:[], // Optional
    },
    { userInfo: user.metadata },
  );

  return new Response(body, { status });
}