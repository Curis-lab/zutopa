import { Layout } from "@/components/layout";
import { UserPanel } from "@/components/user-panel";

export default async function Home() {
  return (
    <Layout>
      <div className="h-full flex">
        <UserPanel/>
      </div>
    </Layout>
  );
}
