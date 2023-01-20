const tagKeys = {
  all: () => ["tag"],
  workspcaeTag: (uid: string) => [...tagKeys.all(), uid],
  recommendedTag: (workspaceId: string) => [
    ...tagKeys.all(),
    workspaceId,
    "recommended",
  ],
};

export default tagKeys;
