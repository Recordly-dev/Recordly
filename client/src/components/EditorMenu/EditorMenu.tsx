import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import cn from "classnames";

import html2canvas from "html2canvas";
import { useNavigate } from "react-router";

import {
  usePostTag,
  usePatchTag,
  useDeleteTag,
  useGetTagsInWorkspace,
  useGetRecommendedTag,
} from "query-hooks/useFetchTag";
import {
  usePostWorkspaceThumbnail,
  usePatchWorkspaceInner,
  useGetWorkspaces,
  useGetCurrentWorkspace,
} from "query-hooks/useFetchWorkspace";

import { Button } from "reactstrap";
import TagInput from "../TagInput";
import EmptyImage from "components/EmptyImage";
import RecommendedTag from "components/RecommendedTag";
import BasicTag from "components/BasicTag";
import SimpleWorkspace from "components/SimpleWorkspace";
import SimpleWorkspaceSkeleton from "components/Skeleton/SimpleWorkspaceSkeleton";
import RecommendedTagSkeleton from "components/Skeleton/RecommendedTagSkeleton";

import { TDShapeType, TldrawApp } from "@tldraw/tldraw";
import EraserIcon from "common/assets/icons/EraserIcon";
import TextIcon from "common/assets/icons/TextIcon";
import BackIcon from "common/assets/icons/BackIcon";

import useOnClickOutside from "hooks/useOnClickOutside";
import useInputOnClickOutside from "hooks/useInputOnClickOutside";
import { useDebouncedCallback } from "use-debounce";

import { extractTextsFromDocument } from "utils/tldraw";

import { IWorkspace } from "types/workspace";

import styles from "./EditorMenu.module.scss";

import CONSTANT from "./constants";
import { IRecommendedTag, ITag } from "types/tag";

let getRecommendedTagsInterval: NodeJS.Timeout;

