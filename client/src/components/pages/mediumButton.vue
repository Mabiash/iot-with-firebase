<script setup>
import { ref } from 'vue'

const props = defineProps({
    isOpen: Boolean
})
</script>

<template>
    <div :class="[`btn-con`, { openContainer: props.isOpen }]">
        <div :class="['circle', { open: props.isOpen }]"></div>
    </div>
</template>
<style scoped>
.btn-con {
    width: 2.3rem;
    height: 1.1rem;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    padding: 3px 3.5px;
    cursor: pointer;
    border: 2px solid black;
    transition: all 300ms;
}

.openContainer {
    background-color: rgb(0, 0, 0);
    border: none;
}

.circle {
    height: 100%;
    aspect-ratio: 1;
    border-radius: 50rem;
    background-color: rgb(0, 0, 0);
    transition: all 300ms ease !important;
    /* 1.25rem*/
    ;
}

.open {
    transform: translateX(1.2rem);
    background-color: white;
}

.btn-con:hover{
    transform: scale(110%);
}
</style>