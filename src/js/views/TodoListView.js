'use strict';

/**
 * Class that renders all todo items
 */
class TodoListView {

    /**
     * Constructs TodoListView isntance
     * @param {HTMLElement} rootElement - place where to render todo items
     */
    constructor(rootElement) {
        /**
         * _rootElement {HTMLElement} - place where to render todo items
         */
        this._rootElement = rootElement;        

        /**
         * _list {Array[TodoItemView]} - container for TodoItemView instances
         */
        this._list = [];

        /**
         * _listModel {TodoListModel} - contains list with todo items data
         */
        this._listModel = null;

        this._itemsContainerElement = document.createElement('div');
    }

    setRootElement(element) {
        this._rootElement = element;
    }

    /**
     * Sets the todo list model for this view
     * @param {TodoListModel} model
     */
    setModel(model) {
        this._listModel = model;
        for(var i=0; i < this._listModel.getLength(); i++) {
            var itemModel = this._listModel.getTodoItem(i);
            var itemView = new TodoItemView(this._itemsContainerElement);
            itemView.setModel(itemModel);
            this._list.push(itemView);
        }
    }

    /**
     * Renders all todo items into rootElement
     */
    render() {
        for(var i=0; i < this._list.length; i++) {
            var itemView = this._list[i];
            itemView.render();
        }
        this._rootElement.appendChild(this._itemsContainerElement);
    }

}