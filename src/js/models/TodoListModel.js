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

        EventsManager.subscribeToEvent('removeTodoItem', this.removeTodoItem, this);            
    }

    static fromJSON(jsonString) {
        var todoListModel = new TodoListModel();
        if (jsonString) {
            var unpackedJson = JSON.parse(jsonString);
            
            for (var i=0; i < unpackedJson.length; i++) {
                var todoItem = TodoItemModel.fromJSON(unpackedJson[i]);
                todoListModel._list.push(todoItem);
            }
        }        
        return todoListModel;
    }

    /**
     * Constructs new todo item and adds it to the list
     * @param {String} text - new todo item's text
     */
    addTodoItem(text) {
        var item = new TodoItemModel(text);

        this._list.push(item);
        console.log('New todo item has been added: ', text);
        EventsManager.emitEvent('todoItemAdded');
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
     * Removes todo item from the list
     * @param {Number} id - todo item's ID that being removed
     */
    removeTodoItem(id) {
        for (var i = 0; i < this._list.length; i++) {
            if (this._list[i].getId() === id) {
                this._list.splice(i, 1);
                break;
            }
        }
        EventsManager.emitEvent('todoItemRemoved');
    }    

    toString() {
        return this.toJSON();
    }

    toJSON() {
        var todoList = [];
        for(var i=0; i < this._list.length; i++) {
            todoList.push(this._list[i].toJsonObject());
        }        
        return JSON.stringify(todoList);
    }
}