class Queue {
  private data = []
  push(item) {
    return this.data.push(item)
  }
  pop() {
    return this.data.shift()
  }
}
const queue = new Queue()
queue.push(1)
queue.push('str')
console.log(queue.pop().toFixed())
console.log(queue.pop().toFixed()) // 该错误无法被提前捕捉


// 改进后的代码
class QueueTwo<T> {
  private data = []
  push(item: T) {
    return this.data.push(item)
  }
  pop(): T {
    return this.data.shift()
  }
}
const queueTwo = new QueueTwo<number>()
queueTwo.push(1)
queueTwo.push('str') // 编译报错
console.log(queue.pop().toFixed())
const queueThree = new QueueTwo<string>()
queueThree.push('str')


interface KeyPair<T, U> {
  key: T;
  value: U;
}
let kp1: KeyPair<number, string> = {key: 123, value: 'str'}
let kp2: KeyPair<string, number> = {key: 'str', value: 123}


let arr: number[] = [1,2,3]
let arrTwo: Array<number> = [1,2,3]


interface IPlus<T> {
  (a: T, b: T) : T
}
function plus(a: number, b: number): number {
  return a+b
}
function connect(a: string, b: string):string {
  return a+b;
}
const a: IPlus<number> = plus
const b: IPlus<string> = connect