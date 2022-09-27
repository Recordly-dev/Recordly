import React, { useCallback, useEffect, useRef } from "react";

const Page = ({ page, doc, scale = 1 }) => {
  const canvasRef = useRef(null);

  const drawCanvas = useCallback(
    ({ width, height }) => {
      if (!canvasRef.current) {
        throw new Error("canvasRef가 없음");
      }
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (context) {
        return context;
      } else {
        throw new Error("canvas context가 없음");
      }
    },
    [canvasRef]
  );

  const renderPage = useCallback(async () => {
    try {
      const currentPage = await doc.getPage(page);
      const viewport = currentPage.getViewport({ scale }); // each pdf has its own viewport
      const context = drawCanvas({
        width: viewport.width,
        height: viewport.height,
      });

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await currentPage.render(renderContext).promise;
    } catch (e) {
      throw new Error(`${page}번째 페이지 로딩 실패`);
    }
  }, [doc, page, scale, drawCanvas]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  return <canvas ref={canvasRef} style={{ margin: "5px auto" }} width={800} />;
};

export default Page;
