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

