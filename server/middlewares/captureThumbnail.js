import captureWebsite from "capture-website";

const url = (workspaceId) =>
  `${process.env.PROTOCOL}://${process.env.CLIENT_HOST}/workspace/${workspaceId}`;

const path = (workspaceId) =>
  `./public/assets/images/thumbnail/${workspaceId}.png`;

const options = (cookie) => ({
  cookies: [
    {
      name: "app.sid",
      value: cookie,
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
