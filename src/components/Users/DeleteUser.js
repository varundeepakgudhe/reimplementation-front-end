import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";

const DeleteUser = ({userData, onClose}) => {
  const dispatch = useDispatch();
  const {
    data: deletedUser,
    error: userError,
    sendRequest: deleteUser,
  } = useAPI();
  const [show, setShow] = useState(true);

  const deleteHandler = () =>
    deleteUser({url: `/users/${userData.id}`, method: "DELETE"});

  useEffect(() => {
    if (userError) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: userError,
      }));
    }
  }, [userError, dispatch]);

  useEffect(() => {
    if (deletedUser.length > 0) {
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
