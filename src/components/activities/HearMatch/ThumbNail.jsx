import useTimeout from "@/hooks/useTimeout";
import BackgroundContent from "@/components/common/activity/BackgroundContent";

export default function ThumbNail({ thumbnailObj, endThumbnail }) {
  const {background, title, week} = thumbnailObj;
  useTimeout(endThumbnail, 3000);
  
  return (
    <BackgroundContent
      backgroundImage={background}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <div>
        <h3>{title}</h3>
        <p>{week}</p>
      </div>
    </BackgroundContent>
  );
}
