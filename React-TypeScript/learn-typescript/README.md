# 什么是TypeScript(2-1)
编程语言的类型
- 动态语言类型
- 静态语言类型<br>

TypeScript究竟是什么
- 静态类型风格的类型系统
- 从es6到es10甚至是esnext的语法支持
- 兼容各种浏览器，各种系统，各种服务器，完全开源<br><br>


# 为什么要使用TypeScript(2-2)
1、程序更容易理解
- 问题：函数或者方法输入输出的参数类型，外部条件等；
- 动态语言的约束：需要手动调试等过程；
- 有了TypeScript：代码本身就可以回答上诉问题

2、效率更高
- 在不同代码块和定义中进行跳转
- 代码自动补充
- 丰富的接口提示

3、更少的错误
- 编译期间能够发现大部分错误
- 杜绝一些比较常见的错误

4、非常好的包容性
- 完全兼容JavaScript
- 第三方库可以单独编写类型文件
- 流行项目都支持<br><br>


# 安装和初试TypeScript(2-3)
- 安装：npm install -g typescript
- 检查：tsc -v
- 安装特定版本：npm install -g typescript@3.7.2
- 创建一个文件
```js
// hello.ts
const hello = (name)=>{
  return `hello ${name}`
}
hello('viking')
```
- 编译这个文件： tsc hello.js
- 加上点typescript的东西，再进行编译
```js
// hello.ts
const hello = (name: string)=>{ // 传入参数为string类型
  return `hello ${name}`
}
hello('viking')
hello(123) // 编译不通过
hello(false) // 编译不通过
hello('haha')
```
<br><br>


# 基础类型(2-4)
原始类型：除Object以外的所有类型都是不可变的(值本身无法被改变)。例如，与C语言不同，JavaScript中字符串是不可变的，如JavaScript中对字符串的操作一定返回了一个新字符串，原始字符串并没有被改变。我们称这些类型的值为"原始值"。
- Boolean
- Null
- Undefined
- Number
- BigInt
- Symbol
- String
```js
// basic-types.ts
let isDone: boolean = false
let isDones: boolean = 123 //编译错误

let age: number = 18
let binaryNumber: number = 0b1111 //16进制

let firstName: string = 'viking'
let message: string = `hello, ${firstName}, age is ${age}`

let u: undefined = undefined
let n: null = null

let num: number = undefined
let nums: number = null
```
<br><br>


# any类型和联合类型(2-5)
```js
// any意思是notSure变量可以为任何类型
let notSure: any = 4 
notSure = 'hhhh'
notSure = true
notSure.myName
notSure.getName()

let numberOrString: number | string = 123
numberOrString = 'hhh'
numberOrString = false // 编译报错
```
<br><br>


# Array和Tuple(2-6)
```js
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
```
<br><br>


# interface初探(2-7)
- 描述对象的形状
- 对类进行抽象
- Duck Typing(鸭子类型)
```js
interface Person {
  name: string;
  age: number;
}
let viking: Person = {
  name: 'viking',
  age: 20
}
let viping: Person = { //编译报错
  name: 'hhh',
  age: 10,
  car: true
}

interface Student {
  readonly id: number, // 该属性只读，不可被修改
  name: string; 
  age?: number; // 表示这个属性在定义时可有可无，不会编译报错
}
let jack: Student = {
  id: 123,
  name: 'hhhh'
}
jack.name = 'jjjj'
jack.id = 4556 // 编译报错
```
<br><br>


# 函数和类型推断(2-8)
```js
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
```
<br><br>


# 类-Class第一部分(2-9)
- 定义了一切事物的抽象特点
- 对象是类的实例
- 面向对象三大特性：封装、继承、多态
- 定义一个类
```js
// class.ts
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name
  }
  run() {
    return `${this.name} is running`
  }
}
const snake = new Animal('lily')
console.log(snake.run())
```
- 安装能在命令端运行代码的依赖：npm install -g ts-node(前提要全局安装typescript)
- 在命令行运行class.ts文件：ts-node class.ts
- 继承与多态
```js
// class.ts
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name
  }
  run() {
    return `${this.name} is running`
  }
}
const snake = new Animal('lily')
console.log(snake.run())

// 继承
class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}
const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run())
console.log(xiaobao.bark())

class Cat extends Animal {
  constructor(name) {
    super(name)
    console.log(this.name)
  }
  run() { // 重写父类的run方法
    return `meow, ` + super.run()
  }
}
const maomao = new Cat('maomao')
console.log(maomao.run())
```
<br><br>


