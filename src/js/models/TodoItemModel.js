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
        this._id = null;

        /**
         * _text {String} - todo item text
         */
        this._text = text;

        /**
         * _state {Boolean} - state of todo item. If set to true - item is done
         */
        this._state = false;
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
        eventsManager.emitEvent(this, 'todoItemChanged');
    }

    /**
     * Sets the state of todo item
     * @param {Boolean} state - true means done, false - means not finsihed
     */
    setState(state) {
        this._state = state;
        eventsManager.emitEvent(this, 'todoItemChanged');
    }

}