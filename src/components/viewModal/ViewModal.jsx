import { useContext } from "react";
import { Modal } from "antd";
import { ModalContext } from "../../context/Context";

function ViewModal() {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default ViewModal;
