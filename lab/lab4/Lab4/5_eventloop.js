///////////////////////////////////////////////////
/* Event loop */

// Understand how the event loop works
//  - what is a callback?
//  - when do we execute blocking code?  when do we execute callbacks?

setTimeout(function () {      
    console.log("hello");
  }, 0) // 0 seconds timeout
  console.log("309")
  // which one will print first?

  /// another example:
  function zero(f) {
    return setTimeout(f, 0);
  }
  
  function test1() {
      // what gets hoisted up here?
      var txt = undefined;
      let txt;
      zero(log);
      function log() {
        var txt;
          console.log(txt);
      }
      if (true) {
        var txt = 'this is a test message'; //change to let - what happens?
      }
  }
  test1() // output?

// const s = new Date().getSeconds();

// setTimeout(function() {
//   // prints out "2", meaning that the callback is not called immediately after 500 milliseconds.
//   console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
// }, 500)

// while (true) {
//   if (new Date().getSeconds() - s >= 2) {
//     console.log("Good, looped for 2 seconds")
//     break;
//   }
// }



// (function() {

//   console.log('this is the start');

//   setTimeout(function cb() {
//     console.log('Callback 1: this is a msg from call back');
//   }); // has a default time value of 0

//   console.log('this is just a message');

//   setTimeout(function cb1() {
//     console.log('Callback 2: this is a msg from call back');
//   }, 0);

//   console.log('this is the end');

// })();