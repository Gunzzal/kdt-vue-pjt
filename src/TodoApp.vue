<template>
  <input
    class="form-control ml-2 mr-2 mt-2"
    type="text"
    v-model="searchTxt"
    placeholder="Search..."
  />

  <TodoForm @add-todo="addTodo" />
  <div style="color: red">{{ error }}</div>
  <TodoList
    :todos="filterdTodos"
    @toggle-todo="toggleTodo"
    @delete-todo="onDelete"
  />
  
</template>

<script>
import { ref, computed } from "vue";
import TodoForm from "./components/Todo/TodoForm.vue";
import TodoList from "./components/Todo/TodoList.vue";
import axios from "@/axios";

export default {
  components: {
    TodoForm,
    TodoList,
  },

  setup() {
    const todos = ref([]);
    const searchTxt = ref("");
    const error = ref("");

    const getTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        todos.value = response.data;
      } catch (err) {
        console.log(err);
      }
    };
    getTodos();

    // onMounted(getTodos);
    /*
        기존 배열에 담았던 객체 정보를
        axios 통신을 통해서 json-server db.json 에 저장하도록 변경
        */
    // const addTodo = (data) =>{
    //     todos.value.push(data);
    // }

    // const addTodo = (data) => {
    //   error.value='';
    //   axios
    //     .post("http://localhost:3000/todos", {
    //       id: Date.now(),
    //       subject: data.subject,
    //       completed: data.completed,
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       console.log(response.data);
    //       todos.value.push(response.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       error.value = "Something went wrong";
    //     });
    // };

    const addTodo = async (data) => {
      try {
        const response = await axios.post("http://localhost:3000/todos", {
          id: Date.now(),
          subject: data.subject,
          completed: data.completed,
        });
        todos.value.push(response.data);
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong";
      }
    };

    // const toggleTodo = (index) => {
    //   todos.value[index].completed = !todos.value[index].completed;
    // };

    const toggleTodo = async (data) => {
      const todoId = data.id;
      const updatedData = {
        completed: !data.completed, 
      };
      const index = todos.value.findIndex((todo) => todo.id === data.id);
      todos.value[index].completed = !data.completed;
      try {
        const response = await axios.patch(
          `todos/${todoId}`,updatedData
        );
        console.log(response);
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong";
      }
    };

    // const onDelete = (index) => {
    //   console.log("debug >>> todos delete index, ", index);
    //   todos.value.splice(index, 1);
    // };

    const onDelete = async (ID) => {
      console.log("debug >>> todos delete index, ", ID);
      const todoId = ID;

      try {
        const response = await axios.delete(
          `todos/${todoId}`
        );
        console.log(response);
        const index = todos.value.findIndex((todo) => todo.id === ID);
        todos.value.splice(index, 1);
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong";
      }
    };

    const filterdTodos = computed(() => {
      if (searchTxt.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchTxt.value);
        });
      }
      return todos.value;
    });

    return {
      todos,
      addTodo,
      searchTxt,
      filterdTodos,
      toggleTodo,
      onDelete,
      error,
      getTodos,
    };
  },
};
</script>

<style></style>
