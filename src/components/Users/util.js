export const emailOptions = [
  {label: "When someone else reviews my work", value: "email_on_review"},
  {
    label: "When someone else submits work I am assigned to review",
    value: "email_on_submission",
  },
  {
    label: "When someone else reviews one of my reviews (meta-reviews my work)",
    value: "email_on_review_of_review",
  },
];

export const transformInstitutionsResponse = (institutions) => {
  let institutionsData = [{key: "Select an Institution", value: ""}];
  institutions = JSON.parse(institutions);
  institutionsData = institutionsData.concat(
    institutions.map((institution) => ({
      key: institution.name,
      value: institution.id,
    }))
  );
  return institutionsData;
};

export const transformRolesResponse = (roles) => {
  let rolesData = [{key: "Select a Role", value: ""}];
  roles = JSON.parse(roles);
  rolesData = rolesData.concat(
    roles.map((role) => ({
      key: role.name,
      value: role.id,
    }))
  );
  return rolesData;
};

export const transformUserRequest = (values, headers) => {
  console.log("transformUserRequest", values, headers);
  const user = {
    name: values.name,
    email: values.email,
    fullname: values.lastName + ", " + values.firstName,
    role_id: values.role,
    institution_id: values.institution,
    parent_id: values.parent,
    email_on_review: values.emailPreferences.includes("email_on_review"),
    email_on_submission: values.emailPreferences.includes(
      "email_on_submission"
    ),
    email_on_review_of_review: values.emailPreferences.includes(
      "email_on_review_of_review"
    ),
  };
  return JSON.stringify(user);
};
