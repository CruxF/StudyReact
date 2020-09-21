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