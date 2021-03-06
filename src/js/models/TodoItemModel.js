'use strict';

/**
 * Model class that contains TODO item data
 */
class TodoItemModel {

    /**
     * Constructs new todo item with specified text
     * @param {String} text - todo item text
     */    
    constructor(text) {
        /**
         * _id {Number} - database ID
         */
        this._id = this.getGuid();

        /**
         * _text {String} - todo item text
         */
        this._text = text;

        /**
         * _state {Boolean} - state of todo item. If set to true - item is done
         */
        this._state = false;
    }

    static fromJSON(jsonString) {
        var unpackedJson = JSON.parse(jsonString);
        var todoItem = new TodoItemModel();
        for (var key in unpackedJson) {
            todoItem[key] = unpackedJson[key];
        }
        return todoItem;
    }

    /**
     * Gets the text of todo item
     * @returns {String} text of todo item
     */    
    getText() {
        return this._text;
    }

    /**
     * Gets the state of todo item
     * @returns {Boolean} true - if todo item has been done, false - otherwise
     */
    getState() {
        return this._state;
    }

    /**
     * Sets the text of todo item
     * @param  {String} text - new text of todo item
     */
    setText(text) {
        this._text = text;        
        EventsManager.emitEvent('todoItemChanged');
    }

    /**
     * Sets the state of todo item
     * @param {Boolean} state - true means done, false - means not finsihed
     */
    setState(state) {
        this._state = state;
        EventsManager.emitEvent('todoItemChanged');
    }

    getId() {
        return this._id;
    }

    toString() {
        return this.toJSON();
    }

    toJSON() {
        var obj = {
            _id: this._id,
            _state: this._state,
            _text: this._text
        }
        return JSON.stringify(obj); // '{"_id":"", "state": false, "text":"ttttt"}'
    }
    getGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}