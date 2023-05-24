import { Subscription } from 'rxjs';

export function AutoUnsubscribe(): ClassDecorator {
  return (constructor: any) => {
    const originalNgOnDestroy = constructor.prototype.ngOnDestroy;

    const subscriptionsKey = '__autoSubscriptions';

    constructor.prototype.ngOnDestroy = function () {
      const subscriptions: Subscription[] = this[subscriptionsKey];

      if (subscriptions) {
        console.log(`Unsubscribing ${subscriptions.length} from subscriptions`);
        for (const subscription of subscriptions) {
          if (subscription && !subscription.closed) {
            subscription.unsubscribe();
          }
        }
      }

      if (originalNgOnDestroy && typeof originalNgOnDestroy === 'function') {
        originalNgOnDestroy.apply(this, arguments);
      }
    };

    const originalNgOnInit = constructor.prototype.ngOnInit;

    constructor.prototype.ngOnInit = function () {
      if (originalNgOnInit && typeof originalNgOnInit === 'function') {
        originalNgOnInit.apply(this, arguments);
      }

      const subscriptions: Subscription[] = this[subscriptionsKey] || [];

      for (const key of Object.getOwnPropertyNames(this)) {
        const property = this[key];

        if (property && property instanceof Subscription) {
          subscriptions.push(property);
        }
      }

      this[subscriptionsKey] = subscriptions;
    };
  };
}
