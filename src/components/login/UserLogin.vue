<template>
  <div class="container">
    <h2>Login Page</h2>
    <form @submit.prevent="onLogin">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label" >ID</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Input your ID"
          v-model="user.id"
        />
      </div>
      <label for="inputPassword5" class="form-label" >Password</label>
      <input
        type="password"
        id="inputPassword5"
        class="form-control"
        aria-describedby="passwordHelpBlock"
        v-model="user.password"
      />
      <div class="d-grid gap-2 mt-2" style="text-align: right;">
        <button class="btn btn-primary" type="submit">login</button>
        <button class="btn btn-danger ml-2" type="reset">cancel</button>
      </div>
     
    </form>
    <teleport to="#modal">
    <Modal v-if="showModal" @close="onClose">
      <template v-slot:title>
       Login to Fail!!
      </template>
      <template v-slot:body>
       Id or password is wrong.
      </template>
      <template v-slot:footer>
        <button
              type="button"
              class="btn btn-secondary"
              @click="onClose"
            >
              Close
            </button>
            
      </template>
    </Modal>
    </teleport>
  </div>
</template>

<script>
import axios from "@/axios";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Modal from "@/components/modal/ModalComponent.vue";

export default {

    components: {
    Modal
  },

  setup() {
    let user = ref({});
    const router = useRouter();

    // const onLogin = async () => {
    //   try {
    //     let response = await axios.get(`users?id=${user.value.id}&password=${user.value.password}`);
    //     if(response.data.length > 0){
    //         user.value = response.data[0];
    //         console.log(user.value);
    //         router.push({
    //             name : 'Todos',
    //             params : {
    //                 "user" : user.value,
    //             }
    //         });
    //     }else{
    //         showModal.value = true;
    //     }
        
    //   } catch (err) {
    //     showModal.value = true;
    //     console.log(err);
    //   }
    // };

    const onLogin = async () => {
            console.log("debug >>> login create btn click") ; 
            try {
                // db.json 통신하고 정상적인 상황이면 router push 이용해서 화면 전환(todos)
                let response = await axios.get(`users` , {
                    params : {
                        id: user.value.id,
                        password: user.value.password
                    }
                });
                user.value = response.data[0] ;

                if (response.data.length > 0) {
                    alert('Login successful!');
                    router.push({
                    name: 'Todos',
                });
                }else{
                  showModal.value = true;
                }
                
                
                
            } catch( err ) {
              showModal.value = true;
                console.log( err );
            }
        }


    const showModal = ref(false);



    const onClose = () =>{
      console.log("debug >>> Modal emit onClose Click~~");
      showModal.value = false;
    }
   
    return {
        user,
        onLogin,
        showModal,
        onClose
    };
  },
};
</script>

<style></style>
