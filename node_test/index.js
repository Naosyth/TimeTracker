import lightblue from 'bean-sdk'

let sdk = lightblue.sdk()

sdk.on('discover', (scannedDevice) => {
  sdk.connectScannedDevice(scannedDevice, (err, bean) => {
    if (err) {
      console.log(`Bean connection failed: ${err}`)
    } else {
      bean.lookupServices((err) => {
        if (err) {
          console.log(`Service lookup FAILED: ${err}`)
        } else {
          let serialTransportService = bean.getSerialTransportService()
          serialTransportService.registerForCommandNotification(0x0000, (commandObj) => {
            let receivedBuffer = commandObj.data
            let x = (receivedBuffer >> 20 & 0x3FF) - 512
            let y = (receivedBuffer >> 10 & 0x3FF) - 512
            let z = (receivedBuffer >> 0 & 0x3FF) - 512
            console.log(`X: ${x}\tY: ${y}\tZ: ${z}`)
            if (x < 0 && Math.abs(x) > Math.abs(y) && z < 0) {
              console.log("Face 1")
            } else if (y > 0 && Math.abs(y) > Math.abs(x) && z < 0) {
              console.log("Face 2")
            } else if (x > 0 && Math.abs(x) > Math.abs(y) && z < 0) {
              console.log("Face 3")
            } else if (y < 0 && Math.abs(y) > Math.abs(x) && z < 0) {
              console.log("Face 4")
            } else if (x < 0 && Math.abs(x) > Math.abs(y) && z > 0) {
              console.log("Face 5")
            } else if (y < 0 && Math.abs(y) > Math.abs(x) && z > 0) {
              console.log("Face 6")
            } else if (x > 0 && Math.abs(x) > Math.abs(y) && z > 0) {
              console.log("Face 7")
            } else if (y > 0 && Math.abs(y) > Math.abs(x) && z > 0) {
              console.log("Face 8")
            }
          })
        }
      })
    }
  })
})

sdk.startScanning(60, 'Bean+')
