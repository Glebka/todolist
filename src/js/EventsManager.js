
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

    static emitEvent() {
        if (arguments.length === 0) {
            throw Error('Invalid usage of emitEvent(): missed required argumen eventName');
        }
        return EventsManager.prototype._do_emitEvent.apply(EventsManager._getInstance(), arguments);        
    }

    static subscribeToEvent(eventName, callback, context) {
        return EventsManager._getInstance()._do_subscribeToEvent(eventName, callback, context);
    }

    _do_emitEvent(eventName) {        
        var subscribers = this._subscribers[eventName];        
        var args = Array.prototype.slice.call(arguments, 1, arguments.length);
        if (subscribers) {
            for(var i=0; i<subscribers.length; i++) {
                var callbackInfo = subscribers[i];
                var callback = callbackInfo.func;
                var context = callbackInfo.ctx;
                callback.apply(context, args);                
            }
        }            
    }

    _do_subscribeToEvent(eventName, callback, context) {
        if (this._subscribers[eventName]) {
            this._subscribers[eventName].push({func: callback, ctx: context});
        } else {
            this._subscribers[eventName] = [{func: callback, ctx: context}];
        }
    }    

}

EventsManager._instance = null;