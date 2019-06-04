import Vue from 'vue'
import Vuex from 'vuex'

import cursos from './cursos'
import matriculas from './matriculas'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cursos,
    matriculas,
  }
})
