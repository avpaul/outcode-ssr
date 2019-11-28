import axios from 'axios';

const upLoader = file =>
  new Promise((resolve, reject) => {
    const data = new FormData();
    data.append('file', file, file.name);
    data.append('upload_preset', process.env.APP_COULDINARY_PRESET);
    data.append('tags', 'browser_upload');
    axios
      .post('https://api.cloudinary.com/v1_1/avpaul/upload', data, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      .then(response => {
        const { secure_url: url } = response.data;
        resolve({ default: url });
      })
      .catch(error => reject(error || "Couldn't upload the image"));
  });

export default upLoader;
