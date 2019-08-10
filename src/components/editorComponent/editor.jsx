import React, { useState, useRef, Fragment, useEffect } from "react";
import styled from "styled-components";
import convertMarkdown from "../../helpers/markdownConverter";
import saveArticle from "../../api/editor";
import Article from "../articleComponent/article";
import Chips from "../chips/chips";
import upLoader from "../../helpers/imageUploader";
import { getTitle, getDescription } from "../../helpers/getArticleParts";
import { subscriber } from "../../services/updateArticleService";
import { getArticle } from "../../api/article.js";
import "./editor.scss";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 650px;
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
  const imageInput = useRef(null);
  const markdownInput = useRef(null);

  useEffect(() => {
    subscriber.subscribe(slug => {
      slug &&
        getArticle(slug)
          .then(({ data: article }) => {
            setContent(article.content);
            setChips(article.tags);
            setSlug(article.slug);
            setStatus(article.status);
          })
          .catch(error => {});
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
    setContentHTML(convertMarkdown(evt.target.value));
    setContent(evt.target.value);
    setTitle(getTitle(contentHTML));
    setDescription(getDescription(contentHTML));
    if (title.length !== 0) {
      saveArticle({
        content,
        tags: chips,
        title,
        description,
        featuredImage,
        status,
        slug
      })
        .then(({ data: article }) => {
          setSlug(article.slug);
          setStatus(article.status);
        })
        .catch(error => {
          console.log(error);
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
        <button
          className="btn-publish"
          disabled={slug === null ? true : false}
          onClick={onPublish}
        >
          <i className="zmdi zmdi-file-text" />
        </button>
      </div>
      {!preview ? (
        <Fragment>
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
