import restMatriculas from '../webservice/matriculas';
import restAlunos from '../webservice/alunos';

export default {
  namespaced: true,
  state: {
    matriculas: []
  },
  getters: {
    getMatriculas(state, getters, rootState) {
      return state.matriculas;
    },
    getMatriculaById(state, getters, rootState) {
      return (matriculaId) => {
        return state.matriculas.find((m) => m.id === matriculaId);
      };
    },
  },
  mutations: {
    setMatriculas(state, matriculas) {
      state.matriculas = matriculas;
    },
    addMatricula(state, matricula) {
      state.matriculas.push(matricula);
    },
    editMatricula(state, matricula) {
      let idx = state.matriculas.findIndex((m) => m.id === matricula.id);
      if(idx != -1)
        state.matriculas[idx] = matricula;
    },
    deleteMatricula(state, matriculaId) {
      let idx = state.matriculas.findIndex((m) => m.id === matriculaId);
      if(idx != -1)
        state.matriculas.splice(idx, 1);
    },
  },
  actions: {
    async loadMatriculas(ctx) {
      await restMatriculas.getAll().then(async (response) => {
        let res = response.map(async (m) => {
          let aluno = await restAlunos.get(m.aluno_id);
          if(aluno) {
            m.nome = aluno.nome;
            m.cpf = aluno.cpf;
            m.data_nascimento = aluno.data_nascimento;
            m.email = aluno.email;
            m.telefone = aluno.telefone;
          }
          return m;
        });
        Promise.all(res).then((res) => {
          ctx.commit('setMatriculas', response);
        });
      });
    },
    async addMatricula(ctx, data) {
      let res = {};
      await restAlunos.post(data).then((response) => {
        if(response && response.id) {
          res.aluno_id = response.id;
          res.nome = response.nome;
          res.cpf = response.cpf;
          res.data_nascimento = response.data_nascimento;
          res.email = response.email;
          res.telefone = response.telefone;
        }
        else
          throw new Error('');
      });
      
      data.aluno_id = res.aluno_id;

      await restMatriculas.post(data).then((response) => {
        if(response) {
          res.data_matricula = response.data_matricula;
          res.status = response.status;
          res.curso_id = response.curso_id;
          ctx.commit('addMatricula', res);
        }
        else
          throw new Error('');
      });
    },
    async editMatricula(ctx, data) {
      let res = {};
      await restAlunos.put(data).then((response) => {
        if(response && response.id) {
          res.aluno_id = response.id;
          res.nome = response.nome;
          res.cpf = response.cpf;
          res.data_nascimento = response.data_nascimento;
          res.email = response.email;
          res.telefone = response.telefone;
        }
        else
          throw new Error('');
      });
      
      data.aluno_id = res.aluno_id;

      await restMatriculas.put(data).then((response) => {
        if(response) {
          res.data_matricula = response.data_matricula;
          res.status = response.status;
          res.curso_id = response.curso_id;
          ctx.commit('editMatricula', res);
        }
        else
          throw new Error('');
      });
    },
    async deleteMatricula(ctx, matriculaId) {
      await restMatriculas.delete(matriculaId).then((response) => {
        if(response)
          ctx.commit('deleteMatricula', matriculaId);
        else
          throw new Error('');
      });
    },
  },
}