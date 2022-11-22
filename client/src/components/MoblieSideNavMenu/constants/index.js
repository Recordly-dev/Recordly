const HEADER_MENUS = {
  loggedInMenu: [
    {
      id: "dashboard",
      name: "Dashboard",
      link: "/main",
      hideInChannel: true,
    },
    {
      id: "favorites",
      name: "Favorites",
      link: "/favorites",
      hideInChannel: true,
    },
    {
      id: "tags",
      name: "Tags",
      link: "/tags",
      hideInChannel: true,
    },
  ],
};

const ICON_SIZE = {
  CLOSE: "1.375rem",
};

export default { HEADER_MENUS, ICON_SIZE };
