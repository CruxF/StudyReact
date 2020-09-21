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