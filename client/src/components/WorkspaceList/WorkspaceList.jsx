import React, { useState, useEffect } from "react";
import axios from "axios";

import Workspace from "components/Workspace";

import styles from "./WorkspaceList.module.scss";

const dummyData = [
  {
    title: "정보처리기사",
    type: "docs",
    date_created: "20220623",
    date_edited: "22.07.23",
    writer: "김영호",
    folder: "?",
  },
  {
    title: "자료구조",
    type: "docs",
    date_created: "20220523",
    date_edited: "22.08.03",
    writer: "박민호",
    folder: "?",
  },
  {
    title: "심리학 이론",
    type: "docs",
    date_created: "20220623",
    date_edited: "22.08.13",
    writer: "김영호",
    folder: "?",
  },
  {
    title: "기획 방법론",
    type: "docs",
    date_created: "20220723",
    date_edited: "22.08.13",
    writer: "윤호성",
    folder: "?",
  },
  {
    title: "일상 메모",
    type: "docs",
    date_created: "20220803",
    date_edited: "22.08.22",
    writer: "박민호",
    folder: "?",
  },
  {
    title: "정보처리기사",
    type: "docs",
    date_created: "20220623",
    date_edited: "22.07.23",
    writer: "김영호",
    folder: "?",
  },
  {
    title: "자료구조",
    type: "docs",
    date_created: "20220523",
    date_edited: "22.08.03",
    writer: "박민호",
    folder: "?",
  },
  {
    title: "심리학 이론",
    type: "docs",
    date_created: "20220623",
    date_edited: "22.08.13",
    writer: "김영호",
    folder: "?",
  },
  {
    title: "기획 방법론",
    type: "docs",
    date_created: "20220723",
    date_edited: "22.08.13",
    writer: "윤호성",
    folder: "?",
  },
  {
    title: "일상 메모",
    type: "docs",
    date_created: "20220803",
    date_edited: "22.08.22",
    writer: "박민호",
    folder: "?",
  },
];
const WorkspaceList = () => {
  const [workspaceList, setWorkspaceList] = useState([]);

  useEffect(() => {
    axios.get("workspace").then((res) => {
      setWorkspaceList(res.data);
    });
  });
  return <Workspace workspaceList={dummyData} />;
};

export default WorkspaceList;
