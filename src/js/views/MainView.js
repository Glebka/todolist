'use strict';

class MainView {
    constructor(rootElement) {
        this._rootElement = rootElement;
        this._model = null;
        this._listView = new TodoListView();
        this._footer = new FooterView();
        this._textInput = document.createElement('input');
        this._textInput.placeholder = "What needs to be done?";        
        this._listView.setRootElement(this._rootElement);
        this._footer.setRootElement(this._rootElement);
        this._textInput.onkeypress = this._onTextInputKeyPressed.bind(this);
    }

    _onTextInputKeyPressed(event) {
        if (event.keyCode === 13) {
            this._model.addTodoItem(this._textInput.value);
            this._textInput.value = "";
            this._listView.render();
            this._footer.render();
        }        
    }

    setModel(todoModel) {
        this._model = todoModel;
        this._listView.setModel(this._model);
        this._footer.setModel(this._model);
    }    

    render() {
        this._rootElement.appendChild(this._textInput);
        this._listView.render();
        this._footer.render();
    }
}