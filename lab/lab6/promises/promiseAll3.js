// fun console priting:
function printP(word){
    console.log(word);
    // console.log('%c ' + word, 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
}

// Promise.all example
var promise1 = "CSC309 #1";
var promise2 = Promise.resolve("Second Data");  // a resolved promise
var promise3 = new Promise(function(resolve, reject) {
    printP("promise3");
	setTimeout(resolve, 0, 'Third Data');
});
var promise4 = Promise.reject(new Error("promise 4 rejected"));  // a rejected promise

// If any of the passed-in promises reject, 
// Promise.all asynchronously rejects with the value of the promise that rejected, 
// whether or not the other promises have resolved. 
Promise.all([
	promise1,
    promise2,
    // promise3
    promise3,
    promise4
]).then(data =>{
	const [data1, data2, data3] = data;
	
	printP(data1);
	printP(data2);
	printP(data3);
}).catch(e => console.error(e));

