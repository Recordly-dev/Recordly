import React, {
  createContext,
  useContext,
  // useRef,
  // useCallback,
  useEffect,
  useState,
} from "react";

import { Button } from "reactstrap";
import axios from "axios";
// import Swal from "sweetalert2";

import { useDebouncedCallback } from "use-debounce";

import { TDShapeType, TDSnapshot, TldrawApp } from "@tldraw/tldraw";

import TagList from "../TagList";

import styles from "./EditorMenu.module.scss";

// const sortedSelector = (s: TDSnapshot) =>
//   Object.values(s.document.pages).sort(
//     (a, b) => (a.childIndex || 0) - (b.childIndex || 0)
//   );

const EditorMenu = ({
  context = createContext({} as TldrawApp),
  workspaceId,
}: {
  context: React.Context<TldrawApp>;
  workspaceId: string | undefined;
}) => {
  const app = useContext(context);
  const activeTool = app.useStore((s) => s.appState.activeTool);
  // const sortedPages = app.useStore(sortedSelector);
  const snapshot = app.useStore();

  // const [pageName, setPageName] = useState(app.page.name || "Page");
  const [tagList, setTagList] = useState([]);
  const { document } = snapshot;

  // const rInitialName = useRef(app.page.name || "Page");
  // const rCurrentName = useRef(rInitialName.current);
  // const rInput = useRef<HTMLInputElement>(null);

  const getTagList = async () => {
    const workspace = await axios.get(`/api/workspace/${workspaceId}`);
    setTagList(workspace.data?.tags);
  };

  const saveContentToDB = useDebouncedCallback(() => {
    const workspaceId = window.location.pathname.split("/").at(-1);
    axios
      .patch(`/api/workspace/${workspaceId}`)
      .then((req) => {
        console.log("content saved");
        console.log(req);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 3000);

  useEffect(() => {
    getTagList();
  }, []);

  // useEffect(() => {
  //   setPageName(app.page.name || "Page");
  // }, [app.page]);

  useEffect(() => {
    saveContentToDB();
    // console.log(document);
  }, [document]);

  // const handleTextFieldChange = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = event.target.value.trim();
  //     rCurrentName.current = value;
  //     setPageName(value);
  //   },
  //   []
  // );

  // pp.renamePage(app.page.id, rCurrentName.current.trim());
  //         }const handleTextFieldKeyDown = useCallback(
  //   (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     switch (e.key) {
  //       case "Enter": {
  //         if (rCurrentName.current === rInitialName.current) {
  //           // setIsOpen(false)
  //         } else {
  //           rInitialName.current = rCurrentName.current;
  //           a
  //         break;
  //       }
  //     }
  //   },
  //   [app]
  // );

  // const handleChangePage = useCallback(
  //   (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     app.changePage(event.target.value);
  //   },
  //   [app]
  // );

  // const handleCreatePage = useCallback(() => {
  //   Swal.fire({
  //     title: "새 페이지 이름을 적어주세요.",
  //     input: "text",
  //     inputAttributes: {
  //       autocapitalize: "off",
  //     },
  //     showCancelButton: true,
  //     confirmButtonText: "Create",
  //     showLoaderOnConfirm: true,
  //     preConfirm: (title) => {
  //       return title;
  //     },
  //     allowOutsideClick: () => !Swal.isLoading(),
  //   }).then((result) => {
  //     const pageName = result.value;
  //     app.createPage(pageName);
  //   });
  // }, [app]);

  // const handleDelete = useCallback(() => {
  //   if (window.confirm(`Are you sure you want to delete this page?`)) {
  //     app.deletePage(app.page.id);
  //   }
  // }, [app]);

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
      {/* <div
        className={styles.EditorMenu__Bottom}
        style={{ position: "absolute", bottom: 20, left: 8, zIndex: 2 }}
      > */}
      {/**
       * 여러 페이지 구성하는 로직
       * 현재 이슈가 있어서 비활성화
       * 페이지 변경시 뭔가 잘 안 맞음 */}
      {/* <select onChange={handleChangePage}>
          {sortedPages.map((page) => (
            <option value={page.id} key={page.id}>
              {page.name || "Page"}
            </option>
          ))}
        </select> */}
      {/* <input
          type="text"
          ref={rInput}
          value={pageName}
          onChange={handleTextFieldChange}
          onKeyDown={handleTextFieldKeyDown}
        /> */}
      {/* <button onClick={() => handleCreatePage()}>Create Page</button>
        <button onClick={() => handleDelete()}>Delete Page</button> */}
      {/* </div> */}
      <div style={{ position: "absolute", bottom: 20, left: 8, zIndex: 2 }}>
        <TagList workspaceId={workspaceId} getTagList={getTagList} />
        <div className={styles.EditorMenu__TagList}>
          {tagList.map((tag: any) => (
            <Button>{tag?.name}</Button>
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
