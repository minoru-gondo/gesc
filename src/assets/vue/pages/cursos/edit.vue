<template>
  <div>
    <navbar />
    <div class="container">
      <div class="wrapper">
        <span>Editar Curso</span>
        <div class="form">
          <div class="tituloCampo">Nome do curso</div>
          <input 
            type="text" 
            ref="nomeCurso" 
            class="inputText" 
            placeholder="" />
        </div>
        <div class="buttons">
          <span class="button btnBack" @click="voltar()">Cancelar</span>
          <span class="button btnDelete" @click="excluirCurso()">Excluir</span>
          <span class="button btnAddCurso" @click="editCurso()">Salvar</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/navbar';
export default {
  data() {
    return {
      cursoId: null,
      currentNome: ''
    };
  },
  components: {
    Navbar
  },
  mounted() {
    this.cursoId = parseInt(this.$route.params.cursoId);
    let curso = this.$store.getters["cursos/getCursoById"](this.cursoId);

    if(curso && curso.nome) {
      this.$refs.nomeCurso.value = curso.nome;
      this.currentNome = curso.nome;
    }
    else {
      this.voltar();
      alert('Curso não encontrado, verifique na lista de cursos cadastrados.');
    }
  },
  methods: {
    voltar() {
      this.$router.push('/cursos/');
    },
    excluirCurso() {
      let self = this;

      let res = confirm("Tem certeza que deseja excluir este curso?");

      if (res == true) {
        self.$store.dispatch("cursos/deleteCurso", self.cursoId)
          .then(() => {
            self.$router.push('/cursos/');
            alert('Curso excluído com sucesso!');
          })
          .catch(e => {
            alert('Não foi possível excluir o curso, entre em contato com o suporte.');
          });
      } 
      else
        return;
    },
    editCurso() {
      let self = this;

      let curso = {
        id: self.cursoId,
        nome: self.$refs.nomeCurso.value
      }

      if(!curso.nome)
        return alert('Campo do nome está em branco, favor preencher!');
      else if(curso.nome == self.currentNome)
        return alert('Campo do nome não foi editado.');
      else {
        self.$store.dispatch("cursos/editCurso", curso)
          .then(() => {
            self.$router.push('/cursos/');
            alert('Curso alterado com sucesso!');
          })
          .catch(e => {
            alert('Não foi possível editar o curso, entre em contato com o suporte.');
          });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 20px 20px 20px 20px;
    overflow: hidden;
  }
  .form {
    margin: 5px 0px;
    padding: 20px;
    display: block;
    background: #f1f1f1;
    border-radius: 5px;
  }
  .tituloCampo {
    margin-bottom: 0.3em;
    margin-left: 0.2em;
    white-space: nowrap;
    width: 100%;
  }
  .inputText {
    border-radius: 5px;
    border: 1px solid #4C4D6E;
    padding: 8px 5px 8px 5px;
    color: #2f3847;
    width: 100%;
    position: relative;
    display: block;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    align-content: space-around;
  }
  .button {
    padding: 5px 10px 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
  }
  .btnAddCurso {
    background: #ccc;
  }
</style>