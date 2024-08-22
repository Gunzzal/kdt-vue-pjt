<template>
  <router-view></router-view>
  <div class="container">
    <h2>Todos Page</h2>
    <input
      class="form-control ml-2 mr-2 mt-2"
      type="text"
      v-model="searchTxt"
      placeholder="Search..."
    />

    <!-- <TodoForm @add-todo="addTodo" />   변경 후 삭제 필요 !!!! -->
    <p/>
    <div class="d-grid gap-2" align="right">
      <button class="btn btn-primary ml-2" type="button" 
      @click = "moveTodoCreate">Create</button>
    </div>
    
    <div style="color: red">{{ error }}</div>
    <p/>

    <TodoList
      :todos="filterdTodos"
      @toggle-todo="toggleTodo"
      @open-modal="openModal"
    />

    <Alert v-if="showAlert" :type="alertType" :message="alertMsg" />

    <teleport to="#modal">
    <Modal v-if="showModal" @close="onClose">
      <template v-slot:title>
        Delte Todo
      </template>
      <template v-slot:body>
        Are you sure you want to delete this todo?
      </template>
      <template v-slot:footer>
        <button
              type="button"
              class="btn btn-secondary"
              @click="onClose"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="deleteTodo">Delete</button>
      </template>
    </Modal>
    </teleport>

  </div>
</template>

<script>
import { ref, computed } from "vue";
// import TodoForm from "@/components/Todo/TodoForm.vue";
import TodoList from "@/components/Todo/TodoList.vue";
import axios from "@/axios";
import Alert from "@/components/alert/AlertComponents.vue";
import { useToast } from "@/coomposables/toast";
import { useRouter } from 'vue-router';
import Modal from '@/components/modal/ModalComponent.vue';

export default {
  components: {
    // TodoForm,
    TodoList,
    Alert,
    Modal
  },

  setup() {
    const todos = ref([]);

    const searchTxt = ref("");
    const error = ref("");

    const { showAlert, alertMsg, alertType, triggerAlert } = useToast();

    const router = useRouter();
    

    const showModal = ref(false);

        const moveTodoCreate = () =>{
            // router.push(`todos/${todoId}`)
            router.push({
                name : 'Create',
                
            })
        };

    
    
    // const showAlert = ref(false);
    // const alertMsg = ref();
    // const alertType = ref();

    // const triggerAlert = (msg, type = "success") => {
    //   showAlert.value = true;
    //   alertMsg.value = msg;
    //   alertType.value = type;
    //   setTimeout(() => {
    //     showAlert.value = false;
    //     alertMsg.value = "";
    //     alertType.value = "";
    //   }, 3000);
    // };

    const getTodos = async () => {
      try {
        const response = await axios.get("todos");
        todos.value = response.data;
      } catch (err) {
        // console.log()
        console.log(err);
      }
    };
    getTodos();

    // updateMount(() => {
    //   getTodos();
    // });
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

    // const addTodo = async (data) => {
    //   try {
    //     const response = await axios.post("todos", {
    //       id: Date.now(),
    //       subject: data.subject,
    //       completed: data.completed,
    //     });
    //     todos.value.push(response.data);
    //   } catch (err) {
    //     console.log(err);
    //     error.value = "Something went wrong";
    //   }
    // };

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
        const response = await axios.patch(`todos/${todoId}`, updatedData);
        console.log(response);
        if (data.completed) {
          triggerAlert("Checked");
        } else {
          triggerAlert("unChecked");
        }
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

    const onClose = () =>{
      console.log("debug >>> Modal emit onClose Click~~");
      showModal.value = false;
    }

    // const deleteTodo = () =>{
    //   console.log("debug >>> Modal emit deleteTodo Click~~");
    //   showModel.value  = false;
    // }


    let deleteId = '';

    const deleteTodo = async () => {
      // const todoId = deleteId.value;
      console.log("debug >>> todos delete index, ", deleteId);
      try {
        const response = await axios.delete(`todos/${deleteId}`);
        console.log(response);
        getTodos();
        showModal.value = false;
      } 
      catch (err) {
        console.log(err);
        error.value = "Something went wrong";
      }
    };
    
    const openModal = (ID) => {
      showModal.value = true;
      console.log(ID);
      deleteId = ID;
    }
    return {
      todos,
      // addTodo,
      searchTxt,
      filterdTodos,
      toggleTodo,
      // onDelete,
      error,
      getTodos,
      showAlert,
      alertMsg,
      alertType,
      triggerAlert,
      moveTodoCreate,
      onClose,
      deleteTodo,
      showModal,
      openModal,
    };
  },
};
</script>

<style></style>
