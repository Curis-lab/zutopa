import Modal from "@/components/modal/modals";
import ZutoModal from "@/components/modal/zudo-modal";

const MakeZudo = () => {
  //show background as home route
  return (
    <Modal isOpen={true} className="w-2/3 p-10">
      <ZutoModal />
    </Modal>
  );
};

export default MakeZudo;
