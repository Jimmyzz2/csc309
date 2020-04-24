var f = function () {
    this.a = 1;
    this.b = 2;
  }
  
  var o = new f();
  
  f.prototype.b = 3;
  f.prototype.c = 4;
  f.prototype.__proto__.d = 8;
  // f.prototype.__proto__.__proto__.e = 9;
  console.log(o.a);
  console.log(o.b);
  console.log(o.c);
  console.log(o.d);
  o.__proto__.b = 9;
  console.log(o.b)
  console.log(f.prototype.b);
  console.dir(f);
  
