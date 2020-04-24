//async function promise example
//  we *wrap* the asynchrnous code (the setTimeout) in a promise

function printSomething(){
	printP("Something is printed");
}

// fun console priting:
function printP(word){
    console.log(word);
    // console.log('%c ' + word, 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
}

// A function which settimeout if time is integer and failure otherwise.

function delay(time) {
	// this returns error, no promise returned
	setTimeout(printSomething, time);
	
	// this returns error, because no argument to promise
	// return new Promise();
	
	// this returns the promise
	return new Promise((resolve, reject) => {
		if (isNaN(time))
			reject(new Error("not a number"));
		else setTimeout(resolve, time);
	});
	
}

delay(1000)
	.then(() => printP("hello"))
	.catch((err) => console.log(err));


//async function handling promises
delay("not a number")
	.then(() => printP("this is wrong"))
	.catch((err) => console.error(err));
	
// function delay(time) {

//     setTimeout(printSomething, time);
// 	// this returns the promise
// 	return new Promise((resolve, reject) => {
		
// 		//we can reject promises, since only 1 can be called
// 		if(isNaN(time)){
// 			reject();
// 			// reject(new Error("Need a real number"));
//         }
// 		setTimeout(resolve, time);
// 	});
// }