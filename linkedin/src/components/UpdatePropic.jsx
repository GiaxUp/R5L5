import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/actions";
import "./style/profile.css";

function UpdatePropic({ userId }) {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/picture`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: process.env.REACT_APP_API_KEY,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(fetchUser("me"));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        variant="outline-primary"
        className="addPropButt mx-3 my-4"
      >
        <BiEdit className="me-2" />
        Aggiorna Propic
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiorna Propic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdatePropic;
