'use strict';

/**
 * Class that renders all todo items
 */
class TodoListView {

    /**
     * Constructs TodoListView isntance
     * @param {HTMLElement} rootElement - place where to render todo items
     */
    constructor() {
        /**
         * _rootElement {HTMLElement} - place where to render todo items
         */
        this._rootElement = null;                

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
    }

    /**
     * Renders all todo items into rootElement
     */
    render() {
        this._itemsContainerElement.innerHTML = "";
        for(var i=0; i < this._listModel.getLength(); i++) {
            var itemModel = this._listModel.getTodoItem(i);
            var itemView = new TodoItemView();
            itemView.setRootElement(this._itemsContainerElement);
            itemView.setModel(itemModel);
            itemView.render();            
        }        
        this._rootElement.appendChild(this._itemsContainerElement);
    }

}