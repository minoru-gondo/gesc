import Vue from 'vue';

export default {
  async getAll() {
    return await Vue.axios.get('http://localhost:8000/api/alunos/')
      .then((response) => {
        return response.data;
      })
      .catch(error => []);
  },
  async get(alunoId) {
    return await Vue.axios.get('http://localhost:8000/api/alunos/' + alunoId)
      .then((response) => {
        return response.data;
      })
      .catch(error => []);
  },
  async post(data) {
    return await Vue.axios.post('http://localhost:8000/api/alunos/add', data)
      .then((response) => {
        return response.data;
      })
      .catch(error => '');
  },
  async put(data) {
    return await Vue.axios.put('http://localhost:8000/api/alunos/' + data.aluno_id, data)
      .then((response) => {
        return response.data;
      })
      .catch(error => '');
  },
  async delete(alunoId) {
    return await Vue.axios.delete('http://localhost:8000/api/alunos/' + alunoId)
      .then((response) => {
        return response.data;
      })
      .catch(error => '');
  },
};
