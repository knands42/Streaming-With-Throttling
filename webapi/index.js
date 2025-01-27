import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { createWriteStream } from 'node:fs';

const PORT = 3000;
const output = createWriteStream('output.ndjson');
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  limit: 20, // Limit each IP to 10 requests per `window` (here, per 15 minutes).
  standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const app = express();
app.use(express.json());
app.use(limiter);

app.post('/', async (req, res) => {
  console.log('received!!', JSON.stringify(req.body));
  output.write(JSON.stringify(req.body) + '\n');
  return res.send('ok!');
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
