<template>
  <div>
    <navbar />
    <div class="container">
      <div class="wrapper">
        <span>Matrículas</span>
        <span class="btnAddMatricula" @click="addMatricula()">Adicionar Matrícula</span>
        <ul>
          <li v-for="matricula in matriculas" :key="matricula.id">
            <span @click="editMatricula(matricula.id)">
              <div>Id: {{matricula.id}}</div>
              <div>Nome do aluno: {{matricula.nome}}</div>
              <div>Curso: {{getNomeCurso(matricula.curso_id)}}</div>
              <div>Data da matrícula: {{getData(matricula.data_matricula)}}</div>
              <div>Status: {{getStateMatricula(matricula.status)}}</div>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/navbar';
import { enumStateMatricula } from '../../../../utils';
export default {
  components: {
    Navbar
  },
  data() {
    return {
      // matriculas: []
    };
  },
  created() {
    // this.matriculas = [
    //   {
    //     id: 32432432,
    //     nomeAluno: 'Fulano',
    //     nomeCurso: 'Direito',
    //     dataMatricula: '2019-06-02T19:07:10.056Z',
    //     status: 'A'
    //   },
    //   {
    //     id: 93248938,
    //     nomeAluno: 'Fulano',
    //     nomeCurso: 'Medicina',
    //     dataMatricula: '2019-06-15T08:25:10.056Z',
    //     status: 'C'
    //   },
    //   {
    //     id: 6546545,
    //     nomeAluno: 'Beltrano',
    //     nomeCurso: 'Direito',
    //     dataMatricula: '2019-06-02T19:07:10.056Z',
    //     status: 'F'
    //   },
    //   {
    //     id: 87392838,
    //     nomeAluno: 'Ciclano',
    //     nomeCurso: 'Direito',
    //     dataMatricula: '2019-06-18T19:07:10.056Z',
    //     status: 'T'
    //   }
    // ]

    this.$store.dispatch("cursos/loadCursos")
      .then(() => {})
      .catch(e => {});

    this.$store.dispatch("matriculas/loadMatriculas")
      .then(() => {})
      .catch(e => {});
  },
  computed: {
    matriculas() {
      return this.$store.getters["matriculas/getMatriculas"];
    },
  },
  methods: {
    getNomeCurso(cursoId) {
      let curso = this.$store.getters["cursos/getCursoById"](cursoId);
      return curso && curso.nome || '';
    },
    editMatricula(matriculaId) {
      this.$router.push('/matriculas/' + matriculaId);
    },
    addMatricula() {
      this.$router.push('/matriculas/add');
    },
    getData(data) {
      let dataMatricula = new Date(data);
      let day = dataMatricula.getDate();
      let thisMonth = dataMatricula.getMonth() + 1;
      let thisYear = dataMatricula.getFullYear();
      let hour = dataMatricula.getHours();
      let minutes = dataMatricula.getMinutes();

      if(day < 10)
        day = '0' + day;
      if(thisMonth < 10)
        thisMonth = '0' + thisMonth;

      if(hour < 10)
        hour = '0' + hour;
      if(minutes < 10)
        minutes = '0' + minutes;

      return day + '/' + thisMonth + '/' + thisYear  + ' - ' + hour + ':' + minutes;
    },
    getStateMatricula(state) {
      return enumStateMatricula(state);
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 20px 20px 20px 20px;
    overflow: hidden;
  }
  ul {
    margin:0px;
    padding:0px;
  }

  ul li {
    list-style:none;
  }

  ul li span {
    background:#1C1E1F;
    color:#ccc;
    border-bottom:1px solid #111;
    display:block;
    padding:10px;
    margin-top: 5px;
    cursor: pointer;
    border-radius: 3px;
  }
  .btnAddMatricula {
    border: 1px solid #9c9c9c;
    padding: 6px;
    float: right;
    margin-top: -13px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #ccc;
  }
  .btnAddMatricula:active {
    background-color: #b1b0b0;
  }
</style>