import type { WebTransport } from './dom'

/**
 * Native Http3WTSession counterpart
 */
 export interface NativeHttp3WTSession {
  jsobj: WebTransportSessionEventHandler
  writeDatagram: (chunk: Uint8Array) => void
  orderUnidiStream: () => void
  orderBidiStream: () => void
  close: (arg: { code: number, reason: string }) => void
}

/**
 * Native Http3WTStream counterpart
 */
export interface NativeHttp3WTStream {
  jsobj: WebTransportStreamEventHandler
  startReading: () => void
  stopReading: () => void
  stopSending: (code: number) => void
  resetStream: (code: number) => void
  writeChunk: (buf: Uint8Array) => void
  streamFinal: () => void
}

export type Purpose = 'StreamRecvSignal' | 'StreamRead' | 'StreamWrite' | 'StreamReset' | 'StreamNetworkFinish'
export type NetTask = 'stopSending' | 'resetStream' | 'streamFinal'

export interface StreamRecvSignalEvent {
  object: NativeHttp3WTStream
  purpose: 'StreamRecvSignal'
  code: number
  nettask: NetTask
}

export interface StreamReadEvent {
  object: NativeHttp3WTStream
  purpose: 'StreamRead'
  data?: Uint8Array
  fin?: boolean
}

export interface StreamWriteEvent {
  object: NativeHttp3WTStream
  purpose: 'StreamWrite'
}

export interface StreamResetEvent {
  object: NativeHttp3WTStream
  purpose: 'StreamReset'
}

export interface StreamNetworkFinishEvent {
  object: NativeHttp3WTStream
  purpose: 'StreamNetworkFinish'
  nettask: NetTask
}

export interface WebTransportStreamEventHandler {
  onStreamRecvSignal: (evt: StreamRecvSignalEvent) => void
  onStreamRead: (evt: StreamReadEvent) => void
  onStreamWrite: (evt: StreamWriteEvent) => void
  onStreamReset: (evt: StreamResetEvent) => void
  onStreamNetworkFinish: (evt: StreamNetworkFinishEvent) => void
}

export interface SessionReadyEvent {
  object: NativeHttp3WTSession
  purpose: 'SessionReady'
}

export interface SessionCloseEvent {
  object: NativeHttp3WTSession
  purpose: 'SessionClose'
  errorcode: number
  error: string
}

export interface DatagramReceivedEvent {
  object: NativeHttp3WTSession
  purpose: 'DatagramReceived'
  datagram: Uint8Array
}

export interface DatagramSendEvent {
  object: NativeHttp3WTSession
  purpose: 'DatagramSend'
}

export interface NewStreamEvent {
  object: NativeHttp3WTSession
  purpose: 'Http3WTStreamVisitor'
  stream: NativeHttp3WTStream
  transport: object
  bidirectional: boolean
  incoming: boolean
}

export interface WebTransportSessionEventHandler {
  onReady: (evt: SessionReadyEvent) => void
  onClose: (evt: SessionCloseEvent) => void
  onDatagramReceived: (evt: DatagramReceivedEvent) => void
  onDatagramSend: (evt: DatagramSendEvent) => void
  onStream: (evt: NewStreamEvent) => void
  closeHook?: (() => void) | null
}

export interface ClientConnectedEvent {
  purpose: 'ClientConnected'
  success: boolean
}

export interface ClientWebtransportSupportEvent {
  purpose: 'ClientWebtransportSupport'
}

export interface Http3WTSessionVisitorEvent {
  purpose: 'Http3WTSessionVisitor'
  session: NativeHttp3WTSession
}

export interface Http3ClientEventHandler {
  onClientConnected: (evt: ClientConnectedEvent) => void
  onClientWebTransportSupport: (evt: ClientWebtransportSupportEvent) => void
  onHttp3WTSessionVisitor: (evt: Http3WTSessionVisitorEvent) => void
}

export interface Http3WTServerSessionVisitorEvent extends Http3WTSessionVisitorEvent {
  path: string
  object: any
}

/**
 * The Http3 server is listening on the specified port
 */
export interface Http3ServerListeningEvent {
  purpose: 'Http3ServerListening'
}

/**
 * The Http3 server has stopped listening on the specified port
 */
 export interface ServerStatusEvent {
  port: number | null
  host: string | null
  purpose: 'ServerStatus',
  status: 'error' | 'listening' | 'close'
}


export interface Http3ServerEventHandler {
  onHttp3WTSessionVisitor: (evt: Http3WTServerSessionVisitorEvent) => void
  onServerError: () => void
  onServerListening: () => void
  onServerClose: () => void
  onServerStatus: (evt: ServerStatusEvent) => void
}

/**
 * A defered promise with the value T
 */
export interface Deferred<T = unknown> {
  promise: Promise<T>
  resolve: (value?: T) => void
  reject: (reason?: any) => void
}

export type WebTransportSessionState = 'connected' | 'closed' | 'failed'

export interface WebTransportSession extends WebTransport {
  state: WebTransportSessionState
}
