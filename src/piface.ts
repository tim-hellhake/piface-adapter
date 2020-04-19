import { open as openMcp23s17, Mcp23s17, IODIRA, IODIRB, GPPUA, GPPUB, GPIOA, GPIOB } from './mcp23s17'

export async function open(address?: number) {
    const mcp = await openMcp23s17(0, 0, address);
    return new PiFace(mcp);
}

function byteToBitArray(byte: number) {
    const bits = [];

    for (let i = 0; i < 8; i++) {
        bits.push(((byte >> i) & 0x01) == 0x01)
    }

    return bits;
}

export class PiFace {
    constructor(private mcp: Mcp23s17) {
    }

    async init() {
        await this.mcp.writeRegister(IODIRA, 0x00);
        await this.mcp.writeRegister(IODIRB, 0xFF);
        await this.mcp.writeRegister(GPPUA, 0x00);
        await this.mcp.writeRegister(GPPUB, 0xFF);
    }

    public async getInputs() {
        const byte = await this.mcp.readRegister(GPIOB);
        return byteToBitArray(~byte);
    }

    public async setOutput(index: number, value: boolean) {
        const oldValue = await this.mcp.readRegister(GPIOA);
        const newValue = value ? oldValue | (0x01 << index) : oldValue & ~(0x01 << index);
        console.log(byteToBitArray(oldValue));
        console.log(byteToBitArray(newValue));
        await this.mcp.writeRegister(GPIOA, newValue)
    }
}
