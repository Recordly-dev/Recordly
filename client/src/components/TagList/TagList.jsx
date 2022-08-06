import React from "react";

import Tag from "components/Tag";
import styles from "./TagList.module.scss";

// 서버 통신으로 tag list가져와서 map 돌려서 태그 출력하기
const dummyData = [
  {
    text: "알고리즘",
    count: 5,
  },
  {
    text: "자료구조",
    count: 7,
  },
  {
    text: "정보처리기사",
    count: 3,
  },
  {
    text: "심리학 이론",
    count: 1,
  },
  {
    text: "기획 방법론",
    count: 6,
  },
  {
    text: "일상 메모",
    count: 10,
  },
];
const TagList = () => {
  return <Tag tagList={dummyData} />;
};

export default TagList;
