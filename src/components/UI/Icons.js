import React from "react";

export const EditIcon = () => {
  return (
    <img src={process.env.PUBLIC_URL + "/assets/icons/pencil.svg"}
         alt="edit"
    />
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

export const AddQuestionnaireIcon = () => {
  return (
    <img
      src={process.env.PUBLIC_URL + "/assets/icons/questionnaire-add.png"}
      alt="add"
      width="24px"
      height="24px"
    />
  );
};

export const RemoveQuestionnaireIcon = () => {
  return (
    <img
      src={process.env.PUBLIC_URL + "/assets/icons/questionnaire-remove.png"}
      alt="remove"
      width="16px"
      height="16px"
    />
  );
};

export const InfoIcon = () => {
  return (
    <img
      src={process.env.PUBLIC_URL + "/assets/icons/info.svg"}
      alt="info"
    />
  );
}
