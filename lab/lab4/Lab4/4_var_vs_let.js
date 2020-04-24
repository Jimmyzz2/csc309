let x = 1;
function funcx() {
 console.log(x);  // undefined
 var x = 2;
}
funcx();
 
// let y = 1;
// function funcy() {
//    console.log(y); // ReferenceError: Cannot access 'x' before initialization
//    let y = 2;
//  }
//  funcy();
 
// This is because var declarations are hoisted and initialized with undefined as a value,
// while const and let are hoisted but not initialized.
