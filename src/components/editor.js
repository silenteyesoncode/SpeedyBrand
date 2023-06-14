import React, { useRef } from "react";
import JoditEditor from "jodit-react";
// import "./styles.css";

const Editor = (props) => {
  const editor = useRef(null);
  const config = {
    readonly: false,
    height: 400
  };

  return (
    <div className="App">
      <JoditEditor
        ref={editor}
        value={props.value}
        config={config}
        onBlur={props.onBlur}
        onChange={props.onChange}
        // onChange={(newContent) => {}}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: props.value }} /> */}
    </div>
  );
}

export default Editor;