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
