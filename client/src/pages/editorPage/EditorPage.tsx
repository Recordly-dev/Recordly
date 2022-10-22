import React, { useState, createContext, useCallback, useRef } from "react";
import { cloneDeep } from "lodash";

import { Utils } from "@tldraw/core";
import { Tldraw, TldrawApp } from "@tldraw/tldraw";

import EditorMenu from "./components/EditorMenu";

import styles from "./EditorPage.module.scss";
import axios from "axios";

const AppContext = createContext({} as TldrawApp);

const keepSelectedShapesInViewport = (app: TldrawApp) => {
  const { selectedIds } = app;
  if (selectedIds.length <= 0) return;

  // Get the selected shapes
  const shapes = selectedIds.map((id) => app.getShape(id));

  // Get the bounds of the selected shapes
  const bounds = Utils.getCommonBounds(
    shapes.map((shape) => app.getShapeUtil(shape).getBounds(shape))
  );

  // Define the min/max x/y (here we're using the viewport but
  // we could use any arbitrary bounds)
  const { minX, minY, maxX, maxY } = app.viewport;

  // Check for any overlaps between the viewport and the selection bounding box
  let ox = Math.min(bounds.minX, minX) || Math.max(bounds.maxX - maxX, 0);
  let oy = Math.min(bounds.minY, minY) || Math.max(bounds.maxY - maxY, 0);
  // If there's any overlaps, then update the shapes so that
  // there is no longer any overlap.
  if (ox !== 0 || oy !== 0) {
    app.updateShapes(
      ...shapes.map((shape) => ({
        id: shape.id,
        point: [shape.point[0] - ox, shape.point[1] - oy],
      }))
    );
  }
};

const EditorPage = () => {
  const rTLDrawApp = useRef<TldrawApp>();

  // persist the tldraw document under this id
  const workspaceId: string | undefined = window.location.pathname
    .split("/")
    .at(-1); // [1]

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

  const handleChange = useCallback(() => {
    const tldarwApp = rTLDrawApp.current;
    if (!tldarwApp) return;
    keepSelectedShapesInViewport(tldarwApp);
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
        // onChange={handleChange}
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
