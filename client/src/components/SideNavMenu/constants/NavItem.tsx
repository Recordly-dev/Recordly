import { actions as workspaceActions } from "store/slice/workspaceList";
import { actions as folderActions } from "store/slice/folderList";
import { useDispatch } from "store";

const NavItem = () => {
  const dispatch = useDispatch();

  return [
    {
      title: "Dashboard",
      link: "/main",
    },
    {
      title: "Favorites",
      link: "/favorites",
    },
    {
      title: "Tags",
      link: "/tags",
    },
  ];
};

export default NavItem;
