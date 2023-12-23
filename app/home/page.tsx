import { UserPanel } from "@/components/user-panel";
import { getOtherUsers } from "../actions/getOtherUser";

const Home = async() => {

  const otherUsers = await getOtherUsers();

  return (
    <div className="h-full">
      <UserPanel users={otherUsers}/>
    </div>
  );
};

export default Home;