const EditorMenu = ({
  context = createContext({} as TldrawApp),
  workspaceId,
  title,
}: {
  context: React.Context<TldrawApp>;
  workspaceId: string;
  title: string | undefined;
}) => {
  const app = useContext(context);
  const activeTool = app.useStore((s) => s.appState.activeTool);
  const snapshot = app.useStore();
  const { document } = snapshot;

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: mutatePostTag } = usePostTag({ workspaceId });
  const { mutateAsync: mutateDeleteTag } = useDeleteTag({ workspaceId });
  const { mutateAsync: mutatePatchTag } = usePatchTag({ workspaceId });
  const { mutateAsync: mutateWorkspace } = usePostWorkspaceThumbnail();
  const { mutateAsync: mutateWorkspaceInner } = usePatchWorkspaceInner();

  const texts = extractTextsFromDocument(document);

  const { data: recommendedTags, refetch: refetchRecommendedTags } =
    useGetRecommendedTag({
      text: texts,
      workspaceId,
    });

  const { data: tagList } = useGetTagsInWorkspace({ workspaceId });
  const { data: workspaces } = useGetWorkspaces();
  const { data: currentWorkspace } = useGetCurrentWorkspace({ workspaceId });

  /**
   * 태그 수정 외부 클릭 로직에서 쓸 state
   */
  const [tagInfo, setTagInfo] = useState({
    tagId: "",
    workspaceId: "",
  });

  /**
   * 더블클릭 시 태그 수정 input을 보여주기 위한 state
   */
  const [isPatchTag, setIsPatchTag] = useState({
    state: false,
    index: 0,
  });

  /**
   * 입력 태그 value state
   */
  const [patchValue, setPatchTagValue] = useState("");

  const [isViewTagList, setIsViewTagList] = useState(false);
  const [isViewRelatedPopup, setIsViewRelatedPopup] = useState(false);
  const [relatedWorkspaceList, setRelatedWorkspaceList] = useState([]);
  const [isRecommendeWorkspaceLoading, setIsRecommendeWorkspaceLoading] =
    useState(false);

  /**
   * 메인페이지로 이동하는 로직
   */
  const moveMainPage = () => {
    navigate("/main");
  };

  const moveWorkSpacePage = (id: string): void => {
    window.location.href = `/workspace/${id}`;
  };

  /**
   * 추천 태그 클릭 시 저장하는 로직
   */
  const saveRecommendedTag = (name: string) => {
    mutatePostTag({ name, workspaceId });
  };

  /**
   * 태그 삭제 로직
   */
  const deleteTag = (tagId: string, workspaceId: string) => {
    mutateDeleteTag({ tagId, workspaceId });
  };

  /**
   * 태그 입력 로직
   */
  const handlePatchTagValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setPatchTagValue(inputValue);
  };

  /**
   * 태그 수정 로직
   */
  const patchTag = (value: string, tagId: string, workspaceId: string) => {
    if (value.length > 0) {
      mutatePatchTag({ tagId, tagName: value, workspaceId });
      setPatchTagValue("");
      setIsPatchTag({ state: false, index: 0 });
    }
  };

  /**
   * 태그 수정 후 컴포넌트 외부 영역 클릭하면 저장되는 로직
   * fix: ref.current.value 대신 patchValue쓰면 기존 값이랑 똑같은 게 들어가는 이슈가 생김(이유는 모름..)
   * Todo: 추후 원인파악 후 해결
   */
  useInputOnClickOutside(
    inputRef,
    () =>
      patchTag(
        inputRef?.current?.value || "",
        tagInfo.tagId,
        tagInfo.workspaceId
      ),
    isPatchTag.state
  );

  useOnClickOutside(divRef, () => setIsViewRelatedPopup(false));
  useOnClickOutside(tagRef, () => setIsViewTagList(false));

  /**
   * 엔터 눌렀을 때 태그 수정되는 로직
   */
  const handlePatchTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    tagId: string,
    workspaceId: string
  ) => {
    setTagInfo({
      tagId,
      workspaceId,
    });

    switch (e.key) {
      case "Enter": {
        patchTag(patchValue, tagId, workspaceId);

        break;
      }
    }
  };

  /**
   * 태그 클릭 시 수정 로직
   */
  const handlePatchTagState = (
    tagName: string,
    tagId: string,
    workspaceId: string,
    idx: number
  ) => {
    setTagInfo({
      tagId,
      workspaceId,
    });
    setPatchTagValue(tagName);
    setIsPatchTag({ state: true, index: idx });
    inputRef?.current?.focus();
  };

  /**
   * 워크스페이스 저장하는 로직
   */
  const saveContentToDB = useDebouncedCallback(async (document) => {
    const editorEl = window.document.getElementById("tldrawEditor");
    if (!editorEl) {
      return;
    }

    if (document?.pages?.shapes) {
      return;
    }

    html2canvas(editorEl).then((editorCanvas) => {
      editorCanvas.toBlob(async (blob) => {
        if (!blob) {
          console.log("no blob");
          return;
        }
        const formData = new FormData();
        formData.append("file", blob, `${workspaceId}.png`);
        await mutateWorkspace({ workspaceId, formData });
      });
    });

    await mutateWorkspaceInner({ workspaceId, document });
  }, 1000);

  const handleRelatedPopup = () => {
    setIsViewRelatedPopup((prev) => !prev);
  };

  const getRelatedWorkspaceList = async () => {
    setIsRecommendeWorkspaceLoading(true);

    const currentWorkspaceTagList = currentWorkspace?.tags?.map(
      (tag: ITag) => tag.name
    );

    const relatedWorkspaceList = await workspaces?.filter(
      (workspace: IWorkspace) => {
        if (workspace.title === title) return false;

        const tags = workspace.tags.map((tag: ITag) => tag.name);

        for (let i = 0; i < tags.length; i++) {
          if (currentWorkspaceTagList.includes(tags[i])) {
            return true;
          }
        }
        return false;
      }
    );

    setRelatedWorkspaceList(relatedWorkspaceList);
    setIsRecommendeWorkspaceLoading(false);
  };

  useEffect(() => {
    if (!isViewRelatedPopup) return;

    getRelatedWorkspaceList();
  }, [isViewRelatedPopup]);

  useEffect(() => {
    saveContentToDB(document);
  }, [document]);

  /**
   * 추천 태그 10초 interval useEffect
   */
  useEffect(() => {
    getRecommendedTagsInterval = setInterval(async () => {
      refetchRecommendedTags();
    }, 10000);
    return () => clearInterval(getRecommendedTagsInterval);
  }, [workspaceId]);

  let renderRelatedWorkspaceList;

  if (isRecommendeWorkspaceLoading) {
    renderRelatedWorkspaceList = new Array(3)
      .fill(1)
      .map((v) => <SimpleWorkspaceSkeleton />);
  } else if (relatedWorkspaceList.length === 0) {
    renderRelatedWorkspaceList = <EmptyImage />;
  } else {
    renderRelatedWorkspaceList = relatedWorkspaceList.map(
      (workspace: IWorkspace) => (
        <SimpleWorkspace
          key={workspace._id}
          uid={workspace._id}
          title={workspace.title}
          tagList={workspace.tags}
          moveWorkSpacePage={moveWorkSpacePage}
        />
      )
    );
  }

  return (
    <>
      <div className={styles.EditorMenu__topLeft}>
        <Button
          className={styles.EditorMenu__topLeft__button}
          color="outline-dark"
          onClick={moveMainPage}
        >
          <BackIcon
            width={CONSTANT.ICON_SIZE.BACK}
            height={CONSTANT.ICON_SIZE.BACK}
            color="#3e404c"
          />
        </Button>
        <h6>{title}</h6>
      </div>
      <div className={styles.EditorMenu__top}>
        <Button
          className={cn({
            [styles.EditorMenu__tool]: true,
            [styles.EditorMenu__activeTool]: activeTool === "select",
          })}
          onClick={() => app.selectTool("select")}
        >
          <span
            className={cn({
              "material-symbols-outlined": true,
              [styles.EditorMenu__icon]: true,
              [styles.EditorMenu__icon__active]: activeTool === "select",
            })}
          >
            arrow_selector_tool
          </span>
        </Button>
        <Button
          className={cn({
            [styles.EditorMenu__tool]: true,
            [styles.EditorMenu__activeTool]: activeTool === TDShapeType.Draw,
          })}
          onClick={() => app.selectTool(TDShapeType.Draw)}
        >
          <span
            className={cn({
              "material-symbols-outlined": true,
              [styles.EditorMenu__icon]: true,
              [styles.EditorMenu__icon__active]:
                activeTool === TDShapeType.Draw,
            })}
          >
            create
          </span>
        </Button>
        <Button
          className={cn({
            [styles.EditorMenu__tool]: true,
            [styles.EditorMenu__activeTool]: activeTool === "erase",
          })}
          onClick={() => app.selectTool("erase")}
        >
          <EraserIcon
            width={CONSTANT.ICON_SIZE.ERASER}
            height={CONSTANT.ICON_SIZE.ERASER}
            color={activeTool === "erase" ? "white" : "#3e404c"}
          />
        </Button>
        <Button
          className={cn({
            [styles.EditorMenu__tool]: true,
            [styles.EditorMenu__activeTool]:
              activeTool === TDShapeType.Rectangle,
          })}
          onClick={() => app.selectTool(TDShapeType.Rectangle)}
        >
          <span
            className={cn({
              "material-symbols-outlined": true,
              [styles.EditorMenu__icon]: true,
              [styles.EditorMenu__icon__active]:
                activeTool === TDShapeType.Rectangle,
            })}
          >
            crop_square
          </span>
        </Button>
        <Button
          className={cn({
            [styles.EditorMenu__tool]: true,
            [styles.EditorMenu__activeTool]: activeTool === TDShapeType.Arrow,
          })}
          onClick={() => app.selectTool(TDShapeType.Arrow)}
        >
          <span
            className={cn({
              "material-symbols-outlined": true,
              [styles.EditorMenu__icon]: true,
              [styles.EditorMenu__icon__active]:
                activeTool === TDShapeType.Arrow,
            })}
          >
            north_east
          </span>
        </Button>
        <Button
          className={cn({
            [styles.EditorMenu__tool]: true,
            [styles.EditorMenu__activeTool]: activeTool === TDShapeType.Text,
          })}
          onClick={() => app.selectTool(TDShapeType.Text)}
        >
          <TextIcon
            width={CONSTANT.ICON_SIZE.ERASER}
            height={CONSTANT.ICON_SIZE.ERASER}
            color={activeTool === TDShapeType.Text ? "white" : "#3e404c"}
          />
        </Button>
        <Button
          className={cn({
            [styles.EditorMenu__tool]: true,
            [styles.EditorMenu__activeTool]: activeTool === TDShapeType.Sticky,
          })}
          onClick={() => app.selectTool(TDShapeType.Sticky)}
        >
          <span
            className={cn({
              "material-symbols-outlined": true,
              [styles.EditorMenu__icon]: true,
              [styles.EditorMenu__icon__active]:
                activeTool === TDShapeType.Sticky,
            })}
          >
            note
          </span>
        </Button>
        <Button
          className={styles.EditorMenu__tool}
          onClick={() => app.openAsset()}
        >
          <span
            className={cn("material-symbols-outlined", styles.EditorMenu__icon)}
          >
            image
          </span>
        </Button>
      </div>
      <div className={styles.TagContainer}>
        <div className={styles.TagBox}>
          <span
            onClick={() => {
              setIsViewTagList((prev) => !prev);
            }}
            className={styles.TagBox__text}
          >
            <span
              className={cn("material-symbols-outlined", styles.TagBox__icon)}
            >
              sell
            </span>
          </span>
        </div>
        {isViewTagList && (
          <div ref={tagRef} className={styles.TagList__popup}>
            <>
              <div className={styles.TagList__BasicTag}>
                <span className={styles.TagList__title}>TagList</span>
                <div className={styles.TagList}>
                  {tagList.map((tag: ITag, idx: number) =>
                    isPatchTag.state && isPatchTag.index === idx ? (
                      <input
                        className={styles.Tag__editInput}
                        ref={inputRef}
                        value={patchValue}
                        onChange={handlePatchTagValue}
                        onKeyDown={(e) =>
                          handlePatchTagKeyDown(e, tag?._id, workspaceId)
                        }
                      />
                    ) : (
                      <BasicTag
                        tagId={tag?._id}
                        workspaceId={workspaceId}
                        tagName={tag?.name}
                        idx={idx}
                        handleDeleteTag={deleteTag}
                        handlePatchTag={handlePatchTagState}
                      />
                    )
                  )}
                  {tagList.length < 10 && isViewTagList && (
                    <TagInput workspaceId={workspaceId} />
                  )}
                </div>
              </div>
              <div className={styles.TagList__RecommendedTag}>
                <span className={cn(styles.TagList__title, "mt-2")}>
                  Recommended Tags
                </span>
                {!!recommendedTags?.length ? (
                  <div className={styles.RecommendedTag}>
                    {recommendedTags
                      ?.filter(
                        (tag: IRecommendedTag) =>
                          !tagList.map((tag: ITag) => tag.name).includes(tag)
                      )
                      .slice(0, 3)
                      ?.map((tag: string, idx: number) => (
                        <RecommendedTag
                          tagName={tag}
                          saveRecommendedTag={saveRecommendedTag}
                          idx={idx}
                        />
                      ))}
                  </div>
                ) : (
                  <div className={cn("d-flex", "align-items-center")}>
                    {new Array(3).fill(1).map((v) => (
                      <RecommendedTagSkeleton />
                    ))}
                  </div>
                )}
              </div>
            </>
          </div>
        )}
      </div>
      <div className={styles.EditorMenu__related}>
        <span
          onClick={handleRelatedPopup}
          className={styles.EditorMenu__related__text}
        >
          <span
            className={cn(
              "material-symbols-outlined",
              styles.EditorMenu__recommendIcon
            )}
          >
            recommend
          </span>
        </span>
      </div>
      {isViewRelatedPopup && (
        <div ref={divRef} className={styles.EditorMenu__related__popup}>
          <span className={styles.EditorMenu__related__popup__title}>
            Recommended Memos
          </span>
          {renderRelatedWorkspaceList}
        </div>
      )}
    </>
  );
};

export default EditorMenu;
