'use strict';

/**
 * View class that renders single todo list item
 */
class TodoItemView {

    /**
     * Constructs Todo list item view
     * @param {HTMLElement} rootElement - where to append html code of todo item
     */
    constructor() {

        /**
         * _rootElement {HTMLElement} - container for todo item's view HTML code
         */
        this._rootElement = null;

        /**
         * _model {TodoItemModel} - data that should be rendered
         */
        this._model = null;

        /**
         * _itemElement {HTMLDivElement} - container for checkbox and paragraph elements
         */
        this._itemElement = document.createElement('div');

        /**
         * _checkbox {HTMLInputElement} - sets  / displays the state of todo item
         */
        this._checkbox = document.createElement('input');
        this._checkbox.type = "checkbox";

        /**
         * _textElement {HTMLParagraphElement} - holds the text of todo item
         */
        this._textElement = document.createElement('p');

        this._itemElement.appendChild(this._checkbox);
        this._itemElement.appendChild(this._textElement);         
    }

    setRootElement(element) {
        this._rootElement = element;
    }

    /**
     * Sets the model instance that should be rendered
     * @param {TodoItemModel} model
     */
    setModel(model) {
        this._model = model;
    }

    /**
     * Renders todo item
     */
    render() {
        this._checkbox.checked = this._model.getState();
        this._textElement.innerText = this._model.getText();
        this._rootElement.appendChild(this._itemElement);
    }
}