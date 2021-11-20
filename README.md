# Broadcast Channel Demo

## Background
The Broadcast Channel API enables basic message bus functionality in browsing contexts, i.e. windows, tabs, frames and iframes.

## Idea
Communicate by messages sent between browser instances to control the receiving one.

Send search term and trigger Google search on receiver.

## Setup
Open 2 instances of Chrome, navigate to `https://www.google.se/`  and enable DevTools (using [F12]) in both instances.

### Common code
Paste the following common code in both DevTools consoles:
```javascript
// Common
const channel = 'google-search';

function createBroadcastChannel(name, messageHandler = null) {
    const bc = new BroadcastChannel(name);
    bc.onmessage = messageHandler;
    return bc;
}
```
This code declares the channel name and a helper function for creating a Broadcast Channel.

### Sender code
In the 1st browser instance (the sender), paste the following code:
```javascript
// Sender
const messageHandlerLogging = e => console.log(channel, e.data);

const bc = createBroadcastChannel(channel, messageHandlerLogging);
```
This code declares a simple message handler logging the channel name and received data then the channel is created.

### Receiver code
In the 2nd browser instance (receiver), paste the following code:
```javascript
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
```
This code declares the selectors for the search input field and search button (look them up using DevTools to replace).

Helper DOM functions are created for getting a reference to an element, setting a value and clicking a button.

For convenience, the selectors are partially applied to value setter and clicker functions.

The message handler is declared and will receive the message sent, use it to populate the search input field and then `click()` the search button.

Last, the channel is subscribed to (as it has already been created in the sender browser instance).

### Sender verification
Paste the message poster code in the receiver for sake of verification:
```javascript
// Sender message post
bc.postMessage('Hello');
```
If successful, the sender console will show `google-search Hello`.

### Le grande finale
Paste the message poster code in the sender to complete the demo. Crossing fingers!
```javascript
// Receiver message post
bc.postMessage('BroadcastChannel');
```

## Sources
[MDN - Broadcast Channel](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)

[MDN - Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)