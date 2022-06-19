import child_process from 'child_process'
import EventEmitter from 'events'
import readline from 'readline'
import Board from '../../entity/Board'
import Sfen from './Sfen'
import UsiMove from './UsiMove'

interface UsiMeta {
    name: string,
    author: string,
    options: Partial<EngineOption>[]
}

interface EngineOption {
    name: string,
    type: string,
    min: number,
    max: number,
    default: '<empty>' | string | number | boolean,
    value: string | number | boolean,
    enums: string[]
}

interface Info {
    depth: number
    seldepth: number
    score: number
    isMate: boolean
    nodes: number,
    nps: number,
    time: number,
    pv: UsiMove[]
}

const OK: symbol = Symbol()
const NG: symbol = Symbol()

export default class Engine {
    public meta: Partial<UsiMeta> = {}

    private spawn?: child_process.ChildProcessWithoutNullStreams
    private response: ((line: string) => void) = Engine.responseNop
    private event: EventEmitter = new EventEmitter()


    constructor() { }
    public static create(): Engine {
        const engine = new Engine()
        engine.spawn = child_process.spawn('/mnt/c/Users/issy/Documents/shogi/水匠5/Suisho5-AVX2.exe')
        engine.meta.options = []

        // response communication
        readline.createInterface({ input: engine.spawn.stdout }).on('line', line => engine.response(line))
        return engine
    }

    private async wait(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.event.on(OK, resolve)
            this.event.on(NG, reject)
        })
    }

    private write(command: string) {
        this.spawn?.stdin.write(command)
    }

    // server command
    public async usi(): Promise<void> {
        const waiter = this.wait()
        this.response = this.responseUsi
        this.write('usi\n')
        return waiter
    }

    public async setoption(name: string, value: string | number | boolean): Promise<void> {
        this.write(`setoption name ${name} value ${value}\n`)
    }

    public async usinewgame(): Promise<void> {
        this.write('usinewgame\n')
    }

    public async isready(): Promise<void> {
        const waiter = this.wait()
        this.response = this.responseIsReady
        this.write('isready\n')
        return waiter
    }

    public async position(board: Board): Promise<void> {
        const sfen = Sfen.fromBoard(board).v
        this.write(`position ${sfen}\n`)
    }

    public async go(): Promise<void> {
        const waiter = this.wait()
        this.response = this.responseGo
        this.write('go byoyomi 1000\n')
        return waiter
    }

    public async quit() {
        this.write('quit\n')
    }

    // response from usi command
    private static responseNop(_: string) { }
    private responseUsi(line: string) {
        const result: string[] = line.split(' ')
        switch (result[0]) {
            case 'id':
                switch (result[1]) {
                    case 'name': this.meta.name = result.slice(2).join(' '); break
                    case 'author': this.meta.author = result.slice(2).join(' '); break
                }
                return
            case 'option':
                const option: Partial<EngineOption> = { enums: [] }
                for (let i = 1; i < result.length; i++) {
                    switch (result[i]) {
                        case 'name': option.name = result[i + 1]; i++; continue
                        case 'type': option.type = result[i + 1]; i++; continue
                        case 'min': option.min = Number(result[i + 1]); i++; continue
                        case 'max': option.max = Number(result[i + 1]); i++; continue
                        case 'default': option.default = result[i + 1]; i++; continue
                        case 'var': option.enums?.push(result[i + 1]); i++; continue
                    }
                }
                if (option.default) {
                    switch (option.type) {
                        case 'check': option.default = Boolean(option.default)
                        case 'spin': option.default = Number(option.default)
                    }
                    if (option.default !== '<empty>') {
                        option.value = option.default
                    }
                }
                this.meta.options?.push(option)
                return
            case 'usiok':
                this.response = Engine.responseNop
                this.event.emit(OK)
                return
            default:
                this.event.emit(NG)
        }
    }
    private responseIsReady(line: string) {
        const result = line.split(' ')
        if (result[0] === 'readyok') {
            this.event.emit(OK)
        }
    }
    private responseGo(line: string) {
        const result = line.split(' ')
        console.debug(line)
        switch (result[0]) {
            case 'info':
                const info: Partial<Info> = { isMate: false }
                for (let i = 1; i < result.length; i++) {
                    switch (result[i]) {
                        case 'depth': info.depth = Number(result[i + 1]); i++; continue
                        case 'seldepth': info.seldepth = Number(result[i + 1]); i++; continue
                        case 'score':
                            const sub = result[i + 1]
                            if (sub === 'mate') { info.isMate = true }
                            info.score = Number(result[i + 2]); i += 2;
                            continue
                        //TODO mate
                        case 'nodes': info.nodes = Number(result[i + 1]); i++; continue
                        case 'nps': info.nps = Number(result[i + 1]); i++; continue
                        case 'time': info.time = Number(result[i + 1]); i++; continue
                        case 'pv':
                            info.pv = result.slice(i + 1).map(v => new UsiMove(v))
                    }
                }
                console.debug(info)
                return
            case 'bestmove':
                this.event.emit(OK)
                return
        }
    }
}
