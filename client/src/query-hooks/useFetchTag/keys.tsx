const tagKeys = {
  all: () => ["tag"],
  workspaceTag: (workspaceId: string) => [...tagKeys.all(), workspaceId],
  recommendedTag: (workspaceId: string) => [
    ...tagKeys.all(),
    workspaceId,
    "recommended",
  ],
};

export default tagKeys;
