import React, { useEffect, useState } from "react";
import cn from "classnames";

import Header from "components/Header";
import Footer from "components/Footer";
import TagContainer from "components/TagContainer";
import MainDashboard from "components/MainDashboard";

import styles from "./Main.module.scss";

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

const Main = () => {
  const [workspaceList, setWorkspaceList] = useState([]);

  useEffect(() => {
    setWorkspaceList(dummyData);
  }, []);

  const getWorkspaceHaveTags = (value) => {
    setWorkspaceList(
      dummyData.filter((workspace) => workspace.tags.includes(value))
    );
  };

  return (
    <div className={cn(styles.Main)}>
      <Header isLogin />
      <div className={cn(styles.Main__container, "d-flex", "m-3", "p-3")}>
        <div className={cn(styles.Main__container__tagList, "w-25")}>
          <TagContainer
            workspaceList={workspaceList}
            getWorkspaceHaveTags={getWorkspaceHaveTags}
          />
        </div>
        <div className={cn(styles.Main__container__mainDashboard, "w-75")}>
          <MainDashboard workspaceList={workspaceList} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
