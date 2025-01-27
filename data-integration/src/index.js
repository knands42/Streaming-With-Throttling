import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import csvToJson from 'csvtojson';
import { Transform } from 'node:stream';
import { randomUUID } from 'node:crypto';
import { log, makeRequest } from './util.js';
import ThrottleRequest from './throttle.js';

const throttleRequest = new ThrottleRequest({
  objectMode: true,
  requestsPerSecond: 10,
});

const dataProcessor = Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    const now = performance.now();
    const jsonData = chunk.toString().replace(/\d/g, now);
    const data = JSON.parse(jsonData);
    data.id = randomUUID();

    return callback(null, JSON.stringify(data));
  },
});

await pipeline(
  createReadStream('big.csv'),
  csvToJson(),
  dataProcessor,
  throttleRequest,
  async function* (source) {
    let counter = 0;
    for await (const data of source) {
      log(`processed ${++counter} items...`);
      const status = await makeRequest(data);
      if (status !== 200) {
        throw new Error(`Failed to send data: ${status}`);
      }
    }
  }
);
