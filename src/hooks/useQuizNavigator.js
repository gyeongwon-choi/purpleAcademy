import { useState } from "react";

// 퀴즈 네비게이션
export default function useQuizNavigator(data) {
  const quizOrder = data.quiz.order;
  const [quizId, setQuizId] = useState(quizOrder[0]);

  const currentIndex = quizOrder.indexOf(quizId);

  const nextQuizId = currentIndex < quizOrder.length - 1 ? quizOrder[currentIndex + 1] : null;

  const prevQuizId = currentIndex > 0 ? quizOrder[currentIndex - 1] : null;

  const goToNextQuiz = () => {
    if (nextQuizId) setQuizId(nextQuizId);
  };

  const goToPrevQuiz = () => {
    if (prevQuizId) setQuizId(prevQuizId);
  };

  const goToQuiz = (id) => {
    if (quizOrder.includes(id)) {
      setQuizId(id);
    }
  };

  return { quizId, goToNextQuiz, goToPrevQuiz, goToQuiz };
}
