var b = 1;
function outer() {
    var b = 2
    function inner() {
        b++;
        var b = 4;
        console.log(b)
    }
    inner();
}
outer();
