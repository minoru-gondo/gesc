import Home from './assets/vue/pages/home.vue';
import CursosList from './assets/vue/pages/cursos/list.vue';
import CursosAdd from './assets/vue/pages/cursos/add.vue';
import CursosEdit from './assets/vue/pages/cursos/edit.vue';
import MatriculasList from './assets/vue/pages/matriculas/list.vue';
import MatriculasAdd from './assets/vue/pages/matriculas/add.vue';
import MatriculasEdit from './assets/vue/pages/matriculas/edit.vue';

export const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/cursos',
        component: CursosList
    },
    {
        path: '/cursos/add',
        component: CursosAdd
    },
    {
        path: '/cursos/:cursoId',
        component: CursosEdit
    },
    {
        path: '/matriculas',
        component: MatriculasList
    },
    {
        path: '/matriculas/add',
        component: MatriculasAdd
    },
    {
        path: '/matriculas/:matriculaId',
        component: MatriculasEdit
    }
];