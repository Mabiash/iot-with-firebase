<script setup>
import { ref } from "vue";
import { roomsData } from "../../stores/roomsData"
const rooms = roomsData();

const isOpen = ref(false);

const changeRoomStatus = (id) => {
  
    rooms.data.forEach(room => {
        console.log(room.id);
        if(room.id === id){
            room.isOpen = !room.isOpen;
        }
    });
}
</script>

<template>
    <section class="rooms">
        <div class="con">
            <div v-for="(item, index) in rooms.data" :key="index" class="box-container">
                <div class="header">
                    <div class="status-header">
                        <p>Status</p>
                    </div>
                    <div class="curve">
                        <p v-if="item.isOpen" class="open">Open</p>
                        <p v-if="!item.isOpen" class="closed">Closed</p>
                    </div>
                    <div class="shadow"></div>
                </div>
                <div class="content-container">
                    <h2>
                        <span>{{ item.roomName }}</span> <span v-if="item.isOnline" class="online"></span>
                        <span v-if="!item.isOnline" class="offline"></span>
                    </h2>
                    <p>{{ item.date.toLocaleString() }}</p>
                    <p>{{ item.reponsible }}</p>
                    <button @click="changeRoomStatus(item.id)">
                        <p v-if="!item.isOpen">Open Room</p>
                        <p v-if="item.isOpen">Close Room</p>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.con {
    height: fit-content;
    width: 100%;
    display: grid;
    flex-wrap: wrap;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}
.rooms {
    width: 100%;
    padding: 2rem 1.4rem;
    max-height: 100vh;
    overflow-y: auto;

}

.box-container {
    height: 100%;
    min-height: 12rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: fit-content;
}

.content-container {
    flex: 1;
    width: 100%;
    background-color: rgb(18, 0, 24);
    border-radius: 0 10px 0;
    padding: 1rem 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.content-container button {
    margin-top: 1rem;
    background-color: rgba(153, 192, 179, 0.315);
    border: 0;
    color: rgb(252, 255, 254);
    padding: 7px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 150ms ease;
}

h2 {
    display: flex;
    gap: 7px;
    align-items: center;
}
h2 span {
    display: flex;
    font-size: 20px;
}

h2 span:not(:first-child){
    height: 12px;
    aspect-ratio: 1;
    border-radius: 50rem;
    border: 1px solid white;
}

span.online{
    background-color: rgb(1, 204, 1);
}

span.offline{
    background-color: rgb(87, 87, 87);
}
.content-container button i {
    margin-right: 5px;
}

.content-container button:hover {
    background-color: rgba(153, 192, 179, 0.13);
}

.header {
    height: 18%;
    min-height: 3rem;
    width: 100%;
    gap: 5px;
    display: flex;
    position: relative;
}

.shadow {
    position: absolute;
    height: 99%;
    width: 45.4%;
    right: 0;
    top: 0;
    border-radius: 0 0 0 20px;
    box-shadow: -10px 10px 0 rgb(18, 0, 24);
}

.curve {
    width: 45%;
    height: 100%;
    position: absolute;
    top: 0;
    padding: 5px;
    right: 0;
}

.curve p {
    width: 100%;
    height: 100%;

    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: clamp(12px, 2vw, 16px);
}

.curve p.open {
    background-color: rgb(0, 61, 15);
}

.curve p.closed {
    background-color: rgba(131, 33, 0, 0.945);
    color: rgb(255, 255, 255);
}

.status-header {
    border-radius: 0 15px 0 0;
    width: 55%;
    background-color: rgb(18, 0, 24);
    display: flex;
    align-items: center;
    justify-content: center;
}

.status-header p {
    color: white;
}

.content-container h2 {
    color: white;
}

.content-container p {
    color: rgb(201, 201, 201);
    font-size: clamp(12px, 2vw, 14px);
}
@media screen and (max-width: 650px) {
    .rooms {
        padding: 0px 10px;
        gap: 10px;
    }
}
</style>
