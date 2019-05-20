import * as WebSocket from 'ws'
import { Server } from 'http'

const sockets: WebSocket[] = []

const getSockets = (): WebSocket[] => sockets

const startP2PServer = (server: Server) => {
  const wsServer: WebSocket.Server = new WebSocket.Server({ server })
  wsServer.on('connection', ws => {
    console.log(`Hello ${JSON.stringify(ws)}`)
  })
  console.log('WebchemistCoin P2P Server Running!')
}

const initSocketConnection = (socket: WebSocket) => {
  sockets.push(socket)
}

const connectToPeers = newPeer => {
  const ws = new WebSocket(newPeer)
  ws.on('open', () => {
    initSocketConnection(ws)
  })
}

export { getSockets, startP2PServer, connectToPeers }
