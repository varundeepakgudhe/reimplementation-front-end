import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import useAPI from "../../hooks/use-api";
import { AddUserIcon } from "../UI/Icons";
import Table from "../UI/Table/Table";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import { USER_COLUMNS } from "./userColumns";

const Users = () => {
  const {
    error,
    isLoading,
    data: userData,
    setData: setUserData,
    sendRequest: fetchUsers,
  } = useAPI();

  const [message, setMessage] = useState({ error: false, text: "" });
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState({
    visible: false,
    data: {},
  });

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState({
    visible: false,
    data: {},
  });

  useEffect(() => fetchUsers({ url: "/users", method: "get" }), [fetchUsers]);

  // Clear the message after 5 second
  useEffect(() => {
    const timer = setTimeout(
      () => setMessage({ error: false, text: "" }),
      5000
    );
    return () => clearTimeout(timer);
  }, [message.error, message.text]);

  const onCreateUserHandler = useCallback(
    (user) => {
      if (user && user.name) {
        console.log(user);
        setUserData((prevData) => [...prevData, user]);
        setMessage({
          error: false,
          text: `User ${user.name} created successfully!`,
        });
      }
      setShowCreate(false);
    },
    [setUserData]
  );

  const onUpdateUserHandler = useCallback(
    (updatedUser) => {
      if (updatedUser && updatedUser.name !== undefined) {
        setUserData((prevData) => [
          ...prevData.filter((user) => user.id !== updatedUser.id),
          updatedUser,
        ]);
        setMessage({
          error: false,
          text: `User ${updatedUser.name} updated successfully!`,
        });
      }
      setShowUpdate({ visible: false, data: {} });
    },
    [setUserData]
  );

  const onDeleteUserHandler = useCallback(
    (id, name, message) => {
      if (message) {
        setUserData((prevData) => {
          return prevData.filter((user) => user.id !== id);
        });
        setMessage({
          error: false,
          text: `User ${name} deleted successfully!`,
        });
      }
      setShowDeleteConfirmation({ visible: false, data: {} });
    },
    [setUserData]
  );

  const onEditHandle = (row) =>
    setShowUpdate({ visible: true, data: row.original });
  const onDeleteHandle = (row) =>
    setShowDeleteConfirmation({ visible: true, data: row.original });

  const tableColumns = useMemo(
    () => USER_COLUMNS(onDeleteHandle, onEditHandle),
    []
  );
  const tableData = useMemo(
    () => (isLoading ? [] : userData),
    [userData, isLoading]
  );
  const initialState = { hiddenColumns: ["id", "institution"] };

  return (
    <Container fluid className="px-md-4">
      <Row className="mt-md-2 mb-md-2">
        <Col md={{ span: 4, offset: 4 }}>
          <h1>Manage Users</h1>
        </Col>
        {error && <p className="text-danger">{error}</p>}
        <hr />
      </Row>
      <Row>
        <Col md={{ span: 1, offset: 11 }}>
          <Button
            variant="outline-secondary"
            onClick={() => setShowCreate(true)}
          >
            <AddUserIcon width="24" height="24" />
          </Button>
        </Col>
        {showCreate && <CreateUser onClose={onCreateUserHandler} />}
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
