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
  'QuizQuestionnaire'
];

export const questionnaireTypesOptions = QUESTIONNAIRE_TYPES.map((type) => ({
  key: type,
  value: type
}));

export const transformQuestionnaireRequest = (values, headers) => {
  console.log("transformQuestionnaireRequest", values, headers);
  const questionnaire = {
    name: values.name,
    instructor_id: values.instructor,
    min_question_score: values.min_question_score,
    max_question_score: values.min_question_score,
    private: values.private,
    type: values.type
  };
  return JSON.stringify(questionnaire);
};
