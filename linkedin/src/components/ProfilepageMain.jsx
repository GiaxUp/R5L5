/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Col, Card, Row, Button, Form, Modal, Spinner } from "react-bootstrap";
import { HiPlus, HiOutlinePencil } from "react-icons/hi";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { fetchUser } from "../redux/actions/index";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Informazioni from "./Informazioni";
import UpdatePropic from "../components/UpdatePropic";
import "./style/profile.css";

const UserProfile = () => {
  // Modali
  const [lgShow, setLgShow] = useState(false);
  const handleShow = () => setLgShow(true);
  // Dispatch per ottenere info utenti e del profilo
  const dispatch = useDispatch();
  const profileStore = useSelector((state) => state.contentUsers);
  const params = useParams();
  // Loaders
  const isLoading = useSelector((state) => state.isLoading);
  // State per fetch PUT per aggiornare nome e cognome
  const [profileData, setProfileData] = useState({
    name: "",
    surname: "",
  });

  // Dispatch per ottenere info utenti e del profilo
  useEffect(() => {
    dispatch(fetchUser(params.userId));
  }, [params.userId]);

  // Eventi onClick per gestire modifica di nome e cognome
  const handleNameChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      name: value,
    });
  };
  const handleSurnameChange = (event) => {
    const { surname, value } = event.target;
    setProfileData({
      ...profileData,
      surname: value,
    });
  };

  // Fetch PUT per modificare nome e cognome nel modale del profilo
  const handleSave = () => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/", {
      method: "PUT",
      body: JSON.stringify(profileData),
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        if (response.ok) {
          dispatch(fetchUser("me"));

          setLgShow(false);
        } else {
          alert("An error occurred while updating the profile");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* Profile section */}
      <Card>
        <Container>
          {isLoading && <Spinner animation="border" variant="primary" className="my-2" />}
          <Row className="p-background mt-1">
            <img src="https://i.postimg.cc/g2y3NY9M/ghandi.png" alt="ghandi-mio-padre" />
          </Row>
          <div className="profile ml-1">
            <img className="img-fluid fotoUser" src={profileStore.image} alt="userimage" />
          </div>
          <Row>
            <Col className="userdetail" xs={12} md={8}>
              <h4 className="name mb-0">
                {profileStore.name} {profileStore.surname}
              </h4>
              <p className="my-0 occupation">{profileStore.title}</p>
              <div className="d-flex align-items-center">
                <p className="my-0 me-1 location text-muted ">{profileStore.area} • </p>
                <span className="fw-bold text-primary ">Informazioni di contatto</span>
              </div>
              <p className="my-2 connections">580 follower - 951 collegamenti</p>
              <div className="d-flex justify-content-start w-100 mb-3">
                <Button className="text-nowrap my-4">Disponibile per</Button>
                <Button variant="outline-primary" className="mx-3 my-4 text-nowrap">
                  Aggiungi sezione profilo
                </Button>
                <Button variant="outline-secondary" className="text-nowrap my-4">
                  Altro
                </Button>
                <div className="d-flex justify-content-start w-100 mb-3">
                  <UpdatePropic />
                </div>
              </div>
            </Col>
            <Col className="d-flex flex-column-reverse justify-content-end">
              <Col xs={12} md={4} className="d-flex justify-content-between h-auto">
                <img
                  src="https://join.epicode.com/wp-content/uploads/2022/03/epicode-logo-14.png"
                  alt=""
                  style={{ width: "6em" }}
                  className="me-2 mb-1"
                />
              </Col>
              <Button
                className="align-self-end m-3 rounded-circle"
                variant="transparent"
                onClick={handleShow}
                id="buttonModal-profile">
                <HiOutlinePencil className="fs-5" />
              </Button>
              {/* Modale per la modifica del profilo */}
              <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                  <Modal.Title>Edit your profile info</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-profile">
                  <p className="textColor-modal">* modificabili in questo modale (il resto è placeholder)</p>
                  <Form.Group className="mb-3">
                    <Form.Label className="textColor-modal">Nome *</Form.Label>
                    <Form.Control type="text" autoFocus defaultValue={profileStore.name} onChange={handleNameChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="textColor-modal">Cognome *</Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      defaultValue={profileStore.surname}
                      onChange={handleSurnameChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="textColor-modal">Nome aggiuntivo</Form.Label>
                    <Form.Control type="text" autoFocus />
                  </Form.Group>
                  <p className="textColor-modal">Pronuncia del nome</p>
                  <p className="textColor-modal">
                    <BsFillInfoSquareFill className="me-2" />
                    Può essere aggiunta solo usando la nostra app per dispositivi mobili
                  </p>
                  <Form.Group className="mb-3">
                    <Form.Label className="textColor-modal">Inserisci pronomi personalizzati</Form.Label>
                    <Form.Control type="text" autoFocus />
                    <Form.Label className="textColor-modal">
                      Indica i pronomi di genere che vuoi che gli altri usino per riferirsi a te
                    </Form.Label>
                  </Form.Group>
                  <p className="textColor-modal">
                    Scopri di più sui <strong>pronomi di genere.</strong>
                  </p>
                  <Form.Group className="mb-3">
                    <Form.Label className="textColor-modal">Sommario</Form.Label>
                    <Form.Control type="text" autoFocus />
                  </Form.Group>
                  <h4>Posizione attuale</h4>
                  <Link className="text-decoration-none fs-6 fw-semibold">
                    <p>
                      <HiPlus /> Aggiungi posizione lavorativa
                    </p>
                  </Link>
                  <Form.Group className="mb-3">
                    <Form.Label className="textColor-modal">Settore</Form.Label>
                    <Form.Control type="text" autoFocus />
                    <Form.Label className="textColor-modal">
                      Scopri di più sulle
                      <strong>opzioni relative al settore</strong>
                    </Form.Label>
                  </Form.Group>
                  <h4>Formazione</h4>
                  <Link className="text-decoration-none fs-6 fw-semibold">
                    <p>
                      <HiPlus /> Aggiungi un nuovo grado di formazione
                    </p>
                  </Link>
                  <h4>Località</h4>
                  <Form.Group className="mb-3">
                    <Form.Label className="textColor-modal">Paese/Area geografica</Form.Label>
                    <Form.Control type="text" autoFocus />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="textColor-modal">CAP </Form.Label>
                    <Form.Control type="text" autoFocus />
                  </Form.Group>
                  <h4>Informazioni di contatto</h4>
                  <p>Aggiungi o modifica il tuo profilo URL, indirizzo email e altro</p>
                  <Link className="text-decoration-none fs-6 fw-semibold">Modifica le informazioni di contatto</Link>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" className="rounded-pill fw-semibold px-3" onClick={handleSave}>
                    Salva
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Container>
      </Card>
      {/* Box informazioni */}
      <Informazioni />
    </>
  );
};
export default UserProfile;
