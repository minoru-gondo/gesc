<template>
  <div>
    <navbar />
    <div class="container">
      <div class="wrapper">
        <span>Editar Matricula</span>
        <div class="form">
          <div class="row">
            <div style="width:30%">
              <div class="tituloCampo">CPF</div>
              <input 
                type="text" 
                ref="cpf"
                v-mask="['###.###.###-##']" 
                class="inputText" 
                placeholder="" />
            </div>
            <div style="width: 65%;">
              <div class="tituloCampo">Curso</div>
              <Select2
                v-model="cursoId"
                :options="cursos" 
                :settings="{ width: '100%', lang: 'pt-br' }"
                @change="myChangeEvent($event)" 
                @select="mySelectEvent($event)" />
            </div>
          </div>
          <div class="row">
            <div style="width: 65%;">
              <div class="tituloCampo">Nome do aluno</div>
              <input 
                type="text" 
                ref="nome"
                class="inputText" 
                placeholder="" />
            </div>
            <div style="width: 30%;">
              <div class="tituloCampo">Data de nascimento</div>
                <input
                  type="date" 
                  ref="dataNascimento"
                  class="inputText"
                  style="height: 16px;"
                  placeholder="" />
            </div>
          </div>
          <div class="row">
            <div style="width: 65%;">
              <div class="tituloCampo">Email</div>
                <input
                  type="email" 
                  ref="email"
                  class="inputText"
                  placeholder="" />
            </div>
            <div style="width: 30%;">
              <div class="tituloCampo">Telefone</div>
                <input
                  type="tel" 
                  ref="telefone"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                  class="inputText"
                  placeholder="" />
            </div>
          </div>
        </div>
        <div class="buttons">
          <span class="button btnBack" @click="voltar()">Cancelar</span>
          <span class="button btnDelete" @click="excluirMatricula()">Excluir</span>
          <span class="button btnAddMatricula" @click="editMatricula()">Salvar</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/navbar';
import {mask} from 'vue-the-mask'
export default {
  data() {
    return {
      matriculaId: null,
      cursoId: null,
      currentMatricula: {}
    };
  },
  components: {
    Navbar
  },
  directives: {
    mask
  },
  mounted() {
    this.matriculaId = parseInt(this.$route.params.matriculaId);
    this.currentMatricula = this.$store.getters["matriculas/getMatriculaById"](this.matriculaId);

    if(this.currentMatricula && this.currentMatricula.id) {

      let dataNascimento = new Date(this.currentMatricula.data_nascimento);
      let ano = dataNascimento.getFullYear();
      let mes = dataNascimento.getMonth() + 1;
      let dia = dataNascimento.getDate();

      if(mes < 10)
        mes = '0'+ mes;
      if(dia < 10)
        dia = '0'+ dia;

      this.cursoId = this.currentMatricula.curso_id;
      this.$refs.cpf.value = this.currentMatricula.cpf;
      this.$refs.nome.value = this.currentMatricula.nome;
      this.$refs.dataNascimento.value = ano + '-' + mes + '-' + dia;
      this.$refs.email.value = this.currentMatricula.email;
      this.$refs.telefone.value = this.currentMatricula.telefone;
    }
    else {
      this.voltar();
      alert('Matricula não encontrada, verifique na lista de matriculas realizadas.');
    }
  },
  computed: {
    cursos() {
      let todosCursos = this.$store.getters["cursos/getCursos"];
      todosCursos.map((c) => {
        c.text = c.nome;
      });
      return todosCursos;
    }
  },
  methods: {
    voltar() {
      this.$router.push('/matriculas/');
    },
    editMatricula() {
      let self = this;

      let dataNascimento = self.$refs.dataNascimento.value;
      if(dataNascimento) {
        dataNascimento = dataNascimento.split('-');
        dataNascimento = new Date(parseInt(dataNascimento[0]), (parseInt(dataNascimento[1]) -1), parseInt(dataNascimento[2]),0,0,0);
        dataNascimento = dataNascimento.toISOString();
      }
      
      let data = {
        id: self.matriculaId,
        cpf: self.$refs.cpf.value,
        curso_id: parseInt(self.cursoId),
        aluno_id: self.currentMatricula.aluno_id,
        nome: self.$refs.nome.value,
        data_nascimento: dataNascimento,
        email: self.$refs.email.value,
        telefone: self.$refs.telefone.value,
        data_matricula: self.currentMatricula.data_matricula
      }

      if(!data.cpf)
        return alert('Campo do CPF está em branco, favor preencher!');
      else if(data.cpf.length < 14)
        return alert('Campo do CPF está incompleto, favor preencher!');
      else if(!data.nome)
        return alert('Campo do nome está em branco, favor preencher!');
      else if(!data.data_nascimento)
        return alert('Data de nascimento está em branco, favor preencher!');
      else if(!data.email)
        return alert('Email está em branco, favor preencher!');
      else if(data.email && data.email.indexOf('@') == -1)
        return alert('Email está incompleto, favor preencher!');
      else if(!data.telefone)
        return alert('Telefone está em branco, favor preencher!');
      else if(data.telefone.length < 14)
        return alert('Telefone está incompleto, favor preencher!');
      else {
        self.$store.dispatch("matriculas/editMatricula", data)
          .then(() => {
            debugger;
            self.$router.push('/matriculas/');
            alert('Matricula editada com sucesso!');
          })
          .catch(e => {
            alert('Não foi possível editar a matrícula, entre em contato com o suporte.');
          });
      }
    },
    myChangeEvent(event) {},
    mySelectEvent(event) {}
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
  .row {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: row;
    padding-top: 10px;
  }
  .col-30 {
    width: 30%;
  }
  .col-70 {
    width: 65%;
  }
  .col-100 {
    width: 100%;
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
  .btnAddMatricula {
    background: #ccc;
  }
</style>