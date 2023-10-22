# request-vk-api

[Author](https://github.com/Ma11y1)

## Installation
npm i request-vk-api

## Example usage

```javascript
import { VKSession, LANGUAGE_API, VERSION_API } from "get-vk-api";


const session = new VKSession(
    {
        token: TOKEN, // Your token
        language: LANGUAGE_API.RUSSIA, // optional
        version: VERSION_API, // optional
        agentParams: {} // optional
    }
);

session.init()
    .then(() => {
        // Your code
    })
    .catch((err) => {
        // Your error handing
    });
```
