import { getUserByParams } from "@/app/actions/getCurrentUser";
import Modal from "@/components/modal/modals";
import ZutoModal from "@/components/modal/zudo-modal";

interface IParams {
  user: string;
}

//! should import with different route and upon page

const MakeZudo = async ({ params }: { params: IParams }) => {
  const recipient = await getUserByParams(params);
  return (
    <Modal isOpen={true} className="w-2/3 p-10">
      <ZutoModal recipient={recipient} />
    </Modal>
  );
};

export default MakeZudo;
