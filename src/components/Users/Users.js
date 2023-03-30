import {useCallback, useEffect, useMemo, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";
import {AddUserIcon} from "../UI/Icons";
import Table from "../UI/Table/Table";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import {USER_COLUMNS} from "./userColumns";

const Users = () => {
  const dispatch = useDispatch();
  const {
    error,
    isLoading,
    data: userData,
    setData: setUserData,
    sendRequest: fetchUsers,
  } = useAPI();

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState({
    visible: false,
    data: {},
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState({
    visible: false,
    data: {},
  });

  useEffect(() => fetchUsers({url: "/users", method: "get"}), [fetchUsers]);

  // Error alert
  useEffect(() => {
    if (error) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: error
      }));
    }
  }, [error, dispatch]);

  const onCreateUserHandler = useCallback(
    (user) => {
      if (user && user.name) {
        console.log(user);
        setUserData((prevData) => [...prevData, user]);
        dispatch(alertActions.showAlert({
          variant: "success",
          message: `User ${user.name} created successfully!`
        }));
      }
      setShowCreate(false);
    },
    [setUserData, dispatch]
  );

  const onUpdateUserHandler = useCallback(
    (updatedUser) => {
      if (updatedUser && updatedUser.name !== undefined) {
        setUserData((prevData) => [
          ...prevData.filter((user) => user.id !== updatedUser.id),
          updatedUser,
        ]);
        dispatch(alertActions.showAlert({
          variant: "success",
          message: `User ${updatedUser.name} updated successfully!`
        }));
      }
      setShowUpdate({visible: false, data: {}});
    },
    [setUserData, dispatch]
  );

  const onDeleteUserHandler = useCallback(
    (id, name, status) => {
      if (status) {
        setUserData((prevData) => {
          return prevData.filter((user) => user.id !== id);
        });
        dispatch(alertActions.showAlert({
          variant: "success",
          message: `User ${name} deleted successfully!`
        }));
      }
      setShowDeleteConfirmation({visible: false, data: {}});
    },
    [setUserData, dispatch]
  );

  const onEditHandle = (row) =>
    setShowUpdate({visible: true, data: row.original});
  const onDeleteHandle = (row) =>
    setShowDeleteConfirmation({visible: true, data: row.original});

  const tableColumns = useMemo(
    () => USER_COLUMNS(onDeleteHandle, onEditHandle),
    []
  );
  const tableData = useMemo(
    () => (isLoading ? [] : userData),
    [userData, isLoading]
  );
  const initialState = {hiddenColumns: ["id", "institution"]};

  return (
    <Container fluid className="px-md-4">
      <Row className="mt-md-2 mb-md-2">
        <Col md={{span: 4, offset: 4}}>
          <h1>Manage Users</h1>
        </Col>
        <hr/>
      </Row>
      <Row>
        <Col md={{span: 1, offset: 11}}>
          <Button
            variant="outline-secondary"
            onClick={() => setShowCreate(true)}
          >
            <AddUserIcon width="24" height="24"/>
          </Button>
        </Col>
        {showCreate && <CreateUser onClose={onCreateUserHandler}/>}
        {showUpdate.visible && (
          <UpdateUser
            userData={showUpdate.data}
            onClose={onUpdateUserHandler}
          />
        )}
        {showDeleteConfirmation.visible && (
          <DeleteUser
            userData={showDeleteConfirmation.data}
            onClose={onDeleteUserHandler.bind(
              null,
              showDeleteConfirmation.data.id,
              showDeleteConfirmation.data.name
            )}
          />
        )}
      </Row>
      <Row>
        <Table
          data={tableData}
          columns={tableColumns}
          initialState={initialState}
        />
      </Row>
    </Container>
  );
};

export default Users;
