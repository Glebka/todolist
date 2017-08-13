
'use strict';

class EventsManager {

    static _getInstance() {
        if (!EventsManager._instance) {
            EventsManager._instance = new EventsManager();            
        }
        return EventsManager._instance;
    }

    constructor() {
        this._subscribers = {};
    }

    static emitEvent(sender, eventName, eventData) {
        return EventsManager._getInstance()._do_emitEvent(sender, eventName, eventData);
    }

    static subscribeToEvent(eventName, callback) {
        return EventsManager._getInstance()._do_subscribeToEvent(eventName, callback);
    }

    _do_emitEvent(sender, eventName, eventData) {
        var subscribers = this._subscribers[eventName];
        if (subscribers) {
            for(var i=0; i<subscribers.length; i++) {
                var callback = subscribers[i];
                callback(sender, eventName, eventData);
            }
        }            
    }

    _do_subscribeToEvent(eventName, callback) {
        if (this._subscribers[eventName]) {
            this._subscribers[eventName].push(callback);
        } else {
            this._subscribers[eventName] = [callback];
        }
    }

}

EventsManager._instance = null;

//-------------------

//EventsManager.emitEvent(...);
//EventsManager.subscribeToEvent(...);


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