import restCursos from '../webservice/cursos';

export default {
  namespaced: true,
  state: {
    cursos: []
  },
  getters: {
    getCursos(state, getters, rootState) {
      return state.cursos;
    },
    getCursoById(state, getters, rootState) {
      return (cursoId) => {
        return state.cursos.find((c) => c.id === cursoId);
      };
    },
  },
  mutations: {
    setCursos(state, cursos) {
      state.cursos = cursos;
    },
    addCurso(state, curso) {
      state.cursos.push(curso);
    },
    editCurso(state, curso) {
      let idx = state.cursos.findIndex((c) => c.id === curso.id);
      if(idx != -1)
        state.cursos[idx].nome = curso.nome;
    },
    deleteCurso(state, cursoId) {
      let idx = state.cursos.findIndex((c) => c.id === cursoId);
      if(idx != -1)
        state.cursos.splice(idx, 1);
    },
  },
  actions: {
    async loadCursos(ctx) {
      await restCursos.getAll().then((response) => {
        ctx.commit('setCursos', response);
      });
    },
    async addCurso(ctx, data) {
      await restCursos.post(data).then((response) => {
        if(response)
          ctx.commit('addCurso', response);
        else
          throw new Error('');
      });
    },
    async editCurso(ctx, data) {
      await restCursos.put(data).then((response) => {
        if(response)
          ctx.commit('editCurso', response);
        else
          throw new Error('');
      });
    },
    async deleteCurso(ctx, cursoId) {
      await restCursos.delete(cursoId).then((response) => {
        if(response)
          ctx.commit('deleteCurso', cursoId);
        else
          throw new Error('');
      });
    },
  },
}