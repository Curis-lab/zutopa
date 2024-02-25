const ZudoPage = ({ params: { user } }: { params: { user: string } }) => {
  return <div>{user}</div>;
};

export default ZudoPage;
// =======
// import { getUserByParams } from "@/app/actions/getCurrentUser";
// import Modal from "@/components/modal/modals";
// import ZutoModal from "@/components/modal/zudo-modal";

// const MakeZudo = async ({params:{user: userId}}:{params:{user:string}}) => {
//   const recipient = await getUserByParams(userId);
//   return (
//     <Modal isOpen={true} className="w-2/3 p-10">
//       <ZutoModal recipient={recipient} />
//     </Modal>
//   );
// };

// export default MakeZudo;
// >>>>>>> dev
