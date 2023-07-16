import SignIn from "@/components/Auth/SignIn/SignIn";
import Modal from "@/components/UI/Modal/Modal";
import React from "react";

const page = () => {
  return (
    <Modal>
      <SignIn isModal />
    </Modal>
  );
};

export default page;
