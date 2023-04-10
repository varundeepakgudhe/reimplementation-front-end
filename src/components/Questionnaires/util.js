export const types = [
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

export const displayTypes = [
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

export const instructors = [
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

export const q_private = [
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

export const transformQuestionnaireRequest = (values, headers) => {
  console.log("transformQuestionnaireRequest", values, headers);
  const questionnaire = {
    name: values.name,
    instructor_id: values.instructor_id,
    min_question_score: values.min_question_score,
    max_question_score: values.min_question_score,
    instruction_loc: values.instruction_loc




  };
  return JSON.stringify(questionnaire);
};
