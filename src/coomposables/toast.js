import { onUnmounted, ref } from 'vue';

export const useToast = () => {

    const showAlert = ref(false);
    const alertMsg = ref();
    const alertType = ref();
    const timeout = ref();

    const triggerAlert = (msg, type = "success") => {
      showAlert.value = true;
      alertMsg.value = msg;
      alertType.value = type;

      timeout.value = setTimeout(() => {
        showAlert.value = false;
        alertMsg.value = "";
        alertType.value = "";
      }, 5000);
    };


    onUnmounted( () => {
        clearTimeout(timeout.value);
    })

    return{
        showAlert,
        alertMsg,
        alertType,
        triggerAlert
    }
}