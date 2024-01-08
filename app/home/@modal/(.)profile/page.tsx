import { getCurrentUser } from "@/app/actions/getCurrentUser";
import Modal from "@/components/modal/modals";
import ProfileModal from "@/components/modal/profile-modal";
import { Department } from "@prisma/client";

const Profile = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return (
      <Modal isOpen={true} className="w-2/3 p-10">
        <ProfileModal currentUser={currentUser?.profile} />
      </Modal>
    );
  } else {
    return (
      <Modal isOpen={true} className="w-2/3 p-10">
        <h1>Noting More </h1>
      </Modal>
    );
  }
};

export default Profile;
