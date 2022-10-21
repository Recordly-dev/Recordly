import html2canvas from "html2canvas";

export const capture = async (target) => {
  if (!target) {
    return;
  }
  const canvas = await html2canvas(target);
  const targetImg = canvas.toDataURL("image/png");
  return targetImg;
};
