import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'
import state from './state'
import mutations from './mutations.js'
//用来改变state时在控制台输出log
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict: debug,
	plugins: debug ? [createLogger()] : []
})