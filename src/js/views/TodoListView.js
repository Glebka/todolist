'use strict';

var ListDisplayMode = {};

ListDisplayMode.ALL = 1;
ListDisplayMode.ACTIVE = 2;
ListDisplayMode.COMPLETED = 3;

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

        // TODO: refactor code here
        EventsManager.subscribeToEvent('displayModeChanged',
            function(sender, eventName, eventData) {
                this.setDisplayMode(eventData);
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
        console.log(this._displayMode);
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

        /**
         * Checks whether we able to render ourselves. If no - simply return.
         */
        if (!this._listModel) {
            return;
        }

        if (!this._hasRendered) {
            this._rootElement.appendChild(this._itemsContainerElement);
            this._hasRendered = true;
        }

        this._itemsContainerElement.innerHTML = "";
        for (var i = 0; i < this._listModel.getLength(); i++) {

            var itemModel = this._listModel.getTodoItem(i);
            var itemState = itemModel.getState();

            /**
             * TODO: refactor code here. What if there will be more than 3 display modes.
             */
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