import React, { useState, createContext, useCallback, useRef } from "react";
import { cloneDeep } from "lodash";

import { Tldraw, TldrawApp } from "@tldraw/tldraw";

import EditorMenu from "./components/EditorMenu";

import styles from "./EditorPage.module.scss";
import axios from "axios";

const AppContext = createContext({} as TldrawApp);

const EditorPage = () => {
  const rTLDrawApp = useRef<TldrawApp>();

  // persist the tldraw document under this id
  const workspaceId: string = window.location.pathname?.split("/").at(-1) || ""; // [1]

  const [app, setApp] = useState<TldrawApp>();
  const handleMount = useCallback((app: TldrawApp) => {
    axios.get(`/api/workspace/${workspaceId}`).then(({ data: workspace }) => {
      if (workspace?.content) {
        app.mergeDocument(cloneDeep(workspace.content));
      }
      setApp(app);
      rTLDrawApp.current = app; // [2]
    });
  }, []);

  return (
    <div className={styles.EditorPage} id="tldrawEditor">
      <Tldraw
        id={workspaceId}
        onMount={handleMount}
        showUI={false}
        onOpenProject={() => {
          console.log("here1!!!");
        }}
      />
      {/* When the app is in state, add it to the context provider and show the custom UI */}
      {app && (
        <AppContext.Provider value={app}>
          <EditorMenu context={AppContext} workspaceId={workspaceId} />
        </AppContext.Provider>
      )}
    </div>
  );
};

export default EditorPage;
