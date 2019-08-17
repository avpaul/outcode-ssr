import axios from "axios";

const getMainArticles = async ({ page = 0, limit = 6 }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/articles?page=${page}&limit=${limit}`,
      {}
    );
    return data;
  } catch (error) {
    return error;
  }
};

const getPublishedArticles = async ({ page = 0, limit = 6 }) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_API_URL
      }/articles/published?page=${page}&limit=${limit}`,
      {
        headers: { authorization: `Bearer ${token}` },
        "Content-Type": "application/json"
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const getDraftArticles = async ({ page = 0, limit = 6 }) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_API_URL
      }/articles/drafts?page=${page}&limit=${limit}`,
      {
        headers: { authorization: `Bearer ${token}` },
        "Content-Type": "application/json"
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const getArticle = async slug => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/articles/${slug}`,
      {}
    );
    return data;
  } catch (error) {
    return error;
  }
};

const deleteArticle = async slug => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/articles/${slug}`,
      {}
    );
    return data;
  } catch (error) {
    return error;
  }
};

export {
  getMainArticles,
  getPublishedArticles,
  getDraftArticles,
  getArticle,
  deleteArticle
};
