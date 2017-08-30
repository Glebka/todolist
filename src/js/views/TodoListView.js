'use strict';

var ListDisplayMode = {};

ListDisplayMode.ALL = 0;
ListDisplayMode.ACTIVE = 1;
ListDisplayMode.COMPLETED = 2;

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
        this._itemsContainerElement.classList.add('list-wrapper');

        this._displayMode = ListDisplayMode.ALL;

        EventsManager.subscribeToEvent('todoItemChanged', this.render.bind(this));
        EventsManager.subscribeToEvent('displayModeChanged', 
            function(sender, eventName, eventData) {
                this.setDisplayMode(eventData);
        }.bind(this));
        EventsManager.subscribeToEvent("todoItemRemoved", 
            function(sender, eventNanme, itemModel){
                this.render();
        }.bind(this));

        this._hasRendered = false;
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

    setDisplayMode(mode) {
        this._displayMode = mode;
        this.render();
    }

    _renderItem(itemModel) {
        var itemView = new TodoItemView();
        itemView.setRootElement(this._itemsContainerElement);
        itemView.setModel(itemModel);
        itemView.render();
    }

    /**
     * Renders all todo items into rootElement
     */
    render() {
        
        if (!this._hasRendered) {
            this._rootElement.appendChild(this._itemsContainerElement);
            this._hasRendered = true;
        }

        this._itemsContainerElement.innerHTML = "";
        for(var i=0; i < this._listModel.getLength(); i++) {

            var itemModel = this._listModel.getTodoItem(i);
            var itemState = itemModel.getState();

            if (this._displayMode === ListDisplayMode.ACTIVE && itemState === false) {
                this._renderItem(itemModel);
            } else if (this._displayMode === ListDisplayMode.COMPLETED && itemState === true) {
                this._renderItem(itemModel);
            } else if (this._displayMode === ListDisplayMode.ALL) {
                this._renderItem(itemModel);
            }            
        }                
    }

}