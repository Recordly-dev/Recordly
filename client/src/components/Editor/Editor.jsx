import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Toolbar, Icon } from "../Components/Components";
import { MarkButton, BlockButton, Leaf } from "../RichText/RichText";
import { Editable, withReact, Slate } from "slate-react";
import {
  Image,
  withImages,
  InsertImageButton,
} from "../ImageUploader/ImageUploader";
import { useDebouncedCallback } from "use-debounce";

import { initialContent } from "constants/editor";
import usePrompt from "hooks/usePrompt";
import { css, cx } from "@emotion/css";
import axios from "axios";

const Editor = () => {
  const navigate = useNavigate();

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const [editor] = useState(() => withReact(createEditor()));

  const location = useLocation();
  const workspaceId = location.pathname.split("/").at(-1);

  const saveContent = () => {};

  usePrompt("현재 페이지를 벗어나시겠습니까?", true, saveContent);

  // let initialValue = JSON.parse(localStorage.getItem("content")) || [];
  //   []
  // );

  const initialValue = useMemo(() => {
    return JSON.parse(localStorage.getItem("content")) || initialContent;
  }, []);

  // const localContent = JSON.parse(localStorage.getItem("content"));
  // if (localContent) return localContent;

  // useEffect(() => {
  // if (initialValue.length === 0) {
  //   console.log("111");
  //   axios.get(`/api/workspace/${workspaceId}`).then((res) => {
  //     if (!res.data.content) {
  //       console.log("!!!!");
  //       initialValue = initialContent;
  //     } else {
  //       console.log("????");
  //       initialValue = res.data.content;
  //     }
  //   });
  // }
  // }, []);

  // console.log("????");
  // console.log(res.data.content);
  // return res.data.content;

  // .then((res) => {
  //
  // })
  // .catch((err) => {
  //   console.log(err);
  //   return initialContent;
  // });
  // }, []);

  const onChangeContent = useDebouncedCallback((value) => {
    console.log("hihi");
    const content = JSON.stringify(value);
    localStorage.setItem("content", content);
    axios
      .patch(`/api/workspace/${workspaceId}`, {
        content,
      })
      .then((req, res) => {
        console.log("content saved");
      })
      .catch((err) => {
        console.err(err);
      });
  }, 500);

  // const onChangeContent = (value) => {
  //   const isAstChange = editor.operations.some(
  //     (op) => op.type !== "set_selection"
  //   );
  //   console.log(isAstChange);
  //   if (isAstChange) {
  //     console.log("hihi");
  //     const content = JSON.stringify(value);
  //     localStorage.setItem("content", content);
  //     axios
  //       .patch(`/api/workspace/${workspaceId}`)
  //       .then((req, res) => {
  //         console.log("content saved");
  //       })
  //       .catch((err) => {
  //         console.err(err);
  //       });
  //   }
  // };

  return (
    <AppWrap>
      <Slate editor={editor} value={initialValue} onChange={onChangeContent}>
        <div className="banner">
          <Savebar>
            <Input placeholder="Title Input" />
            <Button>
              <Icon>save</Icon>
            </Button>
          </Savebar>
          <Toolbar>
            <MarkButton format="bold" icon="format_bold" />
            <MarkButton format="italic" icon="format_italic" />
            <MarkButton format="underline" icon="format_underlined" />
            <MarkButton format="code" icon="code" />
            <BlockButton format="heading-one" icon="looks_one" />
            <BlockButton format="heading-two" icon="looks_two" />
            <BlockButton format="block-quote" icon="format_quote" />
            <BlockButton format="numbered-list" icon="format_list_numbered" />
            <BlockButton format="bulleted-list" icon="format_list_bulleted" />
            <BlockButton format="left" icon="format_align_left" />
            <BlockButton format="center" icon="format_align_center" />
            <BlockButton format="right" icon="format_align_right" />
            <BlockButton format="justify" icon="format_align_justify" />
            <InsertImageButton />
          </Toolbar>
        </div>

        <DocumentWrap>
          <DocumentMain>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some rich text…"
              spellCheck
              autoFocus
            />
          </DocumentMain>
        </DocumentWrap>
      </Slate>
    </AppWrap>
  );
};

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  const props = { attributes, children, element };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case "image":
      return <Image {...props} />;
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const DocumentWrap = React.forwardRef(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={cx(className, css``)}></div>
));

const DocumentMain = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        height: 1056px;
        width: 816px;
        padding: 15px;
        background-color: white;
      `
    )}
  ></div>
));

const AppWrap = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      `
    )}
  ></div>
));

const Savebar = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        position: relative;
        width: 816px;
        padding: 1px 18px 7px;
        margin: 0 -20px;
        border-bottom: 2px solid #eee;
        margin-bottom: 20px;
      `
    )}
  ></div>
));

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        border: 1px solid transparent;
        border-radius: 2px !important;
        font-size: 18px;
        font-variant-ligatures: no-contextual;
        height: 20px;
        line-height: 22px;
        margin: 0;
        min-width: 1px;
        padding: 2px 7px;
        &:hover {
          outline: solid;
        }
      `
    )}
  ></input>
));

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        border: 0;
        background: none;
      `
    )}
  ></button>
));

export default Editor;
