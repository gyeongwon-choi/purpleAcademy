import { gsap, useGSAP, Draggable } from "@/libs/gsapSetup";
import { useRef } from "react";

export default function DragSample1() {
	const boxesRef = useRef([]);
	const dropZonesRef = useRef([]);

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
					width: 80,
					height: 80,
					backgroundColor: "#fcbf49",
					margin: 10,
					display: "inline-block",
					cursor: "grab",
					position: "relative",
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
					width: 100,
					height: 100,
					border: "2px dashed #aaa",
					margin: 20,
					display: "inline-block",
					verticalAlign: "top",
				}}
			>
				{id}
			</div>
		));

	return (
		<div style={{ padding: 20 }}>
			<h3>드래그 박스</h3>
			<div>{renderDraggables()}</div>

			<h3>드롭존</h3>
			<div>{renderDropZones()}</div>
		</div>
	);
}
