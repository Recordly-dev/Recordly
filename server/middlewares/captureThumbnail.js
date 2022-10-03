import captureWebsite from "capture-website";

const url = (workspaceId) =>
  `http://${
    process.env.FRONTEND_PROXY_HOST || "localhost"
  }:3000/workspace/${workspaceId}`;

const path = (workspaceId) =>
  `./public/assets/images/thumbnail/${workspaceId}.png`;

const options = (cookie) => ({
  cookies: [
    {
      name: "app.sid",
      value: cookie,
      url: "http://localhost:3000",
    },
  ],
  overwrite: true,
});

const thumbnailSave = async (workspaceId, cookie) => {
  await captureWebsite.file(
    url(workspaceId),
    path(workspaceId),
    options(cookie)
  );
};

const captureThumbnail = (workspaceId, cookie) => {
  try {
    thumbnailSave(workspaceId, cookie);
  } catch (err) {
    console.log(err);
  }
};

export default { captureThumbnail };
