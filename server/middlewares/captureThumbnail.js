import captureWebsite from "capture-website";

const captureThumbnail = async (workspaceId, cookie) => {
  try {
    await captureWebsite.file(
      `http://localhost:3000/workspace/${workspaceId}`,
      `./${workspaceId}.png`,
      {
        cookies: [
          {
            name: "app.sid",
            value: cookie,
            expires: Math.round(new Date("2022-12-21").getTime() / 1000),
            url: "http://localhost:3000",
          },
        ],
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export default captureThumbnail;
