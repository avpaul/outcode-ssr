import axios from 'axios';
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  withCredentials: true,
});

const getMainArticles = async ({ page = 0, limit = 6 }) => {
  try {
    const { data } = await axiosInstance.get(
      `${process.env.APP_API_URL}/articles?page=${page}&limit=${limit}`,
      {}
    );
    return data;
  } catch (error) {
    return { error: error.response || error };
  }
};

const getPublishedArticles = async ({ page = 0, limit = 6 }) => {
  try {
    const token = localStorage.getItem('token');
    const { data, status } = await axiosInstance.get(
      `${process.env.APP_API_URL}/articles/published?page=${page}&limit=${limit}`,
      {
        headers: { authorization: `Bearer ${token}` },
        'Content-Type': 'application/json',
      }
    );
    return data;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      if (status === 401) {
        return { error: 'Unauthorized', data };
      }
    }
    return { error: error.response || error };
  }
};

const getDraftArticles = async ({ page = 0, limit = 6 }) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axiosInstance.get(
      `${process.env.APP_API_URL}/articles/drafts?page=${page}&limit=${limit}`,
      {
        headers: { authorization: `Bearer ${token}` },
        'Content-Type': 'application/json',
      }
    );
    return data;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      if (status === 401) {
        return { error: 'Unauthorized', data };
      }
    }
    return { error: error.response || error };
  }
};

const getArticle = async (slug) => {
  try {
    const { data } = await axiosInstance.get(
      `${process.env.APP_API_URL}/articles/${slug}`,
      {}
    );
    return data;
  } catch (error) {
    return { error: error.response || error };
  }
};

const deleteArticle = async (slug) => {
  const token = localStorage.getItem('token');

  try {
    const { data } = await axiosInstance.delete(
      `${process.env.APP_API_URL}/articles/${slug}`,
      {
        headers: { authorization: `Bearer ${token}` },
        'Content-Type': 'application/json',
      }
    );
    return data;
  } catch (error) {
    return { error: error.response || error };
  }
};

export {
  getMainArticles,
  getPublishedArticles,
  getDraftArticles,
  getArticle,
  deleteArticle,
};
