import { TDDocument, TDShapeType, TDShape, TextShape } from "@tldraw/tldraw";

// TDDocument에서 텍스트 부분만 추출 후, 이어 붙여서 반환하는 함수
export const extractTextsFromDocument = (document: TDDocument): string => {
  let result = "";
  const docShapes = document.pages.page.shapes;
  const textShapeList = Object.entries(docShapes)
    .map(([_, shape]) => shape)
    .filter(isTextShape);

  textShapeList.forEach(({ text }) => {
    result = result.concat(text + " ");
  });
  return result;
};

function isTextShape(shape: TDShape): shape is TextShape {
  return shape.type === TDShapeType.Text;
}
