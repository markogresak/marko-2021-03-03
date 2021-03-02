## 1. What would you add to your solution if you had more time?

I think the background "progress bar" is not the same as the linked implementation.

I was not sure what the value represents and I gave up after about 30 minutes of trying to figure it out. I've left a matching implementation, and a `TODO` comment: https://github.com/markogresak/marko-2021-03-03/blob/ea9ef421defe6cf9a1b2a119e0b1f73510d18a20/src/components/OrderBook/Row.tsx#L34-L35

If I had more time, I would try to figure out this algorithm.

## 2. What would you have done differently if you knew this page was going to get thousands of views per second vs per week?

a) The first consideration would be managing the WebSocket sessions, to reduce the number of connections to the server. For example, if the user is inactive for a while, the app would stop the connection and then restart it when the user becomes active.

I have implemented the `useVisibility` React hook that uses the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) to hide the `OrderBook` component when the browser tab is not active.

Implementing the idle detection is possible with the `useIdle` hook from `react-use`. But I did not use it because it seemed a bit strange when the content just disappears. This implementation would require more UI considerations to tell the user what has happened.

b) Also, I believe it's important to consider accessibility. With thousands of views per second, there is a much larger chance there are people who use a11y tools to navigate the page. I did not do much beyond using semantic elements and sensible DOM layout.

c) Another thing that I always pay attention is the overall size. This means considering what dependencies are added, ensuring the deployed build is always optimized for production.

## 3. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

From the latest version, ECMAScript 2020, the most useful feature is [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining). It was available before via a Babel plugin, but now it's official and it works in the latest browser versions, without having to rely on the compiler to produce compatible code.

The idea is to allow inline checks when accessing properties on an object which might be null or undefined.

For example, suppose we have an object to describe an adventurer and we want to output the name of their cat, but they might not have a `cat` property.

```js
const adventurer1 = {
  name: 'Alice',
  cat: {
    name: 'Dinah',
  },
};
const adventurer2 = {
  name: 'Bob',
  dog: {
    name: 'Dingo',
  },
};

const getCatName = (adventurer) => adventurer.cat?.name;

console.log(getCatName(adventurer1)); // Dinah
console.log(getCatName(adventurer2)); // undefined
```

Without the optional chaining, calling `getCatName` with the argument `adventurer2` would throw
`TypeError: Cannot read property 'name' of undefined`.

Previously, the way to go around this problem was with the short-circuit approach:

```js
const getCatNameES5 = (adventurer) => adventurer.cat && adventurer.cat.name;
```

But this approach was tedious and lengthy with many possibly undefined properties.

The optional chaining is not limited to the dot object accessor, it also works with:

- Array indices or object keys: `obj.array?.[1]` or `obj.object?.['some-property']`
- Function calls: `obj.fn?.()`

The only caveat is that the script will still fail if the top-level object (e.g. `obj` from the examples above) is not defined.

Also, one must be careful when using the optional chaining in conditions, for example:

```js
if (obj?.a < 10) {
  console.log('Less than 10');
} else {
  console.log('More than 10'); // this statement is not true when `obj.a` does not exist
}
```

## 4. How would you track down a performance issue in production? Have you ever had to do this?

I use the Performance tab in the Chrome/Chromium browser, click record, and perform the slow-performing actions. Then I start by investigating the functions which take the most time, trying to figure out where is the bottleneck. For React-specific problems, I also use the Profiler tab, provided by the React Dev Tools browser extension.

If it's a problem with network-bound code, I use a tool to measure network requests. I find [artillery](https://artillery.io/docs/guides/getting-started/installing-artillery.html) easy to use and it provides extensive API for more advanced scenarios.

The idea is the same: measure first, then optimize. I should also mention that I try not to optimize before there's a clear performance problem.

I used this approach to optimize slow updates in this example app. It turned out the WebSocket updates were too fast and triggering React state updates for every change caused the app to become stuck in endless updates (fixed by b1f6002db60c3e41f85d34e185ff27402b5b8b8e). Another problem was too many `@emotion` style updates (fixed by 36e4183edd0051e98a30269cdd44cdcfdb4849f6).

## 5. Can you describe common security concerns to consider for a frontend developer?

#### a) Auditing dependencies

There have been many reports about npm dependency abuse. The case was either someone hijacking the name or a name typo or the author giving away the maintainer status to a rogue actor.

Checking the health of a dependency before adding it and re-evaluating it later is important for the project. It's even more important for a code that is executed on the server. This could be either a node server or server-side rendering support for a frontend app.

By extension, being careful with the dependencies makes it less likely to be left with an unsupported dependency as the project ages.

Also, loading dependencies directly from a 3rd party CDN can be dangerous if the CDN is hijacked. So in combination with auditing the dependencies, it's also important to control the server.

#### b) XSS (Cross-site scripting) attacks

XSS is a technique where the attacker injects a script into the page. The script can steal important information, for example, session cookie data or `localStorage` values.

Mitigation is done by sanitization. Modern frontend frameworks already do a good job in supporting this, unless explicitly ignored, for example, by using `dangerouslySetInnerHTML` in React.

It can be additionally mitigated by setting up a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

#### c) Using a token to prevent Cross-Site Request Forgery attacks

The CSRF attack is possible because the website already includes authentication cookies. The token helps to identify the sessions and prevent unwanted (forged) requests from being processed.

## 6. How would you improve the API that you just used?

I did not have any problems with the API. It was simple and straightforward to use. If it was not described in the document, it would probably take me a bit to figure out the data structure of `[price, size]` tuples, but it's not terrible, and it's an understandable optimization.

One thing that I would change is to sort the `bids` values ascending by price, same as `asks` from the snapshot data. There's probably a reason why the sorting is different. Ascending sorting would allow me to skip a sorting step. The code of `updateOrder` relies on the sorted order to figure out the position of new items on WebSocket update events.
