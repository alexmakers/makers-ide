# Makers IDE

A super cool, multi-user IDE with [Node.js](http://nodejs.org), WebSockets, [CodeMirror](http://codemirror.net/), CSS animations. Built in a few hours so apologies for any code deficiencies :wink: :sparkling_heart:.

![Makers IDE](https://github.com/makersacademy/makers-ide/raw/master/screen.png)

Testing is done with [mocha](https://github.com/visionmedia/mocha), [expect.js](https://github.com/LearnBoost/expect.js/) and [Zombie.js](https://github.com/assaf/zombie).

### Installation

Once Node.js is installed (http://nodejs.org/download/), just clone the repo and run `npm install`.

To run the app:

~~~
npm start
~~~

To run the test suite:

~~~
npm test
~~~

### TODO

- Test coverage for deleting and creating files
- Test WS functionality - it looks like this is really hard. Will probably have to write a custom wrapper for PhantomJS (!). Investigated [zombie-phantom](https://www.npmjs.org/package/zombie-phantom), but doesn't seem to work
- Write a proper class for detecting programming language from file extension, w/ unit tests
- Add browser prefixes for CSS, cross-browser testing