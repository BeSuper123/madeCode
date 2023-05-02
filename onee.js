/* Given a sorted array of integers, 
write a function to search for a specific integer in the array. 
If the integer is found, return its index in the array. 
If the integer is not found, return -1. 
*/

var x = [2, 3, 4, 5, 6, 7]

var y = 3

var ans = 0

for (let i = 0; i < x.length; i++) {

    if (x.includes(y)) {
        ans = i
    } else {
        ans = -1
    }
}

console.log(ans)
