import React, { useState, useEffect } from "react";
import axios from "axios";

import Workspace from "components/Workspace";

import styles from "./WorkspaceList.module.scss";

const dummyData = [
  {
    title: "정보처리기사 1",
    type: "docs",
    date_created: "20220623",
    date_edited: "22.07.23",
    tags: ["정보처리기사", "운영체제"],
    writer: "김영호",
    folder: "?",
  },
  {
    title: "자료구조 1",
    type: "docs",
    date_created: "20220523",
    date_edited: "22.08.03",
    tags: ["자료구조", "스택", "힙"],
    writer: "박민호",
    folder: "?",
  },
  {
    title: "심리학 이론 1",
    type: "docs",
    date_created: "20220623",
    date_edited: "22.08.13",
    tags: ["심리학", "발달 심리학"],
    writer: "김영호",
    folder: "?",
  },
  {
    title: "기획 방법론 1",
    type: "docs",
    date_created: "20220723",
    date_edited: "22.08.13",
    tags: ["기획 방법론", "페르소나", "엘레베이터 피치"],
    writer: "윤호성",
    folder: "?",
  },
  {
    title: "일상 메모 1",
    type: "docs",
    date_created: "20220803",
    date_edited: "22.08.22",
    tags: ["성수동 맛집", "소랑호젠", "쌀국수"],
    writer: "박민호",
    folder: "?",
  },
  {
    title: "정보처리기사 2",
    type: "docs",
    date_created: "20220623",
    date_edited: "22.07.23",
    tags: ["정보처리이론", "델파이 기법", "애자일"],
    writer: "김영호",
    folder: "?",
  },
  {
    title: "자료구조 2",
    type: "docs",
    date_created: "20220523",
    date_edited: "22.08.03",
    tags: ["정렬", "유니온파인드", "DFS"],
    writer: "박민호",
    folder: "?",
  },
  {
    title: "심리학 이론 2",
    type: "docs",
    date_created: "20220623",
    date_edited: "22.08.13",
    tags: ["발달 심리학"],
    writer: "김영호",
    folder: "?",
  },
  {
    title: "기획 방법론 2",
    type: "docs",
    date_created: "20220723",
    date_edited: "22.08.13",
    tags: ["UX", "기획 방법론", "페르소나"],
    writer: "윤호성",
    folder: "?",
  },
  {
    title: "일상 메모 2",
    type: "docs",
    date_created: "20220803",
    date_edited: "22.08.22",
    tags: ["성수동 맛집"],
    writer: "박민호",
    folder: "?",
  },
];

const WorkspaceList = () => {
  const [workspaceList, setWorkspaceList] = useState([]);

  useEffect(() => {
    axios.get("/workspace").then((res) => {
      setWorkspaceList(res.data);
    });
  });
  return <Workspace workspaceList={dummyData} />;
};

export default WorkspaceList;
