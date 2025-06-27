import SOUNDMAPPER_DATA from "./data.json";

import HearMatch from "@/components/activities/HearMatch";

export default function W1_SoundMapper() {

  // 주차
  return (
    <>
      <HearMatch data={SOUNDMAPPER_DATA} />
    </>
  );
}