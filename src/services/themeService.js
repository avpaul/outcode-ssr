import { BehaviorSubject } from "rxjs";

/** 
 * check for theme value in local storage
 * if no theme in local storage add it and set the theme value to light
 */
const getTheme = () => {
  if (localStorage.getItem("theme")) return localStorage.getItem("theme");
  localStorage.setItem("theme", "light");
  return "light";
};
const subscriber = new BehaviorSubject(getTheme());

/**
 * set receives a theme value, updates the cache and dispatches the new value
 */
const themeUpdateService = {
  set: theme => {
    localStorage.setItem("theme", theme);
    subscriber.next(theme);
  }
};

export { subscriber, themeUpdateService };
