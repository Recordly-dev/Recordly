const tagKeys = {
  all: () => ["tag"],
  workspcaeTag: (workspaceId: string) => [...tagKeys.all(), workspaceId],
  recommendedTag: (workspaceId: string) => [
    ...tagKeys.all(),
    workspaceId,
    "recommended",
  ],
};

export default tagKeys;
