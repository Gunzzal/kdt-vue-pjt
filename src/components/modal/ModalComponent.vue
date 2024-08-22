<template>
  <div class="container">

    <div class="modal-wrapper" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <slot name="title"></slot>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="onClose"
            ></button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
            <!-- <p>Are you sure you want to delete this todo?</p> -->
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
            <!-- <button
              type="button"
              class="btn btn-secondary"
              @click="onClose"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="onDelete">Delete</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits : ['close'],
  setup(props, {emit}) {
    const onClose = () => {
      emit('close');
    }
    // const onDelete = () => {
    //   emit('delete');
    // }
    return {
      onClose,
      // onDelete,
    }
  },
};
</script>

<style>
  .modal-content > *{
    background-color : white;
  }
  p, h5{
    background-color : white;
  }
  .modal-wrapper{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
