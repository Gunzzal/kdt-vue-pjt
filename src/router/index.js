import { createRouter, createWebHistory } from "vue-router";

import Home from '../todos/pages/TodoIndex.vue';
import Todos from '../todos/pages/components/TodosMain.vue';
import Todo from '../todos/pages/components/TodoView.vue';
import Login from '@/components/login/UserLogin.vue';
import Create from '@/todos/pages/components/TodoCreate.vue';

const router = createRouter({
    history : createWebHistory() ,
    routes : [
        {
            path :'/',
            name : 'Home',
            component : Home
        },
        {
            path :'/todos',
            name : 'Todos',
            component : Todos,
            
        },
        {
            path :'/todos/:id',
            name : 'Todo',
            component : Todo
        },
        {
            path :'/login',
            name : 'Login',
            component : Login
        },
        {
            path :'/create',
            name : 'Create',
            component : Create
        },
        
    ]
});

export default router;
