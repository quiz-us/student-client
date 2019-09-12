import shuffle from '../../util/shuffle';

export default (responses, questions) => {
  const answeredQuestions = {};
  let numCorrectResponses = 0;
  responses.forEach(({ questionId, mcCorrect, selfGrade }) => {
    if (mcCorrect !== null) {
      // when it's mc question
      answeredQuestions[questionId] = mcCorrect;
    } else if (selfGrade !== null) {
      // when it's free response question
      answeredQuestions[questionId] = selfGrade >= 4 ? true : false;
    }

    if (mcCorrect || selfGrade >= 4) {
      numCorrectResponses += 1;
    }
  });

  // find the first question that had not already been answered:
  let currentQuestion = questions.find(({ id }) => {
    // first select questions that have not been answered (ie. undefined)
    return answeredQuestions[id] === undefined;
  });

  if (!currentQuestion) {
    const questionsDup = [...questions];
    currentQuestion = shuffle(questionsDup).find(({ id }) => {
      // then, select questions that were answered incorrectly
      return answeredQuestions[id] === false;
    });
  }

  return {
    numCorrectResponses,
    currentQuestion
  };
};
