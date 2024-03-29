import { getCurrentUser } from "@/actions/getCurrentUser";
import Modal from "@/components/modal/modals";
import ProfileModal from "@/components/modal/profile-modal";

const Profile = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  return (
    <Modal isOpen={true} className="w-2/3 p-10">
      <ProfileModal
        firstName={currentUser.profile.firstName}
        lastName={currentUser.profile.lastName}
        department={currentUser.profile?.department || ""}
        profilePicture={currentUser.profile.profilePicture || ""}
      />
    </Modal>
  );
};

export default Profile;
