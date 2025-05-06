<script setup>
import {defineProps, defineEmits} from "vue"
const emit = defineEmits(['open-addRoom-form'])

function openAddRoomForm() {
  emit('open-addRoom-form')
}

const props = defineProps({
    headerTitle: String
});

</script>

<template>
    <header class="header">
        <h1 class="label">{{props.headerTitle}}</h1>
        <div class="ipt-con">
          
            <button @click="openAddRoomForm" class="add-room"><i class="fa-solid fa-plus"></i><p>Add Room</p></button>
            <div class="profile-container">

            </div>
        </div>
    </header>
</template>

<style scoped>
.header {
    width: 100%;
    height: auto;
    padding: 1.5rem 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
}
.label {
    color: var(--primary-color);
    font-size: clamp(24px, 3vw, 26px);
}
.ipt-con {
    width: fit-content;
    height: 2.3rem;
    display: flex;
    position: relative;
    align-items: center;  
    gap: 10px;
}

.add-room{
    display: flex;
    padding: 10px 12px;
    align-items: center;
    gap: 7px;
    border-radius: 5px;
    border: 0;
    background: var(--third-color);
    color: white;
    cursor: pointer;
    transition: all 150ms;
}

.add-room:hover{
    opacity: .9;
}

.add-room p{
    font-size: 12px;
}

.add-room i{
    font-size: 14px;
}
.profile-container {
    height: 100%;
    aspect-ratio: 1;
    border-radius: 50rem;
    background-color: rgb(0, 0, 0);
    border: 2px solid var(--primary-color);
}

@media screen and (max-width: 650px) {
    .header {
        padding: 10px;
    }
}
</style>