

import Modal from "@/components/modal/modals";
import ProfileModal from "@/components/modal/profile-modal";


const Profile = async () => {
  
  return (
    <Modal isOpen={true} className="w-2/3 p-10">
        <ProfileModal/>
    </Modal>
  );
};

export default Profile;
