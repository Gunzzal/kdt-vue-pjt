<template>
  <div class="container">생명주기 관련한 부분으로 console.log 확인 바람</div>
  <button   class="btn btn-primary"
            :value="flag"
            @:click="btnHandler">Button</button>
</template>

<script>

import { onBeforeMount, onMounted, onUpdated, onUnmounted, ref } from 'vue';
export default {
    setup() {
        onBeforeMount( () => {
            console.log(">>>> onBeforeMount");
        });
        onMounted(() => {
            console.log(">>>> onMounted");
        });
        onUpdated(() => {
            console.log(">>>> onUpdated");
        });
        onUnmounted(() => {
            console.log(">>>> onUnmounted");
        });

        const flag = ref(false);

        const btnHandler = () => {
            flag.value = !flag.value;
        }

        return{
            btnHandler,
            flag
        }

    }
}
</script>

<style>

</style>