'use strict';

class MainView {
    constructor(rootElement) {
        this._rootElement = rootElement;
        this._listView = null;
        this._footer = null;
        this._textInput = document.createElement('input');
    }

    setListView(listView) {
        this._listView = listView;
        this._listView.setRootElement(this._rootElement);
    }

    setFooter(footer) {
        this._footer = footer;
        this._footer.setRootElement(this._rootElement);
    }

    render() {
        this._rootElement.appendChild(this._textInput);        
        this._listView.render();
        this._footer.render();
    }
}