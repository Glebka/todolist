class EventsManager {

    constructor() {
        this._subscribers = {};
    }

    emitEvent(sender, eventName, eventData) {
        var subscribers = this._subscribers[eventName];
        if (subscribers) {
            for(var i=0; i<subscribers.length; i++) {
                var callback = subscribers[i];
                callback(sender, eventName, eventData);
            }
        }            
    }

    subscribeToEvent(eventName, callback) {
        if (this._subscribers[eventName]) {
            this._subscribers[eventName].push(callback);
        } else {
            this._subscribers[eventName] = [callback];
        }
    }

}

/**
 * var eventsManager = new EventManager();
 * ------------Подписчик, хочу получить уведомление 'todoItemChanged'-----
 * eventsManager.subscribeToEvent('todoItemChanged', function(sender, eventName, eventData) {
 *  //.....
 * })
 * 
 * ---- Я компонента, которая хочет отправить событие ----
 * eventsManager.emitEvent(this, 'todoItemChanged', {.....});
 */