import activateViewService from "../../services/analyticsService";

export default ({ location: { pathname, search } }) => {
  activateViewService(pathname + search);
  return null;
};
