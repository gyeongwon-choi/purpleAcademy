import { useState } from "react";

export default function useQuizNavigator(data) {
  const quizOrder = data.quiz.order; // quizOrder 배열 꺼내기
  const [quizId, setQuizId] = useState(quizOrder[0]); // 초기값 Q1 등 첫 퀴즈 ID

  // 현재 quizId의 인덱스 구하기
  const currentIndex = quizOrder.indexOf(quizId);

  // 다음 퀴즈 ID (없으면 null)
  const nextQuizId = currentIndex < quizOrder.length - 1 ? quizOrder[currentIndex + 1] : null;
  // 이전 퀴즈 ID (없으면 null)
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
