// 纯数字数组
let arrOfNumbers: number[] = [1,2,3,4]
arrOfNumbers.push(5)
arrOfNumbers.push('hhh') // 编译报错

function test() {
    // arguments为类数组，具有数组的一部分属性，没有数组的方法
    console.log(arguments)
}


// Tuple
let user: [string, number] = ['viking', 123]
user = ['hhh', 5566]
user = ['hhh', 5566, true] // 编译报错