import { actions as workspaceActions } from "store/slice/workspaceList";
import { actions as folderActions } from "store/slice/folderList";
import { useDispatch } from "store";

const NavItem = () => {
  const dispatch = useDispatch();

  return [
    {
      title: "Dashboard",
      link: "/main",
      onClick: () => {
        dispatch(folderActions.fetchFolderList());
        dispatch(workspaceActions.fetchWorkspaceList());
      },
    },
    {
      title: "Favorites",
      link: "/favorites",
      onClick: () => {
        dispatch(folderActions.setInitialFolderList());
        dispatch(workspaceActions.fetchFavoritesWorkspaceList());
      },
    },
    {
      title: "Tags",
      link: "/tags",
      onClick: () => {
        // console.log("1");
      },
    },
  ];
};

export default NavItem;
