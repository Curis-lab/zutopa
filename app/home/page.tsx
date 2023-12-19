import { UserPanel } from "@/components/user-panel";
import { getOtherUsers } from "../actions/getOtherUser";

const Home = async() => {
  const otherUser = await getOtherUsers();

  console.log(otherUser);
  return (
    <div className="h-full">
      <UserPanel users={otherUser || undefined}/>
    </div>
  );
};

export default Home;
