import React, { useState, useRef, Fragment, useEffect } from "react";
import styled, { css } from "styled-components";
import convertMarkdown from "../../helpers/markdownConverter";
import saveArticle from "../../api/editor";
import Article from "../articleComponent/article";
import Chips from "../chips/chips";
import upLoader from "../../helpers/imageUploader";
import { getTitle, getDescription } from "../../helpers/getArticleParts";
import { subscriber } from "../../services/updateArticleService";
import { subscriber as themeSubscriber } from "../../services/themeService";
import { getArticle } from "../../api/article.js";
import "./editor.scss";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 650px;
`;

const EditStatus = styled.div`
  padding: 8px 8px 4px;
  margin-right: 4px;
  margin-left: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 200;
  font-family: "Avenir";
  color: #17223b;
  border-bottom: #17223b 1px solid;
  ${props =>
    props.theme === "dark" &&
    css`
      color: #ffffff;
      border-bottom-color: #f9a602;
    `}
`;

const Editor = ({ history }) => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [contentHTML, setContentHTML] = useState("<p>Tell your story...</p>");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("draft");
  const [slug, setSlug] = useState(null);
  const [description, setDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [chips, setChips] = useState([]);
  const [preview, setPreview] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [theme, seTheme] = useState(themeSubscriber.value);
  const [saveStatus, setSaveStatus] = useState(false);
  const imageInput = useRef(null);
  const markdownInput = useRef(null);

  useEffect(() => {
    document.title = title ? title : "Start writing ✍️";
    return () => {
      document.title = "Outcode by Paul";
    };
  }, [title]);

  useEffect(() => {
    subscriber.subscribe(slug => {
      slug &&
        getArticle(slug)
          .then(({ data: article }) => {
            setContent(article.content);
            setChips(article.tags);
            setSlug(article.slug);
            setStatus(article.status);
            setTitle(article.title);
            setDescription(article.description);
            setContentHTML(convertMarkdown(article.content));
          })
          .catch(error => {});
    });
    themeSubscriber.subscribe(value => {
      seTheme(value);
    });
  }, []);

  const uploadImage = async evt => {
    evt.preventDefault();
    const file = evt.target.files[0];
    try {
      const { default: imageURL } = await upLoader(file);
      setFeaturedImage(imageURL);
      return imageURL;
    } catch (error) {
      setErrors({ image: "image upload failed", ...errors });
    }
  };

  const onChange = evt => {
    setSaveStatus(false);
    const HTMLContent = convertMarkdown(evt.target.value);
    const newTitle = getTitle(HTMLContent);
    const newDescription = getDescription(HTMLContent);

    setContentHTML(HTMLContent);
    setContent(evt.target.value);
    setTitle(newTitle);
    setDescription(newDescription);

    if (title.length !== 0) {
      saveArticle({
        content: evt.target.value,
        tags: chips,
        title: newTitle,
        description: newDescription,
        featuredImage,
        status,
        slug
      })
        .then(({ data: article }) => {
          setSlug(article.slug);
          setStatus(article.status);
          setSaveStatus(true);
        })
        .catch(error => {
          // if (process.env.REACT_APP_ENVIRONMENT === "development") {
          console.log(error);
          // }
        });
    }
  };

  const onPublish = () => {
    setStatus("published");
    saveArticle({
      content,
      tags: chips,
      title,
      description,
      featuredImage,
      status: "published",
      slug
    })
      .then(({ data: article }) => {
        history.push(`/${article.slug}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onUploadImage = evt => {
    uploadImage(evt).then(url => {
      setImageUploaded(true);
      navigator.clipboard.writeText(url).then(
        setTimeout(() => {
          setImageUploaded(false);
        }, 5000)
      );
    });
  };

  return (
    <Container>
      <div className="editor-status">
        {imageUploaded && (
          <div className={`toast ${theme === "dark" ? "theme-dark" : ""}`}>
            <i className="zmdi zmdi-check" />
            &nbsp; Image uploaded!
          </div>
        )}
        {saveStatus ? (
          <EditStatus theme={theme}>
            <i className="zmdi zmdi-check"></i>&nbsp;Saved
          </EditStatus>
        ) : (
          <EditStatus theme={theme}>
            <i className="zmdi zmdi-edit"></i>&nbsp;Editing
          </EditStatus>
        )}
      </div>
      <div className="editor-actions" onScroll={() => {}}>
        <button
          title="Preview Article"
          className={`btn-editor-preview ${
            theme === "dark" ? "theme-dark" : ""
          }`}
          onClick={() => {
            setPreview(!preview);
          }}
        >
          <i className={`zmdi zmdi-${!preview ? "eye" : "edit"}`} />
        </button>
        <button
          title="Add Image"
          className={`btn-editor-upload ${
            theme === "dark" ? "theme-dark" : ""
          }`}
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
          onChange={onUploadImage}
        />
        <button
          title="Publish Article"
          className={`btn-publish ${theme === "dark" ? "theme-dark" : ""}`}
          disabled={slug === null || status === "published" ? true : false}
          onClick={onPublish}
        >
          <i className="zmdi zmdi-file-text" />
        </button>
      </div>
      {!preview ? (
        <Fragment>
          <textarea
            className={`article-editor--container ${
              theme === "dark" ? "theme-dark" : ""
            }`}
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
            theme={theme}
          />
        </Fragment>
      ) : (
        <div className="article-editor--view">
          <Article content={contentHTML} tags={chips} theme={theme} />
        </div>
      )}
    </Container>
  );
};

export default Editor;
