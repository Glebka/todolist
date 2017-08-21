'use strict'

class FooterView {
    constructor() {
        this._rootElement = null;
        this._footerContainer = document.createElement('div');
        this._footerContainer.classList.add("footer-wrapper");
        this._itemsCountElement = document.createElement('p');
        this._allButton = document.createElement('button');
        this._allButton.innerText = 'All';
        this._allButton.value = ListDisplayMode.ALL;
        this._activeButton = document.createElement('button');
        this._activeButton.innerText = 'Active';
        this._activeButton.value = ListDisplayMode.ACTIVE;
        this._completedButton = document.createElement('button');
        this._completedButton.innerText = 'Completed';
        this._completedButton.value = ListDisplayMode.COMPLETED;

        this._footerContainer.appendChild(this._itemsCountElement);
        this._footerContainer.appendChild(this._allButton);
        this._footerContainer.appendChild(this._activeButton);
        this._footerContainer.appendChild(this._completedButton);

        this._listModel = null;

        this._allButton.onclick = this._onButtonClick.bind(this, this._allButton);
        this._activeButton.onclick = this._onButtonClick.bind(this, this._activeButton);
        this._completedButton.onclick = this._onButtonClick.bind(this, this._completedButton);

        EventsManager.subscribeToEvent('todoItemChanged', this.render.bind(this));
    }

    setRootElement(element) {
        this._rootElement = element;
    }

    setModel(model) {
        this._listModel = model;
    }
    
    _onButtonClick(button) {
        EventsManager.emitEvent(this, 'displayModeChanged', Number.parseInt(button.value));
    }

    render() {
        // TODO: check this code: it may generate duplicated html elements
        var pendingTodos = 0;
        for(var i=0; i<this._listModel.getLength(); i++) {
            var item = this._listModel.getTodoItem(i);
            if (item.getState() === false) {
                pendingTodos++;
            }
        }
        this._itemsCountElement.innerText = pendingTodos + ' items';
        this._rootElement.appendChild(this._footerContainer);
    }
}