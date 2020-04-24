
    // fun console priting:
    function printP(word){
        // console.log(word);
        console.log('%c ' + word, 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
    }

//promise example (all rejects are caught at the end)
const promise1 = 
	new Promise((resolve, reject) => {
        // resolve("success");
		reject(new Error('Something failed'));
	})
	.then(value => {
		printP(value);
        return 1;
	})
	.then(value => {
		printP(value);
		return 2;
		// throw new Error('Something failed');
	})
	.then(value => {
        printP(value);
        return 3;
	})
	.then(value => {
		printP(value);
		return 4;
	})
	.then(value => {
		printP(value);
		throw 5;
	})
	.catch(err => {
		printP(err)
	});


    // const promise2 = 
	// new Promise((resolve, reject) => {
	// 	resolve("success");
	// })
	// .then(value => {
	// 	printP(value);
	// 	return 1;
	// })
	// .then(value => {
	// 	printP(value);
	// 	return 2;
	// })
	// .then(value => {
    //     printP(value);
    //    // throw new Error('Something failed');
    //     return 3;
    // })
	// .then(value => {
	// 	printP(value);
	// 	return 4;
	// })
	// .then(value => {
	// 	printP(value);
	// 	throw 5;
    // })
    // .catch(err => {
	// 	printP(err)
	// });




