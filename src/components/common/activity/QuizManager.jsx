import useQuizNavigator from "@/hooks/useQuizNavigator";

export default function QuizManager({ quizObj, renderQuiz }) {
  const { quizId, goToNextQuiz, goToPrevQuiz } = useQuizNavigator(quizObj);

  // 현재 퀴즈 순서 배열
  const quizOrder = quizObj.quizOrder;

  // 현재 인덱스 구하기
  const currentIndex = quizOrder.indexOf(quizId);

  return (
    <div>
      {/* quizMap에서 현재 quizId에 해당하는 퀴즈 데이터 전달 */}
      {renderQuiz(quizObj.quizMap[quizId], quizId)}

      <button
        onClick={goToPrevQuiz}
        disabled={currentIndex === 0}
        style={{ position: "fixed", bottom: "20px", left: "15%", zIndex: 1000 }}
      >
        이전 퀴즈
      </button>

      <button
        onClick={goToNextQuiz}
        disabled={currentIndex === quizOrder.length - 1}
        style={{ position: "fixed", bottom: "20px", left: "20%", zIndex: 1000 }}
      >
        다음 퀴즈
      </button>
    </div>
  );
}
