<template>
    <form  @submit.prevent="onSubmit" class="d-flex ml-2 mt-2">
        <div class="flex-grow-1 mr-2 ">
            <input  class="form-control"
                    type="text"
                    placeholder="Add Your To-Do"
                    v-model="todo"
                    >
        </div>
        <div>
            <button class="btn btn-primary" 
                    type="submit">Add</button>
        </div>
    </form>

    <div v-show="hasError" style="color : red;">
        This field cannot be empty!!!
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    emits : ['add-todo'],
    setup(props, context){
        const todo = ref('');
        const hasError = ref(false);

        const onSubmit = () => {
            if(todo.value === ''){
                hasError.value = true;
            }else{
                context.emit('add-todo', {
                    id : Date.now(),
                    subject : todo.value,
                    completed : false,
                });
                hasError.value = false;
                todo.value='';
            }
        }

        return{
            todo,
            onSubmit,
            hasError
        }
    }
}
</script>

<style>

</style>