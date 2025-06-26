import { gsap, useGSAP, Draggable } from "@/libs/gsapSetup";
import useSize from "@/hooks/useSize";
import { useRef } from "react";

export default function DragSample1() {
	const boxesRef = useRef([]);
	const dropZonesRef = useRef([]);

	const { resizedWidth, resizedHeight } = useSize();

	// 드래그 대상과 드롭 대상의 정답 매핑
	const correctMatches = {
		box1: "drop2",
		box2: "drop3",
		box3: "drop1",
	};

	useGSAP(() => {
		boxesRef.current.forEach((boxEl) => {
			const boxId = boxEl.dataset.id;

			Draggable.create(boxEl, {
				type: "x,y",
				bounds: window,
				onRelease: function () {
					const hitZone = dropZonesRef.current.find((zone) =>
						this.hitTest(zone, "50%")
					);

					if (hitZone) {
						const dropId = hitZone.dataset.id;

						if (correctMatches[boxId] === dropId) {
							// 정답
							const scaleX = hitZone.offsetWidth / boxEl.offsetWidth;
							const scaleY = hitZone.offsetHeight / boxEl.offsetHeight;
							gsap.to(boxEl, {
								x: hitZone.offsetLeft - boxEl.offsetLeft,
								y: hitZone.offsetTop - boxEl.offsetTop,
								scaleX,
								scaleY,
								transformOrigin: "top left",
								backgroundColor: "#a0e9a0",
								duration: 0.4,
							});
						} else {
							// 오답
							gsap.to(boxEl, {
								backgroundColor: "#f08080",
								duration: 0.3,
							});
						}
					} else {
						// 드롭존 밖 → 원래 자리로 복귀
						const originalColor = boxEl.dataset.color;
						gsap.to(boxEl, {
							x: 0,
							y: 0,
							scaleX: 1,
							scaleY: 1,
							backgroundColor: originalColor,
							duration: 0.3,
						});
					}
				},
			});
		});
	}, []);

	// 드래그 박스 생성
	const renderDraggables = () =>
		["box1", "box2", "box3"].map((id, index) => (
			<div
				key={id}
				data-id={id}
				data-color="#fcbf49"
				ref={(el) => (boxesRef.current[index] = el)}
				style={{
					position: "absolute",
					width: resizedWidth * 0.1,
					height: resizedHeight * 0.1,
					backgroundColor: "#fcbf49",
					cursor: "grab",
					// 예: 박스 위치 가로 10%, 25%, 40%, 세로 5% 고정
					left: resizedWidth * (0.1 + index * 0.15),
					top: resizedHeight * 0.05,
				}}
			>
				{id}
			</div>
		));

	// 드롭존 생성
	const renderDropZones = () =>
		["drop1", "drop2", "drop3"].map((id, index) => (
			<div
				key={id}
				data-id={id}
				ref={(el) => (dropZonesRef.current[index] = el)}
				style={{
					position: "absolute",
					width: resizedWidth * 0.12,
					height: resizedHeight * 0.12,
					border: "2px dashed #aaa",
					// 예: 드롭존 위치 가로 10%, 30%, 50%, 세로 30% 고정
					left: resizedWidth * (0.1 + index * 0.2),
					top: resizedHeight * 0.3,
				}}
			>
				{id}
			</div>
		));

	return (
		<>
			<h3>드래그 박스</h3>
			{renderDraggables()}

			<h3>드롭존</h3>
			{renderDropZones()}
		</>
	);
}
