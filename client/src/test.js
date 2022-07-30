import React, {useState, useCallback, useMemo} from 'react';
import {createEditor, Editor, Transforms, Text, Node} from 'slate';
import {Slate, Editable, withReact} from 'slate-react'; 

const serialize = value => {
    return (
      value
        // Return the string content of each paragraph in the value's children.
        .map(n => Node.string(n))
        // Join them all with line breaks denoting paragraphs.
        .join('\n')
    )
  }
  
  // Define a deserializing function that takes a string and returns a value.
  const deserialize = string => {
      if(string == null) return [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ];
    // Return a value array of children derived by splitting the string.
    return string.split('\n').map(line => {
      return {
        children: [{ text: line }],
      }
    })
  }

const CustomEditor = {
    isBoldMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true,
      })
  
      return !!match
    },
  
    isCodeBlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })
  
      return !!match
    },
  
    toggleBoldMark(editor) {
      const isActive = CustomEditor.isBoldMarkActive(editor)
      Transforms.setNodes(
        editor,
        { bold: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
      )
    },
  
    toggleCodeBlock(editor) {
      const isActive = CustomEditor.isCodeBlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },
}
  
  const App = () => {
    const [editor] = useState(() => withReact(createEditor()))
    // const [context, setContext] = useState(''); 
    
    /*
    const initialValue = useMemo(
        () => deserialize(localStorage.getItem('content')) || '',
        []
    )
    */
   
    const initialValue = useMemo(
        () =>
          JSON.parse(localStorage.getItem('content')) || [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }],
            },
          ],
        []
      )
      
    const renderElement = useCallback(props => {
      switch (props.element.type) {
        case 'code':
          return <CodeElement {...props} />
        default:
          return <DefaultElement {...props} />
      }
    }, [])
  
    // Define a leaf rendering function that is memoized with `useCallback`.
    const renderLeaf = useCallback(props => {
      return <Leaf {...props} />
    }, [])
  
    return (
        <Slate 
        editor={editor} 
        value={initialValue}
        onChange={value => {
            const isAstChange = editor.operations.some(
              op => 'set_selection' !== op.type
            )
            if (isAstChange) {
              //  setContext(value); 
              // Save the value to Local Storage.
              // localStorage.setItem('content', serialize(value))
              const content = JSON.stringify(value)
              localStorage.setItem('content', content)
        }}}
        >
        <div>
          <button
            onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
            }}
          >
            Bold
          </button>
          <button
            onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
            }}
          >
            Code Block
          </button>
        </div>
        <Editable
          editor={editor}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={event => {
            if (!event.ctrlKey) {
              return
            }
  
            switch (event.key) {
              case '`': {
                event.preventDefault()
                CustomEditor.toggleCodeBlock(editor)
                break
              }
  
              case 'b': {
                event.preventDefault()
                CustomEditor.toggleBoldMark(editor)
                break
              }
            }
          }}
        />
      </Slate>
    )
  }
  
const CodeElement = props => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}

const Leaf = props => {
    return (
        <span
            {...props.attributes}
            style={{fontWeight: props.leaf.bold ? 'bold' : 'normal'}}
        >
            {props.children}
        </span>
    )
}

export default App

/*
// Import React dependencies.
import React, { useState } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

// Add the initial value.
const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
  
  const App = () => {
    const [editor] = useState(() => withReact(createEditor()))
  
    return (
      <Slate editor={editor} value={initialValue}>
        <Editable />
      </Slate>
    )
  }

export default App
*/