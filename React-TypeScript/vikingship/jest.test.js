test('test common matcher', ()=>{
  expect(2+2).toBe(4) //2+2等于4
  expect(2+2).not.toBe(5) //2+2不等于5
})

test('test to be true or false', ()=>{
  expect(1).toBeTruthy() //1等于true
  expect(0).toBeFalsy() //0等于false
})

test('test number',()=>{
  expect(4).toBeGreaterThan(3) //4大于3
  expect(2).toBeLessThan(3) //2小于3
})

test('test object',()=>{ //对象属性是否相等
  expect({name: 'viking'}).toEqual({name: 'viking'})
})