void setup() {
  Serial.begin(57600);
  Bean.setAccelerationRange(2);
}

void loop() {
  AccelerationReading acceleration = Bean.getAcceleration();
  unsigned long x = acceleration.xAxis + 512;
  unsigned long y = acceleration.yAxis + 512;
  unsigned long z = acceleration.zAxis + 512;
  long msg = ((x & 0x3FFL) << 20) | ((y & 0x3FFL) << 10) | z & 0x3FFL;
  //int bat = Bean.getBatteryLevel();
  //Serial.print(bat);
  Serial.print(msg);
  Bean.sleep(50);
}



