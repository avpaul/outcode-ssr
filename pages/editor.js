import React, { useRef, Fragment, useEffect, useReducer } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import convertMarkdown from '../src/helpers/markdownConverter';
import saveArticle from '../src/api/editor';
import Article from '../components/article/article';
import Chips from '../components/chips/chips';
import upLoader from '../src/helpers/imageUploader';
import { getTitle, getDescription } from '../src/helpers/getArticleParts';
import { cookieParser } from '../src/helpers';
import { getArticle } from '../src/api/article.js';
import './styles/editor.scss';
import {
  reducer,
  CHANGE_FEATURED_IMG,
  SET_ERRORS,
  CHANGE_EDITOR_PREVIEW,
  CHANGE_MASS,
  CHANGE_TAGS
} from '../components/editorComponent/editorReducer';

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
  font-family: inherit;
  color: #17223b;
  border-bottom: #17223b 1px solid;
  @media (prefers-color-scheme: dark) {
    color: #ffffff;
    border-bottom-color: #f9a602;
  }
`;

const Editor = ({ article }) => {
  const initialState = {
    preview: false,
    html: '<p>Tell your story...</p>',
    status: 'draft',
    content: '',
    tags: []
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const imageInput = useRef(null);
  const markdownInput = useRef(null);

  useEffect(() => {
    if (article) {
      dispatch({
        type: CHANGE_MASS,
        payload: {
          slug: article.slug,
          tags: article.tags,
          status: article.status,
          title: article.title,
          content: article.content,
          description: article.description,
          html: convertMarkdown(article.content)
        }
      });
    }
  }, [article]);

  const uploadImage = async evt => {
    evt.preventDefault();
    const file = evt.target.files[0];
    try {
      const { default: imageURL } = await upLoader(file);
      return imageURL;
    } catch (error) {
      return error;
    }
  };

  const onChange = evt => {
    const html = convertMarkdown(evt.target.value);
    const title = getTitle(html);
    const description = getDescription(html);
    dispatch({
      type: CHANGE_MASS,
      payload: {
        content: evt.target.value,
        html,
        title,
        description,
        isSaving: false
      }
    });

    if (!!state.title) {
      saveArticle({
        content: evt.target.value,
        tags: state.tags,
        title,
        description,
        featuredImage: state.featuredImage,
        status: state.status,
        slug: state.slug
      })
        .then(({ data: article }) => {
          dispatch({
            type: CHANGE_MASS,
            payload: {
              slug: article.slug,
              status: article.status,
              isSaving: true
            }
          });
        })
        .catch(error => {
          dispatch({
            type: SET_ERRORS,
            payload: { article: error.message || 'Saving article failed!' }
          });
        });
    }
  };

  const onPublish = () => {
    saveArticle({
      content: state.content,
      tags: state.tags,
      title: state.title,
      description: state.description,
      featuredImage: state.featuredImage,
      status: 'published',
      slug: state.slug
    })
      .then(({ data: article }) => {
        router.push(`/${article.slug}`);
      })
      .catch(error => {
        dispatch({
          type: SET_ERRORS,
          payload: { article: error.message || 'Publishing article failed!' }
        });
      });
  };

  const onUploadImage = evt => {
    uploadImage(evt)
      .then(url => {
        dispatch({ type: CHANGE_FEATURED_IMG, payload: imageURL });
        dispatch({ type: CHANGE_IMAGE_UPLOADED });
        navigator.clipboard.writeText(url).then(
          setTimeout(() => {
            dispatch({ type: CHANGE_IMAGE_UPLOADED });
          }, 5000)
        );
      })
      .catch(() => {
        dispatch({
          type: SET_ERRORS,
          payload: { image: 'image upload failed' }
        });
      });
  };

  return (
    <>
      <Head>
        <title key="title">{state.title || 'Start writing ✍️'}</title>
      </Head>
      <Container>
        <div className="editor-status">
          {state.imageUploaded && (
            <div className="toast">
              <i className="zmdi zmdi-check" />
              &nbsp; Image uploaded!
            </div>
          )}
          {state.isSaving ? (
            <EditStatus>
              <i className="zmdi zmdi-check"></i>&nbsp;&nbsp;Saved
            </EditStatus>
          ) : (
            <EditStatus>
              <i className="zmdi zmdi-edit"></i>&nbsp;&nbsp;Editing
            </EditStatus>
          )}
        </div>
        <div className="editor-actions" onScroll={() => {}}>
          <button
            title="Preview Article"
            className="btn-editor-preview"
            onClick={() => dispatch({ type: CHANGE_EDITOR_PREVIEW })}
          >
            <i className={`zmdi zmdi-${!state.preview ? 'eye' : 'edit'}`} />
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
            disabled={
              state.slug === undefined || state.status === 'published'
                ? true
                : false
            }
            onClick={onPublish}
          >
            <i className="zmdi zmdi-file-text" />
          </button>
        </div>
        {!state.preview ? (
          <Fragment>
            <textarea
              className="article-editor--container"
              placeholder="Tell your story..."
              value={state.content}
              ref={markdownInput}
              onChange={onChange}
            />

            <Chips
              suggestion={[]}
              value={state.tags}
              onChange={values => {
                console.log(values);
                dispatch({ type: CHANGE_TAGS, payload: values });
              }}
            />
          </Fragment>
        ) : (
          <div className="article-editor--view">
            <Article content={state.html} tags={state.tags} />
          </div>
        )}
      </Container>
    </>
  );
};

Editor.getInitialProps = async ({ req, res, query: { slug } }) => {
  const cookieString = req.headers.cookie;
  const cookies = cookieParser(cookieString);
  if (!cookies.token) {
    res.writeHead(302, { Location: '/login' });
    res.end();
  }
  if (!!slug && !!slug.split('-', 2)[1]) {
    const { data, error } = await getArticle(slug);
    if (!!error && error.status === 404) {
      res.writeHead(302, { Location: '/notfound' });
      res.end();
    }
    return { article: data };
  }
  return {};
};

export default Editor;
