import Vue from 'vue';

export default {
  async getAll() {
    return await Vue.axios.get('http://localhost:8000/api/cursos/')
      .then((response) => {
        return response.data;
      })
      .catch(error => []);
  },
  async post(data) {
    return await Vue.axios.post('http://localhost:8000/api/cursos/add', data)
      .then((response) => {
        return response.data;
      })
      .catch(error => '');
  },
  async put(data) {
    return await Vue.axios.put('http://localhost:8000/api/cursos/' + data.id, data)
      .then((response) => {
        return response.data;
      })
      .catch(error => '');
  },
  async delete(cursoId) {
    return await Vue.axios.delete('http://localhost:8000/api/cursos/' + cursoId)
      .then((response) => {
        return response.data;
      })
      .catch(error => '');
  },
};
