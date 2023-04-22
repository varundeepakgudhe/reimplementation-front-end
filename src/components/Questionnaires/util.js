// export const emailOptions = [
//   {label: "When someone else reviews my work", value: "email_on_review"},
//   {
//     label: "When someone else submits work I am assigned to review",
//     value: "True",
//   }
// ];


// export const transformTypesResponse = (types) => {
//   let typesData = [{key: "Select a Questionnaire type", value: ""}];
//   types = JSON.parse(types);
//   typesData = typesData.concat(
//     types.map((type) => ({
//       key: type.name,
//       value: type.id,
//     }))
//   );
//   return typesData;
// };


export const q_private = [
  {label: "True"},

];

export const QUESTIONNAIRE_TYPES = [
  'ReviewQuestionnaire',
  'MetareviewQuestionnaire',
  'Author FeedbackQuestionnaire',
  'AuthorFeedbackQuestionnaire',
  'Teammate ReviewQuestionnaire',
  'TeammateReviewQuestionnaire',
  'SurveyQuestionnaire',
  'AssignmentSurveyQuestionnaire',
  'Assignment SurveyQuestionnaire',
  'Global SurveyQuestionnaire',
  'GlobalSurveyQuestionnaire',
  'Course SurveyQuestionnaire',
  'CourseSurveyQuestionnaire',
  'Bookmark RatingQuestionnaire',
  'BookmarkRatingQuestionnaire',
  'QuizQuestionnaire',
];

export const questionnaireTypesOptions = QUESTIONNAIRE_TYPES.map((type) => ({
  label: type,
  value: type.replace(/ /g, ''), 
  // This will remove spaces from the value, but even though we are getting error
}));


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
