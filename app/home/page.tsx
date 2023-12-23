import { UserPanel } from "@/components/user-panel";
import { getOtherUsers } from "../actions/getOtherUser";
import { getUserByEmail } from "../actions/getCurrentUser";

const Home = async() => {

  const user = await getUserByEmail('nyanlin@gmail.com');
  
  console.log(user);

  return (
    <div className="h-full">
      <UserPanel users={[]}/>
    </div>
  );
};

export default Home;