# 类-Class第二部分(2-10)
```js
class Animal {
  public name: string; // public表示属性可被访问；
  protected weight: string; //protected表示属性只能被子类访问
  private age: number; // private表示属性不可被访问，子类也不行
  readonly sex: string; // 只能读， 不能被修改
  static categoies: string[] = ['mammal', 'bird'] // 静态属性，不用实例化可以直接访问
  static isAnimal(a) { // 静态方法，不用实例化可以直接访问
    return a instanceof Animal
  }
  constructor(name: string, age: number, weight: string) {
    this.name = name
    this.age = age
    this.weight = weight
  }
  run() {
    return `${this.name} is running, he ${this.age}age`
  }
}
const snake = new Animal('lily', 20, '90kg')
console.log(snake.name)
console.log(Animal.categoies)
console.log(Animal.isAnimal(snake))
snake.name = 'lucy'
// snake.age = 24 // 编译报错
// snake.weight = '100kg' //编译报错
console.log(snake.run())

// 继承
class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}
const xiaobao = new Dog('xiaobao', 22, '50kg')
console.log(xiaobao.run())
console.log(xiaobao.bark())

// 继承
class Cat extends Animal {
  constructor(name, age, weight) {
    super(name, age, weight)
    // console.log(this.age) //编译报错
  }
  run() { // 重写父类的run方法
    return `meow, ` + super.run()
  }
}
const maomao = new Cat('maomao', 19, '40kg')
console.log(maomao.run())
```
<br><br>


# 类和接口(2-11)
```js
interface Radio {
  switchRadio(): void;
}
interface Battery {
  checkBatteryStatus();
}
// 继承
interface RadioWithBattery extends Radio {
  checkBatteryStatus();
}

class Car implements Radio { //必须要实现switchRadio()
  switchRadio() {}
}
class CellPhone implements Radio, Battery { //必须要实现switchRadio()和checkBatteryStatus()
  switchRadio() {}
  checkBatteryStatus(){}
}
class Light implements RadioWithBattery { //必须要实现switchRadio()和checkBatteryStatus()
  switchRadio() {}
  checkBatteryStatus(){}
}
```
<br><br>


# 枚举-Enum(2-12)
```js
enum Direction {
  Up,
  Down,
  Left,
  Right
}
console.log(Direction.Up) // 0
console.log(Direction.Down) // 1
console.log(Direction[0]) // Up

enum Switch {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}
const value = 'up'
if(value === Switch.Up) {
  console.log('go up!')
}

// 常量枚举，能提升不少性能
const enum SwitchTwo {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}
```
<br><br>


# 泛型-Generics第一部分(2-13)
```js
function echo<T>(arg: T): T {
  return arg
}
const str: string = 'hhh'
const result = echo(str)

// 调换顺序方法
function swap<T, U>(tuple:[T,U]):[U,T] {
  return [tuple[1], tuple[0]]
}
const result2 = swap(['string', 123])
result2[1].charAt
```
<br><br>


# 泛型-Generics第二部分(2-14)
```js
function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
const arrs = echoWithArr([1,2,3])


interface IWithLength {
  length: number
}
function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}
const str = echoWithLength('str')
const obj = echoWithLength({length: 10, width: 10, name: 'jack'})
const arr2 = echoWithLength([1,2,3])
```
<br><br>


# 泛型-Generics第三部分(2-15)
```js
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
```
<br><br>


# 类型别名和类型断言(2-16)
```js
// 类型别名
type PlusType = (x: number, y: number) => number
function sum(x: number, y: number): number {
  return x+y
}
const sum2: PlusType = sum

type NameResolver = ()=>string
type NameOrResolver = string | NameResolver
function getName(n: NameOrResolver): string {
  if(typeof n === 'string') {
    return n
  } else {
    return n()
  }
}


// 类型断言
function getLength(input: string | number): number {
  // 第一种处理方式
  // const str = input as String
  // if(str.length) {
  //   return str.length
  // } else {
  //   const number = input as Number
  //   return number.toString().length
  // }

  // 第二种处理方式
  if((<string>input).length) {
    return (<string>input).length
  } else {
    return input.toString().length
  }
}
```
<br><br>


# 声明文件(2-17)

<br><br>


# 参考资料
- [慕课网WiKi](http://www.imooc.com/wiki/typescriptlesson)