import { useRef, useState, useEffect } from "react";
import { gsap } from "@/libs/gsapSetup";

const BOX_COUNT = 5;

// 2줄 배치 계산 (가로 3개, 다음 줄 2개)
const boxPositions = [
	{ x: 50, y: 100 },
	{ x: 220, y: 100 },
	{ x: 390, y: 100 },
	{ x: 110, y: 180 },
	{ x: 280, y: 180 },
];

const pointOffset = { x: 120, y: 20 };

const correctConnections = [
	[0, 1],
	[1, 2],
	[3, 4],
];

export default function DragSampleCanvasGSAP() {
	const containerRef = useRef(null);
	const canvasRef = useRef(null);
	const [lines, setLines] = useState([]);
	const [dragging, setDragging] = useState(false);
	const [startPoint, setStartPoint] = useState(null);
	const [currentPos, setCurrentPos] = useState(null);

	// GSAP 애니메이션용 refs
	const animLineRef = useRef(null);

	const getPointPosition = (idx) => ({
		x: boxPositions[idx].x + pointOffset.x + 10,
		y: boxPositions[idx].y + pointOffset.y + 10,
	});

	const getMousePos = (e) => {
		const rect = canvasRef.current.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};
	};

	const onMouseDown = (idx) => (e) => {
		e.preventDefault();
		setStartPoint(idx);
		setDragging(true);
		setCurrentPos(getPointPosition(idx));

		// GSAP 애니메이션: 점 클릭 시 크기 확대 효과
		gsap.fromTo(
			`.point-${idx}`,
			{ scale: 1 },
			{ scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, transformOrigin: "center" }
		);
	};

	const onMouseMove = (e) => {
		if (!dragging) return;
		setCurrentPos(getMousePos(e));
	};

	const onMouseUp = (e) => {
		if (!dragging) return;
		setDragging(false);

		const mousePos = getMousePos(e);

		let foundIdx = null;
		boxPositions.forEach((pos, idx) => {
			if (idx === startPoint) return;
			const p = getPointPosition(idx);
			const dist = Math.hypot(mousePos.x - p.x, mousePos.y - p.y);
			if (dist < 15) {
				foundIdx = idx;
			}
		});

		if (foundIdx !== null) {
			const isCorrect = correctConnections.some(
				([a, b]) =>
					(a === startPoint && b === foundIdx) ||
					(b === startPoint && a === foundIdx)
			);

			setLines((prev) => [...prev, { from: startPoint, to: foundIdx, isCorrect }]);

			// GSAP 애니메이션: 정답이면 초록 점 반짝, 오답이면 빨간 점 반짝
			const pointClass = `.point-${foundIdx}`;
			gsap.fromTo(
				pointClass,
				{ boxShadow: `0 0 0px ${isCorrect ? "green" : "red"}` },
				{
					boxShadow: `0 0 10px 4px ${isCorrect ? "green" : "red"}`,
					duration: 0.3,
					yoyo: true,
					repeat: 1,
					ease: "power1.inOut",
				}
			);
		}

		setStartPoint(null);
		setCurrentPos(null);
	};

	// Canvas 그리기
	const draw = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// 연결된 선들
		lines.forEach(({ from, to, isCorrect }) => {
			const fromPos = getPointPosition(from);
			const toPos = getPointPosition(to);
			ctx.strokeStyle = isCorrect ? "green" : "red";
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.moveTo(fromPos.x, fromPos.y);
			ctx.lineTo(toPos.x, toPos.y);
			ctx.stroke();
		});

		// 드래그 중 선
		if (dragging && startPoint !== null && currentPos) {
			const fromPos = getPointPosition(startPoint);
			ctx.strokeStyle = "blue";
			ctx.lineWidth = 3;
			ctx.setLineDash([5, 5]);
			ctx.beginPath();
			ctx.moveTo(fromPos.x, fromPos.y);
			ctx.lineTo(currentPos.x, currentPos.y);
			ctx.stroke();
			ctx.setLineDash([]);
		}
	};

	useEffect(() => {
		draw();
	}, [lines, dragging, currentPos]);

	return (
		<div
			ref={containerRef}
			style={{
				position: "relative",
				width: "100%",
				height: 300,
				border: "1px solid #ccc",
				userSelect: "none",
				marginTop: 20,
			}}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
		>
			{/* 박스와 점 */}
			{boxPositions.map((pos, idx) => (
				<div
					key={idx}
					style={{
						position: "absolute",
						width: 100,
						height: 40,
						background: "#ddd",
						top: pos.y,
						left: pos.x,
						borderRadius: 6,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						userSelect: "none",
					}}
				>
					박스 {idx + 1}

					{/* 점 클릭 영역, GSAP 애니메이션 효과 대상 */}
					<div
						onMouseDown={onMouseDown(idx)}
						className={`point-${idx}`}
						style={{
							position: "absolute",
							top: pointOffset.y,
							left: pointOffset.x,
							width: 20,
							height: 20,
							borderRadius: "50%",
							backgroundColor: "#333",
							border: "2px solid white",
							cursor: "pointer",
							userSelect: "none",
						}}
					/>
				</div>
			))}

			{/* 선 그릴 캔버스 */}
			<canvas
				ref={canvasRef}
				width={window.innerWidth}
				height={300}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					pointerEvents: "none",
					userSelect: "none",
					zIndex: 5,
				}}
			/>
		</div>
	);
}
