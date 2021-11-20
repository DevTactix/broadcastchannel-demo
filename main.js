/**
 * Broadcast Channel
 */
// Common
const channel = 'google-search';

function createBroadcastChannel(name, messageHandler = null) {
    const bc = new BroadcastChannel(name);
    bc.onmessage = messageHandler;
    return bc;
}

// Sender
const messageHandlerLogging = e => console.log(channel, e.data);

const bc = createBroadcastChannel(channel, messageHandlerLogging);


// Receiver
const searchInputSelector = 'body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input';

const searchButtonSelector = 'body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b';

function getElement(selector) {
    return document.querySelector(selector);
}

function setValue(selector, text) {
    getElement(selector).value = text;
}

function clickElement(selector) {
    getElement(selector).click();
}

const populateSearch = setValue.bind(
    null,
    searchInputSelector
);

const clickButton = clickElement.bind(
    null, 
    searchButtonSelector
);

const messageHandlerSearch = e => {
    console.log(channel, e.data);
    populateSearch(e.data);
    clickButton();
}

const bc = createBroadcastChannel(channel, messageHandlerSearch);

// Sender message post
bc.postMessage('Hello');

// Receiver message post
bc.postMessage('BroadcastChannel');
