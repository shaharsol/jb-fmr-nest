interface PublicActions {
    sum(a: number, b: number): number
    log(message: string): void
    returnFunction(): Function
}

abstract class Implementation implements PublicActions {
    sum(a: number, b: number): number {
        return a + b
    }
    log(message: string): void {
        console.log(message)
    }
    returnFunction(): Function {
        return () => {}
    }

    abstract doSoemthing(): void 
}

class ActualImplementation extends Implementation {
    doSoemthing(): void {
        console.log('hello')
    }
}
const impl = new ActualImplementation()
export default impl
