import React, { useState, createContext, useCallback, useRef } from "react";
import { cloneDeep } from "lodash";

import { Tldraw, TldrawApp } from "@tldraw/tldraw";

import EditorMenu from "components/EditorMenu";

import styles from "./EditorPage.module.scss";
import axios from "axios";

const AppContext = createContext({} as TldrawApp);

const EditorPage = () => {
  const [app, setApp] = useState<TldrawApp>();

  const rTLDrawApp = useRef<TldrawApp>();

  // persist the tldraw document under this id
  const workspaceId: string = window.location.pathname?.split("/").at(-1) || ""; // [1]

  const handleMount = useCallback((app: TldrawApp) => {
    axios.get(`/api/workspace/${workspaceId}`).then(
      ({
        data: {
          result: { workspace },
        },
      }) => {
        if (workspace?.content?.pages?.page?.shapes) {
          app.mergeDocument(cloneDeep(workspace.content));
        }
        setApp(app);
        rTLDrawApp.current = app; // [2]
      }
    );
  }, []);

  return (
    <div className={styles.EditorPage} id="tldrawEditor">
      <Tldraw
        onMount={handleMount}
        showTools={false}
        showZoom={false}
        showMultiplayerMenu={false}
        showPages={false}
        showMenu={false}
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
