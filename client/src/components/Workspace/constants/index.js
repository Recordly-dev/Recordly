const IMAGE_PATH = (uid) =>
  `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_SERVER_HOST}/api/public/assets/images/thumbnail/${uid}.png`;

const EMPTY_IMAGE_PATH = `/api/public/assets/images/emptyThumbnail.png`;

const ICON_SIZE = {
  STAR: "24px",
  EDIT: "18px",
};

export default { IMAGE_PATH, EMPTY_IMAGE_PATH, ICON_SIZE };
