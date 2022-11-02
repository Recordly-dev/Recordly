import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { Button } from "reactstrap";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";

import { TDShapeType, TldrawApp } from "@tldraw/tldraw";

import TagList from "../TagList";

import styles from "./EditorMenu.module.scss";

import html2canvas from "html2canvas";

import { actions as tagListActions } from "store/slice/tagList";

import { extractTextsFromDocument } from "../../../../utils/tldraw";

const EditorMenu = ({
  context = createContext({} as TldrawApp),
  workspaceId,
}: {
  context: React.Context<TldrawApp>;
  workspaceId: string;
}) => {
  const dispatch = useDispatch();
  const app = useContext(context);
  const activeTool = app.useStore((s) => s.appState.activeTool);
  const snapshot = app.useStore();
  const { document } = snapshot;

  const tagList = useSelector((state: any) => state.tag.tagList);
  console.log(tagList);
  const recommendedTagList = useSelector(
    (state: any) => state.tag.recommendedTagList
  );

  const saveRecommendedTag = (name: string) => {
    const popRecommendedTagList = [...recommendedTagList].filter(
      (tag) => tag !== name
    );
    dispatch(tagListActions.postTagList({ name, workspaceId }));
    dispatch(tagListActions.setRecommendedTagList(popRecommendedTagList));
  };

  const saveContentToDB = useDebouncedCallback((document) => {
    const editorEl = window.document.getElementById("tldrawEditor");
    if (!editorEl) {
      return;
    }

    html2canvas(editorEl).then((editorCanvas) => {
      editorCanvas.toBlob((blob) => {
        if (!blob) {
          console.log("no blob");
          return;
        }
        const formData = new FormData();
        formData.append("file", blob, `${workspaceId}.png`);
        axios
          .post(`/api/workspace/${workspaceId}/thumbnail`, formData)
          .then((res) => {
            console.log("thumbnail saved");
          })
          .catch((err) => {
            console.error("thumnail capture failed");
          });
      });
    });

    axios
      .patch(`/api/workspace/${workspaceId}`, {
        content: document,
      })
      .then((res) => {
        console.log("content saved");

        const texts = extractTextsFromDocument(document);
        dispatch(tagListActions.getRecommendedTagList({ text: texts }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, 1000);

  useEffect(() => {
    dispatch(tagListActions.setRecommendedTagList([]));
  }, []);

  useEffect(() => {
    saveContentToDB(document);
  }, [document]);

  return (
    <>
      {/* Tool Controls */}
      <div className={styles.EditorMenu__Top}>
        <button
          className={styles.EditorMenu__Top__Button}
          style={{
            fontWeight: activeTool === "select" ? 600 : 400,
          }}
          onClick={() =>
            // Select the tool on click
            app.selectTool("select")
          }
        >
          Select
        </button>
        <button
          className={styles.EditorMenu__Top__Button}
          style={{
            fontWeight: activeTool === TDShapeType.Rectangle ? 600 : 400,
          }}
          onClick={() => app.selectTool(TDShapeType.Rectangle)}
        >
          Rectangle
        </button>
        <button
          className={styles.EditorMenu__Top__Button}
          style={{ fontWeight: activeTool === TDShapeType.Arrow ? 600 : 400 }}
          onClick={() => app.selectTool(TDShapeType.Arrow)}
        >
          Arrow
        </button>
        <button
          className={styles.EditorMenu__Top__Button}
          style={{ fontWeight: activeTool === TDShapeType.Draw ? 600 : 400 }}
          onClick={() => app.selectTool(TDShapeType.Draw)}
        >
          Draw
        </button>
        <button
          className={styles.EditorMenu__Top__Button}
          style={{ fontWeight: activeTool === TDShapeType.Text ? 600 : 400 }}
          onClick={() => app.selectTool(TDShapeType.Text)}
        >
          Text
        </button>
        <button
          className={styles.EditorMenu__Top__Button}
          style={{
            fontWeight: activeTool === TDShapeType.Sticky ? 600 : 400,
          }}
          onClick={() => app.selectTool(TDShapeType.Sticky)}
        >
          Sticky
        </button>
        <button
          className={styles.EditorMenu__Top__Button}
          onClick={() => app.openAsset()}
        >
          Image
        </button>
        <button
          className={styles.EditorMenu__Top__Button}
          style={{ fontWeight: activeTool === "erase" ? 600 : 400 }}
          onClick={() => app.selectTool("erase")}
        >
          Erase
        </button>
      </div>
      <div style={{ position: "absolute", bottom: 20, left: 8, zIndex: 2 }}>
        <TagList workspaceId={workspaceId} />
        <div className={styles.EditorMenu__TagList}>
          {tagList.map((tag: any) => (
            <Button>{tag?.name}</Button>
          ))}
          {recommendedTagList?.map((tag: any) => (
            <Button color="primary" onClick={() => saveRecommendedTag(tag)}>
              {tag}
            </Button>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
        <button onClick={() => app.zoomIn()}>Zoom In</button>
        <button onClick={() => app.zoomOut()}>Zoom Out</button>
        <button onClick={() => app.resetZoom()}>Reset Zoom</button>
      </div>
    </>
  );
};

export default EditorMenu;
