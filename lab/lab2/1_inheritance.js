// "use strict"
var k = {
    a: 2,
    m: function() {
      return this.a + 1;
    }
  };
  
  console.log(k.m()); // 3
  // When calling k.m in this case, 'this' refers to k
  
  var p = Object.create(k);
  // var p = k;
  // p is an object that inherits from k
  console.log(p.m()); 
  p.a = 4; // creates a property 'a' on p
  console.log(p.m()); 
  console.log(k.m()); 
  // when p.m is called, 'this' refers to p.
  // So when p inherits the function m of o, 
  // 'this.a' means p.a, the property 'a' of p
  k.__proto__.c = 5;
  console.log(k.c);
  k.__proto__.__proto__.f = 8;