<script setup>
import {defineEmits} from "vue"
const emit = defineEmits(['smBtnEvent'])
const props = defineProps({
    roomIsOpen: Boolean
})

function smBtnClick() {
    emit('smBtnEvent');
}
</script>

<template>
    <div :class="[`btn-con`, { btnContainerIsOpen: roomIsOpen }]" @click="smBtnClick">
        <div :class="[`circle`, { open: roomIsOpen }]"></div>
    </div>
</template>

<style scoped>
.btn-con {
    width: 1.8rem;
    height: .9rem;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    padding: 3px 3.5px;
    cursor: pointer;
    transition: all 300ms;
}
.circle {
    height: 100%;
    aspect-ratio: 1;
    border-radius: 50rem;
    background-color: rgb(0, 0, 0);
    transition: all 150ms;
    transform: translateX(0)
        /* 1.25rem*/
    ;
}

.btnContainerIsOpen {
    background-color: rgb(0, 0, 0);
}

.open {
    transform: translateX(.9rem);
    background-color: white;
}

.btn-con:hover{
    transform: scale(115%);
}
</style>