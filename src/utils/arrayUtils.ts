export function shuffle<T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        swap(array, i, j)
    }
    return array
}

export function swap<T>(array: Array<T>, i: number, j: number) {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

export function isLast<T>(array: Array<T>, i: number): boolean {
    return array.length - 1 == i
}

export function last<T>(array: Array<T>): T {
    return array[array.length - 1]
}

export function isArrayIndex<T>(array: Array<T>, i: number): boolean {
    if (array.length == 0) return false
    return i >= 0 && i < array.length
}
