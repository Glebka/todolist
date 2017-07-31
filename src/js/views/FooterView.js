'use strict'

class FooterView {
    constructor() {
        this._rootElement = null;
        this._footerContainer = document.createElement('div');
        this._itemsCountElement = document.createElement('p');
        this._allButton = document.createElement('button');
        this._allButton.innerText = 'All';
        this._activeButton = document.createElement('button');
        this._activeButton.innerText = 'Active';
        this._completedButton = document.createElement('button');
        this._completedButton.innerText = 'Completed';

        this._footerContainer.appendChild(this._itemsCountElement);
        this._footerContainer.appendChild(this._allButton);
        this._footerContainer.appendChild(this._activeButton);
        this._footerContainer.appendChild(this._completedButton);

        this._listModel = null;
    }

    setRootElement(element) {
        this._rootElement = element;
    }

    setModel(model) {
        this._listModel = model;
    }

    render() {
        this._itemsCountElement.innerText = this._listModel.getLength() + ' items';
        this._rootElement.appendChild(this._footerContainer);
    }
}