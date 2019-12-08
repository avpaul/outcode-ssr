export const CHANGE_MASS = 'CHANGE_MASS';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_SLUG = 'CHANGE_SLUG';
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const CHANGE_BODY = 'CHANGE_BODY';
export const CHANGE_BODY_HTML = 'CHANGE_BODY_HTML';
export const CHANGE_TAGS = 'CHANGE_TAGS';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const CHANGE_FEATURED_IMG = 'CHANGE_FEATURED_IMG';
export const SET_ERRORS = 'SET_ERRORS';
export const CHANGE_IMAGE_UPLOADED = 'CHANGE_IMAGE_UPLOADED';
export const CHANGE_EDITOR_PREVIEW = 'CHANGE_EDITOR_PREVIEW';
export const CHANGE_IS_SAVING = 'CHANGE_IS_SAVING';

/**
 *
 * @param {object} state
 * @param {{string, any}} action
 */
export function reducer(state, { type, payload }) {
  switch (type) {
    case CHANGE_MASS:
      return { ...state, ...payload };
    case CHANGE_SLUG:
      return { ...state, slug: payload };
    case CHANGE_TITLE:
      return { ...state, title: payload };
    case CHANGE_DESCRIPTION:
      return { ...state, description: payload };
    case CHANGE_BODY:
      return { ...state, content: payload };
    case CHANGE_BODY_HTML:
      return { ...state, html: payload };
    case CHANGE_TAGS:
      return { ...state, tags: payload };
    case CHANGE_BODY:
      return { ...state, content: payload };
    case CHANGE_STATUS:
      return { ...state, status: payload };
    case CHANGE_FEATURED_IMG:
      return { ...state, featuredImage: payload };
    case SET_ERRORS:
      return { ...state, errors: { ...state.errors, ...payload } };
    case CHANGE_IMAGE_UPLOADED:
      return { ...state, imageUploaded: !state.imageUploaded };
    case CHANGE_IS_SAVING:
      return { ...state, isSaving: !state.isSaving };
    case CHANGE_EDITOR_PREVIEW:
      return { ...state, preview: !state.preview };
    default:
      return state;
  }
}
