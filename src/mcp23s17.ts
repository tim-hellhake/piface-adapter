import { open as openSpi, SpiDevice } from 'spi-device';

export const IODIRA = 0x00;
export const IODIRB = 0x01;
export const GPPUA = 0x0C;
export const GPPUB = 0x0D;
export const GPIOA = 0x12;
export const GPIOB = 0x13;

export function open(bus = 0, device = 0, address = 0x40): Promise<Mcp23s17> {
    return new Promise((resolve, reject) => {
        const dev = openSpi(bus, device, err => {
            if (err) {
                reject(err);
            } else {
                resolve(new Mcp23s17(dev, address));
            }
        });
    });
}

export class Mcp23s17 {
    constructor(private spi: SpiDevice, private deviceAddress: number) {
    }

    readRegister(address: number): Promise<number> {
        return new Promise((resolve, reject) => {
            const message = {
                sendBuffer: Buffer.from([this.deviceAddress | 0x01, address, 0x00]),
                receiveBuffer: Buffer.alloc(3),
                byteLength: 3,
                speedHz: 20000
            };

            this.spi.transfer([message], (err, [message]) => {
                if (err) {
                    reject(err);
                } else {
                    const {
                        receiveBuffer
                    } = message;

                    const [, , register] = receiveBuffer || []

                    resolve(register);
                }
            });
        });
    }

    writeRegister(address: number, byte: number): Promise<number> {
        return new Promise((resolve, reject) => {
            const message = {
                sendBuffer: Buffer.from([this.deviceAddress, address, byte]),
                receiveBuffer: Buffer.alloc(3),
                byteLength: 3,
                speedHz: 20000
            };

            try {
                this.spi.transfer([message], (err, [message]) => {
                    if (err) {
                        reject(err);
                    } else {
                        const {
                            receiveBuffer
                        } = message;

                        const [, , register] = receiveBuffer || []

                        resolve(register);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}
