import * as React from "react";
import { Tldraw, TldrawApp } from "@tldraw/tldraw";

import EditorMenu from "./components/EditorMenu";

import styles from "./EditorPage.module.scss";

const AppContext = React.createContext({} as TldrawApp);

function EditorPage() {
  // persist the tldraw document under this id
  const id = window.location.pathname; // [1]

  const [app, setApp] = React.useState<TldrawApp>();

  // on mount, set the app to react state
  const handleMount = React.useCallback((app: TldrawApp) => {
    setApp(app);
  }, []);

  return (
    <div className={styles.EditorPage}>
      <Tldraw id={id} onMount={handleMount} showUI={false} />
      {/* When the app is in state, add it to the context provider and show the custom UI */}
      {app && (
        <AppContext.Provider value={app}>
          <EditorMenu context={AppContext} />
        </AppContext.Provider>
      )}
    </div>
  );
}

export default EditorPage;
