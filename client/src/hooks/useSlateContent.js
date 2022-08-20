import axios from "axios";

import { useState, useEffect } from "react";

import { initialContent } from "constants/editor";

export default function useSlateContent(workspaceId) {
  const [content, setContent] = useState(initialContent);
  useEffect(() => {
    console.log("hohoho");
    axios.get(`/api/workspace/${workspaceId}`).then((res) => {
      if (res.data.content) {
        setContent(JSON.parse(res.data.content));
      }
    });
  }, [workspaceId]);
  return { slateContent: content };
}
