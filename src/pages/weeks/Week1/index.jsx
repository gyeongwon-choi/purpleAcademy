import useThumbnailScreen from "@/hooks/useThumbnailScreen";
import WEEK1_DATA from "./data.json";

import HearMatch from "@/components/activities/HearMatch";
import ThumbNail from "./Thumbnail";

export default function W1_SoundMapper() {
  const { isThumbnailVisible, endThumbnail } = useThumbnailScreen();

  // 썸네일
  if (isThumbnailVisible) {
    return (
      <ThumbNail endThumbnail={endThumbnail} thumbnailObj={WEEK1_DATA.thumbnail} />
    );
  }

  return (
    <>
      <HearMatch data={WEEK1_DATA} />
    </>
  );
}