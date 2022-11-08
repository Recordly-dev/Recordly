import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { useDispatch } from "store";
import { useNavigate } from "react-router";
import { actions as tagListActions } from "store/slice/tagSlice";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import TagInput from "../TagInput";

import { TDShapeType, TldrawApp } from "@tldraw/tldraw";

import { useDebouncedCallback } from "use-debounce";
import useInputOnClickOutside from "hooks/useInputOnClickOutside";
import { extractTextsFromDocument } from "../../../../utils/tldraw";

import styles from "./EditorMenu.module.scss";

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
      const currentWorkspace = await axios.get(`/api/workspace/${workspaceId}`);

      dispatch(tagListActions.setTagList(currentWorkspace.data.tags));
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
        <Button color="outline-dark" onClick={moveMainPage}>
          Go To Main
        </Button>
        <h6>{title}</h6>
      </div>
      {/* Tool Controls */}
      <div className={styles.EditorMenu__top}>
        <Button
          style={{
            fontWeight: activeTool === "select" ? 600 : 400,
          }}
          onClick={() =>
            // Select the tool on click
            app.selectTool("select")
          }
          color="outline-dark"
        >
          Select
        </Button>
        <Button
          style={{
            fontWeight: activeTool === TDShapeType.Rectangle ? 600 : 400,
          }}
          onClick={() => app.selectTool(TDShapeType.Rectangle)}
          color="outline-dark"
        >
          Rectangle
        </Button>
        <Button
          style={{ fontWeight: activeTool === TDShapeType.Arrow ? 600 : 400 }}
          onClick={() => app.selectTool(TDShapeType.Arrow)}
          color="outline-dark"
        >
          Arrow
        </Button>
        <Button
          style={{ fontWeight: activeTool === TDShapeType.Draw ? 600 : 400 }}
          onClick={() => app.selectTool(TDShapeType.Draw)}
          color="outline-dark"
        >
          Draw
        </Button>
        <Button
          style={{ fontWeight: activeTool === TDShapeType.Text ? 600 : 400 }}
          onClick={() => app.selectTool(TDShapeType.Text)}
          color="outline-dark"
        >
          Text
        </Button>
        <Button
          style={{
            fontWeight: activeTool === TDShapeType.Sticky ? 600 : 400,
          }}
          onClick={() => app.selectTool(TDShapeType.Sticky)}
          color="outline-dark"
        >
          Sticky
        </Button>
        <Button onClick={() => app.openAsset()} color="outline-dark">
          Image
        </Button>
        <Button
          style={{ fontWeight: activeTool === "erase" ? 600 : 400 }}
          onClick={() => app.selectTool("erase")}
          color="outline-dark"
        >
          Erase
        </Button>
      </div>
      <div className={styles.TagContainer}>
        <FormGroup switch>
          <Input
            className={styles.TagContainer__switch}
            type="switch"
            checked={isViewTagList}
            onClick={() => {
              setIsViewTagList((prev) => !prev);
            }}
          />
          {/* <Label check>Watch Tags</Label> */}
        </FormGroup>
        {isViewTagList && (
          <>
            <div className={styles.TagList}>
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
                  <div className={styles.Tag}>
                    <div
                      className={styles.Tag__name}
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        handlePatchTagState(
                          tag.name,
                          tag?._id,
                          workspaceId,
                          idx
                        )
                      }
                    >
                      <span>#</span>
                      <span>{tag?.name}</span>
                    </div>

                    <div
                      className={styles.Tag__deleteButton}
                      onClick={() => deleteTag(tag?._id, workspaceId)}
                    >
                      X
                    </div>
                  </div>
                )
              )}
            </div>
            <div className={styles.TagList}>
              {recommendedTagList.slice(0, 3)?.map((tag: any) => (
                <div
                  className={styles.RecommendedTag}
                  color="primary"
                  onClick={() => saveRecommendedTag(tag)}
                >
                  <span className={styles.RecommendedTag__text}>{tag}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {tagList.length < 10 && isViewTagList && (
          <TagInput workspaceId={workspaceId} />
        )}
      </div>
    </>
  );
};

export default EditorMenu;
