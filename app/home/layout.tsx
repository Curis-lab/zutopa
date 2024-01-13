import { useRouter } from "next/navigation";

export default function HomeLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      {modal}
      {children}
    </div>
  );
}
