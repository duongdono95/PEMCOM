import SignUp from "@/components/Auth/SignUp/SignUp";
import Modal from "@/components/UI/Modal/Modal";
import React from "react";

const page = () => {
  return (
    <Modal>
      <SignUp isModal />
    </Modal>
  );
};

export default page;
