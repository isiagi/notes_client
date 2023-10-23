/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Modal } from "antd";
import { ModalContext } from "../../context/Context";

function ViewModal({ data }) {
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
        title={data[0]?.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{data[0]?.description}</p>
        <p>{data[0]?.completed}</p>
      </Modal>
    </>
  );
}

export default ViewModal;
