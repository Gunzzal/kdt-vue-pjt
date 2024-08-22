<template>
  <div class="container">
    <h2>Todo Read View</h2>

    <div v-if="loading">Lading...</div>

    <form v-else @submit.prevent="onUpdate">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label>Subject</label>

            <input type="text" class="form-control" v-model="todo.subject" />
            <div v-if="subjectError" style="color: red">{{ subjectError }}</div>
          </div>
        </div>

        <div class="row-6">
          <div class="form-group">
            <label>State</label>
            <div>
              <button
                :class="todo.completed ? 'btn btn-primary' : 'btn btn-danger'"
                @click="toggleState"
                type="button"
              >
                {{ todo.completed ? "Complete" : "InComplete" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea
            v-model="todo.body"
            class="form-control"
            cols="30"
            rows="10"
          ></textarea>
          <div v-if="bodyError" style="color: red">{{ bodyError }}</div>
        </div>
      </div>
      <button
        class="btn btn-outline-primary"
        type="button"
        :disabled="!todoUpdate"
        @click="openModal"
      >
        Update
      </button>
      <button class="btn btn-outline-danger ml-2" @click="backPage">
        Cancel
      </button>
    </form>

    <transition name="fade">
      <Alert v-if="showAlert" :type="alertType" :message="alertMsg" />
    </transition>

    <teleport to="#modal">
      <Modal v-if="showModal" @close="onClose">
        <template v-slot:title> Update Todo </template>
        <template v-slot:body>
          Are you sure you want to Update this todo?
        </template>
        <template v-slot:footer>
          <button type="button" class="btn btn-secondary" @click="onClose">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="updateTodo">
            Update
          </button>
        </template>
      </Modal>
    </teleport>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import axios from "@/axios";
import _ from "lodash";
import Alert from "@/components/alert/AlertComponents.vue";
import { useToast } from "@/coomposables/toast";
import Modal from "@/components/modal/ModalComponent.vue";

export default {
  components: {
    Alert,
    Modal,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    console.log("TodoView Params: ", route.params);
    console.log("TodoView Params id: ", route.params.id);

    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);

    const { showAlert, alertMsg, alertType, triggerAlert } = useToast();

    // const showAlert = ref(false);
    // const alertMsg = ref();
    // const alertType = ref();

    // const triggerAlert = (msg, type = 'success') =>{
    //   showAlert.value = true;
    //   alertMsg.value = msg;
    //   alertType.value = type;
    //   setTimeout(() => {
    //     showAlert.value = false;
    //     alertMsg.value = '';
    //     alertType.value = '';
    //   },3000);
    // }

    const todoUpdate = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    const getTodos = async () => {
      try {
        const response = await axios.get(`todos/${route.params.id}`);
        console.log("asdasda", response.data);
        todo.value = { ...response.data };
        originalTodo.value = { ...response.data };
        loading.value = false;

        // triggerAlert('Something get todo');
      } catch (err) {
        console.log(err);
        // triggerAlert('Something went to wrong...', 'danger');
      }
    };
    getTodos();

    const backPage = () => {
      router.push({
        name: "Todos",
      });
    };

    const toggleState = () => {
      todo.value.completed = !todo.value.completed;
      console.log(todo.value.completed);
    };

    const subjectError = ref("");
    const bodyError = ref("");

    // const onUpdate = async () => {
    //   subjectError.value = "";
    //   bodyError.value = "";
    //   const updatedData = {
    //     subject: todo.value.subject,
    //     body: todo.value.body,
    //     completed: todo.value.completed,
    //   };

    //   try {
    //     if (todo.value.subject && todo.value.body) {
    //       const response = await axios.patch(
    //         `todos/${route.params.id}`,
    //         updatedData
    //       );
    //       console.log(response);
    //       backPage();
    //     } else {
    //       if (!todo.value.subject) {
    //         subjectError.value = "subject is reqired";
    //       }
    //       if (!todo.value.body) {
    //         bodyError.value = "body is reqired";
    //       }
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     triggerAlert("Something went to wrong...", "danger");
    //   }
    // };

    const showModal = ref(false);

    const openModal = () => {
      console.log("open");
      showModal.value = true;
    };

    const onClose = () => {
      console.log("debug >>> Modal emit onClose Click~~");
      showModal.value = false;
    };

    const updateTodo = async() => {
      subjectError.value = "";
      bodyError.value = "";
      showModal.value = false;
      const updatedData = {
        subject: todo.value.subject,
        body: todo.value.body,
        completed: todo.value.completed,
      };

      try {
        if (todo.value.subject && todo.value.body) {
          const response = await axios.patch(
            `todos/${route.params.id}`,
            updatedData
          );
          console.log(response);
          backPage();
        } else {
          if (!todo.value.subject) {
            subjectError.value = "subject is reqired";
          }
          if (!todo.value.body) {
            bodyError.value = "body is reqired";
          }
        }
      } catch (err) {
        console.log(err);
        triggerAlert("Something went to wrong...", "danger");
      }
    }

    return {
      route,
      loading,
      todo,
      backPage,
      toggleState,
      // onUpdate,
      todoUpdate,
      showAlert,
      alertMsg,
      alertType,
      bodyError,
      subjectError,
      openModal,
      onClose,
      showModal,
      updateTodo
    };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1 ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 1;
  transform: translateY(-30px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(-30px);
}
</style>
