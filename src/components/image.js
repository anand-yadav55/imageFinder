import React, { useState } from "react";
import Modal from "react-modal";
export default function Image(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="ImageBox">
      <img
        className="image"
        onClick={() => setModalIsOpen(true)}
        src={props.src}
        alt={props.title}
      />
      <Modal isOpen={modalIsOpen} className="imageModal">
        <img
          onClick={() => setModalIsOpen(true)}
          src={props.src}
          alt={props.title}
        />
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}
