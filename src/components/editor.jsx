import React, { useState } from "react";
import styled from "styled-components";
import convertMarkdown from "../helpers/markdownConverter";

const Container = styled.div`
  width: 100%;
  min-height: 500px;
  iframe {
    width: 100%;
    min-height: 100%;
  }
`;

const Editor = () => {
  const [content, setContent] = useState("");
  const [contentHTML, setContentHTML] = useState("");

  return (
    <Container>
      <textarea
        name="markdown-editor"
        id=""
        cols="30"
        rows="10"
        placeholder="Your story"
        onChange={evt => {
          evt.preventDefault();
          setContentHTML(convertMarkdown(evt.target.value));
        }}
      />
      <div>{contentHTML}</div>
    </Container>
  );
};

export default Editor;
