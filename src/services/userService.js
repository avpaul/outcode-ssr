import { BehaviorSubject } from "rxjs";

/**
 * check for the token value in local storage
 * if no token is set, return null
 */
const getToken = () => {
  if (localStorage.getItem("token")) return localStorage.getItem("token");
  return null;
};
const subscriber = new BehaviorSubject(getToken());

/**
 * set receives a theme value, updates the cache and dispatches the new value
 */
const tokenUpdateService = {
  set: token => {
    localStorage.setItem("token", token);
    subscriber.next(token);
  }
};

export { subscriber, tokenUpdateService };
