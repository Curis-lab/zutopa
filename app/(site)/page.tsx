import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signIn, signOut } from "next-auth/react";
import { SignOut } from "../auth";
import { Layout } from "@/components/layout";
import { UserPanel } from "@/components/user-panel";
import { getOtherUsers, getUserByEmail } from "@/libs/user.server";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  // if(session){
    // const getId = await getUserByEmail(session?.user?.email);
  // }
  // const users = await getOtherUsers()
  return (
    <Layout>
      <div className="h-full flex">
        <UserPanel/>
      </div>
      {/* <SignOut /> */}

      {/* <button onClick={()=>signIn()}>Sign in</button> */}
      {/* <button onClick={()=>signOut()}>Sign Out</button> */}
      {/* {JSON.stringify(session)} */}
    </Layout>
  );
}
