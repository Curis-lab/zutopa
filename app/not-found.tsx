import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="w-screen flex items-center justify-center h-full">
      <div className="flex flex-col justify-center items-center">
        <h1>This screen doesn't exist.</h1>
        <h1 onClick={()=>router.push('/home')} className="hover:text-red-600 cursor-pointer">Go to home screen!</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
