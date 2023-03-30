import React from "react";

export const EditIcon = () => {
  return (
    <img src={process.env.PUBLIC_URL + "/assets/icons/pencil.svg"} alt="edit" />
  );
};

export const RemoveUserIcon = () => {
  return (
    <img
      src={process.env.PUBLIC_URL + "/assets/icons/user-remove.svg"}
      alt="remove"
    />
  );
};

export const AddUserIcon = () => {
  return (
    <img
      src={process.env.PUBLIC_URL + "/assets/icons/user-add.svg"}
      alt="add"
    />
  );
};
