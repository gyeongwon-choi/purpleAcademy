import useQuizNavigator from "@/hooks/useQuizNavigator";

export default function QuizManager({ dataObj, renderQuiz }) {
  const { quizId, goToNextQuiz, goToPrevQuiz } = useQuizNavigator(dataObj);

  // 현재 퀴즈 순서 배열
  const quizOrder = dataObj.quizOrder;

  // 현재 인덱스 구하기
  const currentIndex = quizOrder.indexOf(quizId);

  return (
    <div>
      {/* quizMap에서 현재 quizId에 해당하는 퀴즈 데이터 전달 */}
      {renderQuiz(dataObj.quizMap[quizId], quizId)}

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
