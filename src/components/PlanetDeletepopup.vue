<script setup lang="ts">
  defineProps<{
    msg: string
  }>()

  const emit = defineEmits(['delete', 'no-delete']);

  function handleDelete() {
    console.log("handleDelete")
    emit('delete');
  }
  function handleCancel() {
    console.log("handleCancel")
    emit('no-delete');
  }


</script>

<template>
  <div class="popup popup-delete">
    <div class="bglayer"></div>
    <div class="mainsec">
      <div class="header">
        <div>
          <h1 class="green">{{ msg }}</h1>
        </div>
      </div>
      <div class="actions">
        <div class="text-right">
          <button class="btn primary" @click="handleDelete">Yes</button>
        </div>
        <div class="text-left">
          <button class="btn primary cancel" @click="handleCancel">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h2 {
  font-size: 1.6rem;
  margin-bottom: .5rem;
  top: -10px;
  position: relative;
}

.popup {
    max-width: 1200px;
    margin: 0 auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
}

.popup-delete {
  background-color: transparent;
  border-radius: 4px;
  border: solid #d5d5d5 1px;
  box-shadow: 1px 2px 2px #c2c2c2;
  padding: 40px 50px 60px;
}

.bglayer {
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  z-index: 0;
  background-color: rgba(229, 229, 229, 0.165);
  padding: 40px 20px;
  backdrop-filter: none;
  backdrop-filter: blur(10px);
}

.header {
  padding-bottom: 50px;
  &::after {
    content: ' ';
    width: 70%;
    background: #c2c2c2;
    margin: 0 auto;
    height: 1px;
    position: relative;
    display: block;
    bottom: 0;
  }
}

.mainsec {
  position: relative;
  z-index: 1;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}

.popup h1,
.popup .actions
{
  text-align: center;
}

</style>
