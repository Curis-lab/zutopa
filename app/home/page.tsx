import { UserPanel } from "@/components/user-panel";
import { getAllUser, getOtherUsers } from "../actions/getOtherUser";
import { getZutos } from "../actions/getZutos";
import { getCompatableResource } from "../actions/getCompatibleResource";
import Zudo from "@/components/zudo";
import SearchBar from "@/components/search-bar";

const Home = async () => {
  const otherUsers = await getOtherUsers();

  const zutos = await getZutos();
  const users = await getAllUser();

  const g = getCompatableResource(zutos, users);
  return (
    <div className="h-full flex">
      <UserPanel users={otherUsers} />
      <div className="flex-1 flex flex-col">
        <SearchBar/>
        <div className="w-full p-10 flex flex-col gap-y-4">
          {g && g.map((g) => <Zudo profile={g.profile} zuto={g.zuto} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
