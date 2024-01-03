import { UserPanel } from "@/components/user-panel";
import { getOtherUsers } from "../actions/getOtherUser";
import { getZutos } from "../actions/getZutos";
import { IZudo } from "@/components/zudo";
import { getUserById } from "../actions/getCurrentUser";

const Home = async () => {
  const otherUsers = await getOtherUsers();
  const zutos = await getZutos();
  //! ness: recipient profile and zuto

  return (
    <div className="h-full flex">
      <UserPanel users={otherUsers} />
      <div className="flex-1 flex flex-col">
        {JSON.stringify(zutos)}
        <div className="w-full p-10 flex flex-col gap-y-4">
          {zutos?.map((zuto) => (
            <div>{zuto.message}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
