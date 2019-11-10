import React, { useState, useRef, Fragment, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import convertMarkdown from '../src/helpers/markdownConverter';
import saveArticle from '../src/api/editor';
import Article from '../components/article/article';
import Chips from '../components/chips/chips';
import upLoader from '../src/helpers/imageUploader';
import { getTitle, getDescription } from '../src/helpers/getArticleParts';
import { getArticle } from '../src/api/article.js';
import './styles/editor.scss';

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
  font-family: 'Avenir';
  color: #17223b;
  border-bottom: #17223b 1px solid;
  @media (prefers-color-scheme: dark) {
    color: #ffffff;
    border-bottom-color: #f9a602;
  }
`;

const Editor = ({ history }) => {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const [contentHTML, setContentHTML] = useState('<p>Tell your story...</p>');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('draft');
  const [slug, setSlug] = useState(null);
  const [description, setDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [chips, setChips] = useState([]);
  const [preview, setPreview] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const router = useRouter();
  const imageInput = useRef(null);
  const markdownInput = useRef(null);

  useEffect(() => {
    const { slug: updateSlug } = router.query;

    updateSlug &&
      getArticle(updateSlug)
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
  }, [router.query]);

  const uploadImage = async evt => {
    evt.preventDefault();
    const file = evt.target.files[0];
    try {
      const { default: imageURL } = await upLoader(file);
      setFeaturedImage(imageURL);
      return imageURL;
    } catch (error) {
      setErrors({ image: 'image upload failed', ...errors });
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
          console.log(error);
        });
    }
  };

  const onPublish = () => {
    setStatus('published');
    saveArticle({
      content,
      tags: chips,
      title,
      description,
      featuredImage,
      status: 'published',
      slug
    })
      .then(({ data: article }) => {
        router.push(`/${article.slug}`);
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
    <>
      <Head>
        <title key="title">{title || 'Start writing ✍️'}</title>
      </Head>
      <Container>
        <div className="editor-status">
          {imageUploaded && (
            <div className="toast">
              <i className="zmdi zmdi-check" />
              &nbsp; Image uploaded!
            </div>
          )}
          {saveStatus ? (
            <EditStatus>
              <i className="zmdi zmdi-check"></i>&nbsp;Saved
            </EditStatus>
          ) : (
            <EditStatus>
              <i className="zmdi zmdi-edit"></i>&nbsp;Editing
            </EditStatus>
          )}
        </div>
        <div className="editor-actions" onScroll={() => {}}>
          <button
            title="Preview Article"
            className="btn-editor-preview"
            onClick={() => {
              setPreview(!preview);
            }}
          >
            <i className={`zmdi zmdi-${!preview ? 'eye' : 'edit'}`} />
          </button>
          <button
            title="Add Image"
            className="btn-editor-upload"
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
            className="btn-publish"
            disabled={slug === null || status === 'published' ? true : false}
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
    </>
  );
};

export default Editor;
