import { useState } from "react";

// 썸네일
export default function useThumbnailScreen() {
  const [isThumbnailVisible, setIsThumbnailVisible] = useState(true);

  const showThumbnail = () => {
    setIsThumbnailVisible(true);
  };

  const endThumbnail = () => {
    setIsThumbnailVisible(false);
  };

  return { isThumbnailVisible, showThumbnail, endThumbnail };
}
