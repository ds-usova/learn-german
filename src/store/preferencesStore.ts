import {defineStore} from "pinia";

export const usePreferencesStore = defineStore('preferences', {
    state: () => {
        return {
            showKeyboard: false
        }
    },
    actions: {
        toggleKeyboard() {
            this.showKeyboard = !this.showKeyboard
        }
    },
    persist: {
        storage: sessionStorage
    }
})