import React, { useState, useRef, Fragment } from "react";
import styled from "styled-components";
import convertMarkdown from "../../helpers/markdownConverter";
import saveArticle from "../../actions/editor";
import Article from "../articleComponent/article";
import Chips from "../chips/chips";
import upLoader from "../../helpers/imageUploader";
import "./editor.scss";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 650px;
`;

const Editor = () => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [contentHTML, setContentHTML] = useState("<p>Tell your story...</p>");
  const [chips, setChips] = useState([]);
  const [preview, setPreview] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const imageInput = useRef(null);
  const markdownInput = useRef(null);

  const uploadImage = async evt => {
    evt.preventDefault();
    const file = evt.target.files[0];
    try {
      const { default: imageURL } = await upLoader(file);
      return imageURL;
    } catch (error) {
      setErrors({ image: "image upload failed", ...errors });
    }
  };

  const onChange = evt => {
    setContentHTML(convertMarkdown(evt.target.value));
    setContent(evt.target.value);
    saveArticle({ content, tags: chips });
  };
  // const onChange = evt => {
  //   setContentHTML(convertMarkdown(markdownInput.current.innerText));
  //   setContent(markdownInput.current.innerText);
  //   saveArticle({ content, tags: chips });
  // };

  return (
    <Container>
      <div className="editor-status">
        {imageUploaded && (
          <div className="toast">
            <i className="zmdi zmdi-check" />
            &nbsp; Image uploaded!
          </div>
        )}
      </div>
      <div className="editor-actions">
        <button
          className="btn-editor-preview"
          onClick={() => {
            setPreview(!preview);
          }}
        >
          <i className={`zmdi zmdi-${!preview ? "eye" : "edit"}`} />
        </button>
        <button
          className="btn-editor-preview"
          onClick={evt => {
            evt.preventDefault();
            imageInput.current.click();
          }}
        >
          <i className="zmdi zmdi-image" />
        </button>
        <input
          type="file"
          name="image"
          hidden
          ref={imageInput}
          onChange={evt =>
            uploadImage(evt).then(url => {
              setImageUploaded(true);
              navigator.clipboard.writeText(url).then(
                setTimeout(() => {
                  setImageUploaded(false);
                }, 5000)
              );
            })
          }
        />
      </div>
      {!preview ? (
        <Fragment>
          {/* <ContentEditable
            className="article-editor--container"
            placeholder="Tell your story..."
            html={content}
            innerRef={markdownInput}
            onChange={onChange}
            tagName="textarea"
          /> */}
          <textarea
            className="article-editor--container"
            placeholder="Tell your story..."
            value={content}
            ref={markdownInput}
            onChange={onChange}
          />

          <Chips
            suggestion={[]}
            value={chips}
            onChange={values => {
              setChips([...values]);
            }}
          />
        </Fragment>
      ) : (
        <div className="article-editor--view">
          <Article content={contentHTML} tags={chips} />
        </div>
      )}
    </Container>
  );
};

export default Editor;
