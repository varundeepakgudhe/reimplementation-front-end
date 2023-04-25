export const QUESTIONNAIRE_TYPES = ['',
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
  'QuizQuestionnaire'
];

export const questionnaireTypesOptions = QUESTIONNAIRE_TYPES.map((type) => ({
  key: type,
  value: type
}));

export const transformInstructorResponse = (instructor) => {
  let instructorData = [{key: "Select a Role", value: ""}];
  instructor = JSON.parse(instructor);
  instructorData = instructorData.concat(
    instructor.map((role) => ({
      key: role.name,
      value: role.id,
    }))
  );
  return instructorData;
};

export const transformQuestionnaireRequest = (values, headers) => {
  console.log("transformQuestionnaireRequest", values, headers);
  const questionnaire = {
    name: values.name,
    instructor_id: values.instructor_id,
    updated_at: values.updated_at,
    min_question_score: values.min_question_score,
    max_question_score: values.max_question_score,
    is_private: values.private,
    type: values.type
  };
  return JSON.stringify(questionnaire);
};
