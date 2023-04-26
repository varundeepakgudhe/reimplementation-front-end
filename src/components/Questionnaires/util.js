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
    min_item_score: values.min_item_score,
    max_item_score: values.min_item_score,
    private: values.private,
    type: values.type
  };
  return JSON.stringify(questionnaire);
};
