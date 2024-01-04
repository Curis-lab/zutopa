import { UserPanel } from "@/components/user-panel";
import { getOtherUsers } from "../actions/getOtherUser";
import { getFilteredZudos, getZutos} from "../actions/getZutos";
import Zudo from "@/components/zudo";
import { Profile } from "@prisma/client";

const Home = async () => {
  const otherUsers = await getOtherUsers();

  const zutos = await getZutos();


  return (
    <div className="h-full flex">
      <UserPanel users={otherUsers} />
      <div className="flex-1 flex flex-col">
        <div className="w-full p-10 flex flex-col gap-y-4">
          {zutos.map(zuto=>(<div key={zuto.id}>{zuto.message}</div>))}
        </div>
      </div>
    </div>
  );
};

export default Home;
