import React, { useCallback, useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import PDFPage from "components/PDFPage";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFEditor = ({ pdfPath }) => {
  const [pages, setPages] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [scale, setScale] = useState(1);

  const onLoadSuccess = () => {
    console.log(`pdf 로딩 성공`);
    setError(false);
  };

  const onLoadFail = (e) => {
    console.log(`pdf 로딩 실패!: ${e}`);
    setError(true);
  };

  const renderPDF = useCallback(
    async (pdfPath) => {
      try {
        console.log(pdfPath);
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        console.log(loadingTask);
        const doc = await loadingTask.promise;
        const totalPage = doc.numPages;

        setTotal(totalPage);

        if (totalPage === 0) {
          throw new Error(`전체 페이지가 0`);
        }

        const pageArr = Array.from(Array(totalPage + 1).keys()).slice(1);
        const allPages = pageArr.map((i) => (
          <PDFPage doc={doc} page={i} key={i} scale={scale} />
        ));
        setPages(allPages);

        onLoadSuccess();
      } catch (e) {
        onLoadFail(e);
      }
    },
    [scale]
  );

  useEffect(() => {
    renderPDF(pdfPath);
  }, [pdfPath, scale]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
      }}
      id="canvas-scroll"
    >
      {pages}
      {error && (
        <div style={{ height: "100%", margin: "5px auto" }}>
          pdf 로딩에 실패했습니다.
        </div>
      )}
      <div> total: {total}</div>
      <button onClick={() => setScale(scale + 0.5)}>+</button>
      <button onClick={() => setScale(scale - 0.5)}>-</button>
    </div>
  );
};

export default PDFEditor;
