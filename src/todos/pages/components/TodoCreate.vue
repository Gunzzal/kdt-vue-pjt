<template>
  <div class="container">
    <h2>Todo-Create</h2>
    <!-- <form @submit.prevent="onSubmit" class="d-flex ml-2 mt-2">
    <div class="flex-grow-1 mr-2">
      <input
        class="form-control"
        type="text"
        placeholder="Add Your To-Do"
        v-model="todo"
      />
    </div>
    <div>
      <button class="btn btn-primary" type="submit">Add</button>
    </div>
  </form> -->

    <form >
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label>Subject</label>
            <input type="text" class="form-control" v-model="todo.subject" />
            <div v-if="subjectError" style="color:red">{{ subjectError }}</div>
          </div>
        </div>

        <div class="row-6">
          <div class="form-group">
            <label>State</label>
            <div>
              <button class="btn btn-primary" type="button">InComplete</button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea v-model="todo.body" class="form-control" cols="30" rows="10"></textarea>
          <div v-if="bodyError" style="color:red">{{ bodyError }}</div>
        </div>
      </div>

      <button
        class="btn btn-outline-primary"
        type="button"
        @click="openModal"
      >
        Create
      </button>
      <button class="btn btn-outline-danger ml-2" @click="backPage">
        Cancel
      </button>
    </form>

    <teleport to="#modal">
    <Modal v-if="showModal" @close="onClose">
      <template v-slot:title>
        Create Todo
      </template>
      <template v-slot:body>
        Are you sure you want to create this todo?
      </template>
      <template v-slot:footer>
        <button
              type="button"
              class="btn btn-secondary"
              @click="onClose"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="createTodo">Create</button>
      </template>
    </Modal>
    </teleport>

    <!-- <div v-show="hasError" style="color: red">
      This field cannot be empty!!!
    </div> -->
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "@/axios";
import { useRouter } from "vue-router";
import Modal from "@/components/modal/ModalComponent.vue";

export default {

  components: {
    Modal
  },

  setup() {
    const todo = ref({});
    const router = useRouter();
    const subjectError = ref('');
    const bodyError = ref('');


    // const onCreate = async () => {
    //   subjectError.value = '';
    //   bodyError.value = '';
     
    //   const data = {
    //     id : Date.now(),
    //       subject : todo.value.subject,
    //       body : todo.value.body,
    //       completed : false,
    //       // lastChange : null
    //   }
    //   try {
    //     if(todo.value.subject && todo.value.body){
    //       const response = await axios.post("todos",data);
    //       console.log(response);
    //       backPage();
    //     }else{
    //       if(!todo.value.subject){
    //         subjectError.value = 'subject is reqired';
    //       }
    //       if(!todo.value.body){
    //         bodyError.value = 'body is reqired';
    //       }
    //     }
    //     // todo.value.subject='';
    //     // todo.value.body = '';
        
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    const backPage = () => {
      // router.push(`todos/${todoId}`)
      router.push({
        name: "Todos",
      });
    };

    const showModal = ref(false);

    const openModal = () => {
      console.log("open");
      showModal.value = true;

    }

    const onClose = () =>{
      console.log("debug >>> Modal emit onClose Click~~");
      showModal.value = false;
    }

    const createTodo = async () => {
      subjectError.value = '';
      bodyError.value = '';
     
      const data = {
        id : Date.now(),
          subject : todo.value.subject,
          body : todo.value.body,
          completed : false,
          // lastChange : null
      }
      try {
        if(todo.value.subject && todo.value.body){
          const response = await axios.post("todos",data);
          console.log(response);
          backPage();
        }else{
          if(!todo.value.subject){
            subjectError.value = 'subject is reqired';
          }
          if(!todo.value.body){
            bodyError.value = 'body is reqired';
          }
        }
        // todo.value.subject='';
        // todo.value.body = '';
        
      } catch (err) {
        console.log(err);
      }
    }

    return {
      // onCreate,
      todo,
      backPage,
      subjectError,
      bodyError,
      onClose,
      openModal,
      showModal,
      createTodo
    };
  },
};
</script>

<style></style>
