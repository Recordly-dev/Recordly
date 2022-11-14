import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import cn from "classnames";
import axios from "axios";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { useNavigate } from "react-router";
import { actions as tagListActions } from "store/slice/tagSlice";

import { Button, FormGroup, Input } from "reactstrap";
import TagInput from "../TagInput";
import RecommendedTag from "./components/RecommendedTag";
import BasicTag from "./components/BasicTag";
import SimpleWorkspace from "components/SimpleWorkspace";

import { TDShapeType, TldrawApp } from "@tldraw/tldraw";
import EraserIcon from "common/assets/icons/EraserIcon";
import TextIcon from "common/assets/icons/TextIcon";
import BackIcon from "common/assets/icons/BackIcon";

import useOnClickOutside from "hooks/useOnClickOutside";
import useInputOnClickOutside from "hooks/useInputOnClickOutside";
import { useDebouncedCallback } from "use-debounce";

import { extractTextsFromDocument } from "../../../../utils/tldraw";

import { IWorkspace } from "types/workspace";

import styles from "./EditorMenu.module.scss";

import CONSTANT from "./constants";

const EditorMenu = ({
  context = createContext({} as TldrawApp),
  workspaceId,
  title,
}: {
  context: React.Context<TldrawApp>;
  workspaceId: string;
  title: string | undefined;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);
  const divRef = useRef<any>(null);

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

  const [isViewTagList, setIsViewTagList] = useState(true);
  const [isViewRelatedPopup, setIsViewRelatedPopup] = useState(false);
  const [relatedWorkspaceList, setRelatedWorkspaceList] = useState([]);

  const app = useContext(context);
  const activeTool = app.useStore((s) => s.appState.activeTool);
  const snapshot = app.useStore();
  const { document } = snapshot;

  const tagList = useSelector((state: any) => state.tag.tagList);
  const recommendedTagList = useSelector(
    (state: any) => state.tag.recommendedTagList
  );

  /**
   * 메인페이지로 이동하는 로직
   */
  const moveMainPage = () => {
    navigate("/main");
  };

  const moveWorkSpacePage = (id: string): void => {
    console.log(id);
    window.location.href = `/workspace/${id}`;
    // navigate(`/workspace/${id}`);
  };

  /**
   * 추천 태그 클릭 시 저장하는 로직
   */
  const saveRecommendedTag = (name: string) => {
    const popRecommendedTagList = [...recommendedTagList].filter(
      (tag) => tag !== name
    );
    dispatch(tagListActions.postTag({ name, workspaceId }));
    dispatch(tagListActions.setRecommendedTagList(popRecommendedTagList));
  };

  /**
   * 태그 삭제 로직
   */
  const deleteTag = (tagId: string, workspaceId: string) => {
    dispatch(tagListActions.deleteTag({ tagId, workspaceId }));
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
      dispatch(tagListActions.patchTag({ tagId, tagName: value, workspaceId }));
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
      patchTag(inputRef?.current?.value, tagInfo.tagId, tagInfo.workspaceId),
    isPatchTag.state
  );

  useOnClickOutside(divRef, () => setIsViewRelatedPopup(false));

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
  const saveContentToDB = useDebouncedCallback((document) => {
    const editorEl = window.document.getElementById("tldrawEditor");
    if (!editorEl) {
      return;
    }

    html2canvas(editorEl).then((editorCanvas) => {
      editorCanvas.toBlob((blob) => {
        if (!blob) {
          console.log("no blob");
          return;
        }
        const formData = new FormData();
        formData.append("file", blob, `${workspaceId}.png`);
        axios
          .post(`/api/workspace/${workspaceId}/thumbnail`, formData)
          .then((res) => {
            console.log("thumbnail saved");
          })
          .catch((err) => {
            console.error("thumnail capture failed");
          });
      });
    });

    axios
      .patch(`/api/workspace/${workspaceId}`, {
        content: document,
      })
      .then((res) => {
        console.log("content saved");
      })
      .catch((err) => {
        console.log(err);
      });
  }, 1000);

  const handleRelatedPopup = () => {
    setIsViewRelatedPopup((prev) => !prev);
  };
  /**
   * 추천 태그 불러오는 useEffect
   */
  useEffect(() => {
    dispatch(tagListActions.setRecommendedTagList([]));
  }, []);

  /**
   * 워크스페이스 태그 목록 불러와서 보여주는 useEffect
   */
  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/workspace/${workspaceId}`);
      const currentWorkspaceTagList = response.data.tags;

      dispatch(tagListActions.setTagList(currentWorkspaceTagList));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const workspaceResponse = await axios.get(`/api/workspace`);
      const currentWorkspaceResponse = await axios.get(
        `/api/workspace/${workspaceId}`
      );

      const workspaceList = workspaceResponse.data;
      const currentWorkspaceTagList = currentWorkspaceResponse?.data?.tags.map(
        (tag: any) => tag.name
      );

      const relatedWorkspaceList = workspaceList.filter(
        (workspace: IWorkspace) => {
          if (workspace.title === title) return false;

          const tags = workspace.tags.map((tag: any) => tag.name);

          for (let i = 0; i < tags.length; i++) {
            if (currentWorkspaceTagList.includes(tags[i])) {
              return true;
            }
          }
          return false;
        }
      );

      setRelatedWorkspaceList(relatedWorkspaceList);
    })();
  }, []);

  useEffect(() => {
    saveContentToDB(document);
  }, [document]);

  /**
   * 추천 태그 10초 interval useEffect
   */
  useEffect(() => {
    setInterval(async () => {
      const workspace = await axios.get(`/api/workspace/${workspaceId}`);
      const texts = extractTextsFromDocument(workspace.data.content);
      dispatch(
        tagListActions.getRecommendedTagList({ text: texts, workspaceId })
      );
    }, 10000);
  }, [workspaceId]);

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
        <FormGroup className="mb-0" switch>
          <Input
            className={styles.TagContainer__switch}
            type="switch"
            checked={isViewTagList}
            onClick={() => {
              setIsViewTagList((prev) => !prev);
            }}
          />
        </FormGroup>
        {isViewTagList && (
          <>
            <div className={cn("d-flex", "align-items-center", "flex-wrap")}>
              {tagList.map((tag: any, idx: number) =>
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
            </div>
            {tagList.length < 10 && isViewTagList && (
              <TagInput workspaceId={workspaceId} />
            )}
            {!!recommendedTagList.length && (
              <>
                <div className={styles.divider} />
                <div className={cn("d-flex", "align-items-center")}>
                  <span className={styles.RecommendedTag__title}>
                    Recommended :
                  </span>
                </div>
              </>
            )}
            <div className={styles.RecommendedTag__container}>
              {recommendedTagList.slice(0, 3)?.map((tag: any) => (
                <RecommendedTag
                  tagName={tag}
                  saveRecommendedTag={saveRecommendedTag}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.EditorMenu__related}>
        <span
          onClick={handleRelatedPopup}
          className={styles.EditorMenu__related__text}
        >
          Related
          <br /> Memos
        </span>
      </div>
      {isViewRelatedPopup && (
        <div ref={divRef} className={styles.EditorMenu__related__popup}>
          {relatedWorkspaceList.map((workspace: IWorkspace) => (
            <SimpleWorkspace
              key={workspace._id}
              uid={workspace._id}
              title={workspace.title}
              tagList={workspace.tags}
              moveWorkSpacePage={moveWorkSpacePage}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default EditorMenu;
