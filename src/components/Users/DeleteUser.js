import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useAPI from "../../hooks/use-api";

const DeleteUser = ({ userData, onClose }) => {
  const {
    data: deletedUser,
    error: userError,
    sendRequest: deleteUser,
  } = useAPI();
  const [show, setShow] = useState(true);

  const deleteHandler = () =>
    deleteUser({ url: `/users/${userData.id}`, method: "DELETE" });

  useEffect(() => {
    if (deletedUser.length > 0) {
      console.log("user deleted");
      setShow(false);
      onClose(deletedUser[0]);
    }
  }, [deletedUser, onClose]);

  const closeHandler = () => {
    setShow(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userError && <p className="text-danger">{userError}</p>}
        <p>
          Are you sure you want to delete user <b>{userData.name}?</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={closeHandler}>
          Cancel
        </Button>
        <Button variant="outline-danger" onClick={deleteHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUser;
