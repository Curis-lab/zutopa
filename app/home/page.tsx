import { getZutos } from "../actions/getZutos";
import { getCurrentUser } from "../actions/getCurrentUser";
import { getAllUser, getOtherUsers } from "../actions/getOtherUser";
import { getCompatableResource } from "../actions/getCompatibleResource";
import Zudo from "@/components/zudo";
import SearchBar from "@/components/search-bar";
import { UserPanel } from "@/components/user-panel";

const Home = async () => {

  const otherUsers = await getOtherUsers();

  const zutos = await getZutos();
  const users = await getAllUser();

  const currentuser = await getCurrentUser();
  //get restructure of Interface for Zudo
  const g = getCompatableResource(zutos, users);
  
  return (
    <div className="h-full flex">
      <UserPanel users={otherUsers} />
      <div className="flex-1 flex flex-col">
        <SearchBar profile={currentuser?.profile} />
        <div className="w-full p-10 flex flex-col gap-y-4">
          {g && g.map((g) => <Zudo profile={g.profile} zuto={g.zuto} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
