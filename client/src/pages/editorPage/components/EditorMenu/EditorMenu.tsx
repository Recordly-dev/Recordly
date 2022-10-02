import * as React from "react";
import { TDShapeType, TDSnapshot, TldrawApp } from "@tldraw/tldraw";

import styles from "./EditorMenu.module.scss";

const sortedSelector = (s: TDSnapshot) =>
  Object.values(s.document.pages).sort(
    (a, b) => (a.childIndex || 0) - (b.childIndex || 0)
  );

const EditorMenu = ({ context = React.createContext({} as TldrawApp) }) => {
  const app = React.useContext(context);

  const activeTool = app.useStore((s) => s.appState.activeTool);
  const sortedPages = app.useStore(sortedSelector);
  // const snapshot = app.useStore();

  const [pageName, setPageName] = React.useState(app.page.name || "Page");

  // const { document } = snapshot;

  const rInitialName = React.useRef(app.page.name || "Page");
  const rCurrentName = React.useRef(rInitialName.current);
  const rInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setPageName(app.page.name || "Page");
    // console.log(document);
  }, [app.page]);

  const handleTextFieldChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();
      rCurrentName.current = value;
      setPageName(value);
    },
    []
  );

  const handleTextFieldKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter": {
          if (rCurrentName.current === rInitialName.current) {
            // setIsOpen(false)
          } else {
            rInitialName.current = rCurrentName.current;
            app.renamePage(app.page.id, rCurrentName.current.trim());
          }
          break;
        }
      }
    },
    [app]
  );

  const handleChangePage = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      app.changePage(event.target.value);
    },
    [app]
  );

  const handleCreatePage = React.useCallback(() => {
    const pageName = "page " + (Object.keys(app.document.pages).length + 1);
    app.createPage(pageName);
  }, [app]);

  const handleDelete = React.useCallback(() => {
    if (window.confirm(`Are you sure you want to delete this page?`)) {
      app.deletePage(app.page.id);
    }
  }, [app]);

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
          style={{ fontWeight: activeTool === TDShapeType.Sticky ? 600 : 400 }}
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
      <div
        className={styles.EditorMenu__Bottom}
        style={{ position: "absolute", bottom: 20, left: 8, zIndex: 2 }}
      >
        <select onChange={handleChangePage}>
          {sortedPages.map((page) => (
            <option value={page.id} key={page.id}>
              {page.name || "Page"}
            </option>
          ))}
        </select>
        <input
          type="text"
          ref={rInput}
          value={pageName}
          onChange={handleTextFieldChange}
          onKeyDown={handleTextFieldKeyDown}
        />
        <button onClick={() => handleCreatePage()}>Create Page</button>
        <button onClick={() => handleDelete()}>Delete Page</button>
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
