# sockette-component [![NPM](https://img.shields.io/npm/v/sockette-component.svg)](https://www.npmjs.com/package/sockette-component)

> A (367 byte gzip) [Sockette](https://github.com/lukeed/sockette) component for React and Preact

> Note: This is a component factory for binding [Lukeed's sockette library](https://github.com/lukeed/sockette) to react and preact.

This is a very light component that exposes `sockette`'s [API](https://github.com/lukeed/sockette#api) via component properties.

Please note that (1) nothing is rendered to the DOM and (2) the `WebSocket` is closed before unmounting!

This module exposes three module definitions:

* **ES Module**: `dist/sockette-component.es.js`
* **CommonJS**: `dist/sockette-component.js`
* **UMD**: `dist/sockette-component.min.js`

If using the UMD bundle, the library is exposed as `socketteComponent` globally.

## Install

```
$ npm install --save sockette-component
```

## Usage

_Quick example that wraps Sockette within a custom component._

### Using with **React**

```js
import { Component, createElement } from "react";
import createSocket from "sockette-component";

const Socket = createSocket({
  Component,
  createElement
});

class Foobar extends Component {
  state = {
    socket: null
  };

  onOpen = ev => {
    console.log("> Connected!", ev);
  };

  onMessage = ev => {
    console.log("> Received:", ev.data);
  };

  onReconnect = ev => {
    console.log("> Reconnecting...", ev);
  };

  sendMessage = _ => {
    // WebSocket available in state!
    this.stte.ws.send("Hello, world!");
  };

  render() {
    return (
      <div class="demo">
        <button onclick={this.sendMessage}>SEND</button>

        <Sockette
          url="wss://..."
          getSocket={socket => {
            this.setState(socket);
          }}
          maxAttempts={25}
          onopen={this.onOpen}
          onmessage={this.onMessage}
          onreconnect={this.onReconnect}
        />
      </div>
    );
  }
}
```

### Using with **Preact**

```js
import { h, Component } from "preact";
import Sockette from "sockette-component";

const Socket = createSocket({
  Component,
  createElement: h
});

class Foobar extends Component {
  state = {
    socket: null
  };

  onOpen = ev => {
    console.log("> Connected!", ev);
  };

  onMessage = ev => {
    console.log("> Received:", ev.data);
  };

  onReconnect = ev => {
    console.log("> Reconnecting...", ev);
  };

  sendMessage = _ => {
    // WebSocket available in state!
    this.state.ws.send("Hello, world!");
  };

  render() {
    return (
      <div class="demo">
        <button onclick={this.sendMessage}>SEND</button>

        <Sockette
          url="wss://..."
          getSocket={socket => {
            this.setState(socket);
          }}
          maxAttempts={25}
          onopen={this.onOpen}
          onmessage={this.onMessage}
          onreconnect={this.onReconnect}
        />
      </div>
    );
  }
}
```

## Properties

Please see [Sockette's Options](https://github.com/lukeed/sockette#socketteurl-options) &mdash; all `props` are passed _directly_ to `sockette`.

#### url

Type: `String`<br>

The URL you want to connect to &mdash; see [Sockette's docs](https://github.com/lukeed/sockette#url).

## Context

The active `WebSocket` is sent on mount of Socket component by calling `getSocket` prop callback. You can save it by any means via providing a `getSocket` prop as shown in the example above. This means that you can programmatically interact with [Sockette's API](https://github.com/lukeed/sockette#api), including `close()`, `reconnect()`, `send()`, etc.

When `<Sockette/>` is unmounted, the `WebSocket` is closed (`ws.close()`).

## License

MIT © [Farzad YZ](http://farzadyz.com)
