import {defineStore} from "pinia";

export const useKeyboardStore = defineStore('keyboard', {
    state: () => ({
        symbol: '',
        version: 0
    }),
    actions: {
        updateSymbol(input: string) {
            this.symbol = input
            this.version++
        }
    },
    persist: {
        storage: sessionStorage
    }
})