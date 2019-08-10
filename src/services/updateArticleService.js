import { BehaviorSubject } from "rxjs";

const subscriber = new BehaviorSubject(null);

const articleUpdateService = {
  send: function(slug) {
    subscriber.next(slug);
  }
};

export { articleUpdateService, subscriber };
