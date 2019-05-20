import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import { getBlockchain, createNewBlock } from './libs/block'
import { startP2PServer, connectToPeers } from './libs/p2p'
import { Server } from 'http'

const app = express()
const POST = process.env.HTTP_PORT || 4040

app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/blocks', (req: express.Request, res: express.Response) => {
  res.send(getBlockchain())
})

app.post('/blocks', (req: express.Request, res: express.Response) => {
  const {
    body: { data },
  } = req
  const newBlock = createNewBlock(data)
  res.send(newBlock)
})

app.post('/peers', (req: express.Request, res: express.Response) => {
  const {
    body: { peer },
  } = req
  connectToPeers(peer)
  res.send()
})

const server: Server = app.listen(POST, () => {
  console.log(`WebchemistCoin HTTP Server Running on ${POST} ✅`)
})

startP2PServer(server)
