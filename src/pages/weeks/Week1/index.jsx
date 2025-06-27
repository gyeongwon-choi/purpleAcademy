import WEEK1_DATA from "./data.json";

import HearMatch from "@/components/activities/HearMatch";


export default function W1_SoundMapper() {

  // 주차
  return (
    <>
      <HearMatch data={WEEK1_DATA} />
    </>
  );
}