const hello = (name: string)=>{ // 传入参数为string类型
  return `hello ${name}`
}
hello('viking')
hello(123) // 编译不通过
hello(false) // 编译不通过
hello('haha')