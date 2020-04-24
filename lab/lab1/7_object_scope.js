// ##############################
// Object scope example

const myObject = {
    myVar: "bar",
    func: function() {
        const a = 5;
        (function() {
            console.log("this.myVar = " + this.myVar); // undefined, 'this' isn't context of myObject
            console.log("a = " + a); // 5
        })()
        //  }).bind(this)()   // bind it (replace last line), and 'bar' appears
     }
};
myObject.func(); 
