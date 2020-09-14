import { FORM_ERROR } from 'gfw-components';
import { post } from 'axios';

const COMMENTS_URI = '/wp/v2/comments';

const requestWebinar = (body) => {
  post(`${process.env.WORDPRESS_GFW_API}${COMMENTS_URI}`, body)
    .then(() => {})
    .catch((error) => {
      const { errors } = error.response && error.response.data;

      return {
        [FORM_ERROR]:
          (errors && error.length && errors[0].detail) || 'Service unavailable',
      };
    });
};

export default requestWebinar;
