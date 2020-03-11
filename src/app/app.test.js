import { createOvermindMock } from "overmind"
import { config } from "./config"

/*
* getLatestBlock is tricky because it is time dependant and the 
* results need to be handled differently depending on the current block state
*/

test("getLatestBlock adds new consecutive latest blocks at the start of the array", async() => {
    const arr = [
        { hash: 3, prev_block: 2, height:3 },
        { hash: 2, prev_block: 1, height:2 },
        { hash: 1, prev_block: 0, height:1 }
    ];

    const app = createOvermindMock(config, {
        getLatestBlock: async() => arr.pop()
    });

    await app.actions.updateLatest();
    expect(app.state.blocks.length).toBe(1)
    expect(app.state.blocks[0].hash).toBe(1)

    await app.actions.updateLatest();
    expect(app.state.blocks.length).toBe(2)
    expect(app.state.blocks[0].hash).toBe(2)

    await app.actions.updateLatest();
    expect(app.state.blocks.length).toBe(3)
    expect(app.state.blocks[0].hash).toBe(3)
})

test("getLatestBlock updates latest block if there is no newer block", async() => {
    const arr = [
        { hash: 1, prev_block: 0, height:1, secondLatest: true },
        { hash: 1, prev_block: 0, height:1 }
    ];

    const app = createOvermindMock(config, {
        getLatestBlock: async() => arr.pop()
    });

    await app.actions.updateLatest();
    expect(app.state.blocks.length).toBe(1)
    expect(app.state.blocks[0].secondLatest).toBeFalsy()

    await app.actions.updateLatest();
    expect(app.state.blocks.length).toBe(1)
    expect(app.state.blocks[0].secondLatest).toBe(true)
})

test("getLatestBlock replaces the block list if there is no continuity in newest latest", async() => {
    const arr = [
        { hash: 3, prev_block: 2, height:3 },
        { hash: 1, prev_block: 0, height:1 }
    ];

    const app = createOvermindMock(config, {
        getLatestBlock: async() => arr.pop()
    });

    await app.actions.updateLatest();
    expect(app.state.blocks.length).toBe(1)
    expect(app.state.blocks[0].hash).toBe(1)

    await app.actions.updateLatest();
    expect(app.state.blocks.length).toBe(1)
    expect(app.state.blocks[0].hash).toBe(3)
})