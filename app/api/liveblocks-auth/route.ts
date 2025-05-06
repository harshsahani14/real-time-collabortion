import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { redirect } from "next/navigation";

const liveblocks = new Liveblocks({
  secret: "sk_dev_Kz8cWEse-18clwuddmLnnzPtyiuurHuzJmOIG1U40cyDxBtL6OxBIjl23TSHZz5-",
});

export async function POST(request: Request) {

    const clerkUser = await currentUser();
  // Get the current user from your database

  if(!clerkUser) redirect('/sign-up')

   
  const user = __getUserFromDB__(request);

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.id,
    { userInfo: user.metadata } // Optional
  );

  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group
  session.allow(`${user.organization}:*`, session.READ_ACCESS);
  session.allow(`${user.organization}:${user.group}:*`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}