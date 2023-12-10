import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { signIn, signOut } from "next-auth/react";
import { SignOut } from "./auth";

export default async function Home() {

  const session = await getServerSession(authOptions);
  return (
    <div>
      <SignOut/>
      {/* <button onClick={()=>signIn()}>Sign in</button> */}
      {/* <button onClick={()=>signOut()}>Sign Out</button> */}
      {JSON.stringify(session)}</div>
  )
}
