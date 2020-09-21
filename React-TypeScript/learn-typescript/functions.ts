// 函数声明
function add(x:number, y:number): number {
  return x + y
}
let result = add(2, 3)

//函数表达式 
const addTwo = function(x:number, y:number): number {
  return x + y
}
let resultTwo = add(2, 3)
const add2:(x:number,y:number)=>number = addTwo

// ?可选只能放到最后，不可以放到前面或者中间
function sum(x:number, y:number, z?:number): number{
  if(typeof z==='number') {
    return x+y+z
  } else {
    return x+y
  }
}
let sumResult = sum(1, 2)
let sumResults = sum(1, 2, 4)

// 设置默认值
function sumTwo(x:number, y:number, z:number=10): number{
  if(typeof z==='number') {
    return x+y+z
  } else {
    return x+y
  }
}
let sumResultTwo = sum(1, 2)
let sumResultsTwo = sum(1, 2, 4)

