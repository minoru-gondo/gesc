<template>
  <div>
    <navbar />
    <div class="container">
      <div class="wrapper">
        <span>Cursos</span>
        <span class="btnAddCurso" @click="addCurso()">Adicionar Curso</span>
        <ul>
          <li v-for="curso in cursos" :key="curso.id">
            <span @click="editCurso(curso.id)">
              <div>Id: {{curso.id}}</div>
              <div>Nome: {{curso.nome}}</div>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/navbar';
export default {
  components: {
    Navbar
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("cursos/loadCursos")
      .then(() => {})
      .catch(e => {});
  },
  computed: {
    cursos() {
      return this.$store.getters["cursos/getCursos"];
    },
  },
  methods: {
    editCurso(cursoId) {
      this.$router.push('/cursos/' + cursoId);
    },
    addCurso() {
      this.$router.push('/cursos/add');
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
  .btnAddCurso {
    border: 1px solid #9c9c9c;
    padding: 6px;
    float: right;
    margin-top: -13px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #ccc;
  }
  .btnAddCurso:active {
    background-color: #b1b0b0;
  }
</style>