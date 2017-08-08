'use strict';

/**
 * Model class that represents list of todo items
 */
class TodoListModel {
    
    constructor() {
        /**
         * _list {Array[TodoItemModel]} - container for TodoItemModel instances
         */
        this._list = [];
    }

    /**
     * Constructs new todo item and adds it to the list
     * @param {String} text - new todo item's text
     */
    addTodoItem(text) {
        var item = new TodoItemModel(text);
        this._list.push(item);
        console.log('New todo item has been added: ', text);
    }

    /**
     * Gets todo item from the list by index
     * @param {Number} index - todo item position in the list
     * @returns {TodoItemModel} - requested todo item
     */
    getTodoItem(index) {
        return this._list[index];
    }

    /**
     * Returns length of the list
     */
    getLength() {
        return this._list.length;
    }

    /**
     * Removes todo item from the list by given index
     * @param {Number} index - todo itme's index in the list
     */
    removeTodoItem(index) {
        this._list = this._list.splice(index,1);        
    }
}