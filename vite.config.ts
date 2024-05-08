import {defineConfig} from 'vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        Vue({
            template: {transformAssetUrls},
        }),
        Vuetify()
    ],
})
