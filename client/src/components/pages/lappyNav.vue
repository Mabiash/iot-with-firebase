<script setup>
import {defineEmits, ref, watch} from "vue"
const emit = defineEmits(['goToRooms', 'goToDashboard', 'goToHistory']);


const loadBoolean = (key, defaultValue) => {
  const value = localStorage.getItem(key)
  return value !== null ? value === 'true' : defaultValue
}

const isDashboardActive = ref(loadBoolean('isDashboardActive', true))
const isRoomsActive = ref(loadBoolean('isRoomsActive', false))
const isHistoryActive = ref(loadBoolean('isHistoryActive', false))

function navigateToRooms(){
    emit('goToRooms');
    isDashboardActive.value = false;
    isRoomsActive.value = true;
    isHistoryActive.value = false;
}

function navigateToDashboard(){
    emit('goToDashboard');
    isDashboardActive.value = true;
    isRoomsActive.value = false;
    isHistoryActive.value = false;
}

function navigateToHistory(){
    emit('goToHistory');
    isDashboardActive.value = false;
    isRoomsActive.value = false;
    isHistoryActive.value = true;
}

watch(
  [isDashboardActive, isRoomsActive, isHistoryActive],
  ([newDash, newRooms, newHistory]) => {
    localStorage.setItem('isDashboardActive', newDash.toString())
    localStorage.setItem('isRoomsActive', newRooms.toString())
    localStorage.setItem('isHistoryActive', newHistory.toString())
  }
)

</script>

<template>
    <nav class="nav-con">
        <div class="logo-con">
            <h1 class="logo">Logo</h1>
        </div>
        <ul class="w-full h-auto mt-10 text-white">
            <li :class="{active:isDashboardActive}" @click="navigateToDashboard">
                <i class="fa-solid fa-table-columns"></i>
                <p>Dashboard</p>
                <div class="na-r-t"></div>
                <div class="na-r-b"></div>
            </li>
            <li
            :class="{active:isRoomsActive}"    @click="navigateToRooms">
                <i class="fa-solid fa-door-closed"></i>
                <p>Rooms</p>
                <div class="na-r-t"></div>
                <div class="na-r-b"></div>
            </li>
            <li
            :class="{active:isHistoryActive}" @click="navigateToHistory">
                <i class="fa-solid fa-file"></i>
                <p>History</p>
                <div class="na-r-t"></div>
                <div class="na-r-b"></div>
            </li>
        </ul>
    </nav>
</template>
  

  
<style scoped>
.logo {
    text-align: center;
    padding: 2rem;
    color: white;
    border-radius: 10px;

}
.nav-con {
    height: 100vh;
    width: fit-content;
    background-color: var(--primary-color);
    width: 12rem;

}

li {
    position: relative;
    padding: 1rem 1rem;
    list-style: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 150ms
}

li i{
    font-size: 18px;    
}

li:hover {
    background-color: #e7e5e4;
    transition: all 150ms ease;
    color: var(--primary-color);
    font-weight: bold;
}

li:hover .na-r-t,
li:hover .na-r-b {
    height: 1rem;
    width: 1rem;
    right: 0rem;
    position: absolute;
    z-index: 100;
    transition: all 250ms;
}

li.active .na-r-t,
li.active .na-r-b {
    height: 1rem;
    width: 1rem;
    right: 0rem;
    position: absolute;
    z-index: 100;
    transition: all 200ms;
}

li:hover .na-r-t {
    border-radius: 0 0 15px 0;
    top: -1rem;
    box-shadow: 3.3px 5px 0px #e7e5e4;
}

li:hover .na-r-b {
    bottom: -1rem;
    border-radius: 0 15px 0 0;
    box-shadow: 3.3px -5px 0px #e7e5e4;
}

li.active .na-r-t {
    border-radius: 0 0 15px 0;
    top: -1rem;
    box-shadow: 3.3px 5px 0px #e7e5e4;
}

li.active .na-r-b {
    bottom: -1rem;
    border-radius: 0 15px 0 0;
    box-shadow: 3.3px -5px 0px #e7e5e4;
}

li.active {
    background: #e7e5e4;
    color: var(--primary-color);
    font-weight: bold;
}

@media screen and (max-width: 650px) {
    .nav-con{
        display: none;
    }
}
</style>
  