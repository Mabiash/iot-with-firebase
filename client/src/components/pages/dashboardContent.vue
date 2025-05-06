<script setup>
import { onMounted, ref } from 'vue';
import CustomMDButton from "./mediumButton.vue";

import CustomSMButton from "./smallButton.vue"
import { roomsData } from "../../stores/roomsData"
import RecentLogs from "./recentActivity.vue"
import { db } from '../../config/firebase.js';
import { ref as dbRef, update, get } from 'firebase/database'; 
const rooms = roomsData()

const props = defineProps({
    isDashboard: String
})

const closedAllDoors = () => {
    rooms.data.forEach(room => {
        room.isOpen = false;
    })
}

const test = () => {
    alert(0)
}

onMounted(async () => {
    rooms.fetchRooms();
});

console.log(rooms.data);

</script>

<template>
    <transition>
        <section class="content-container">
            <div class="boxes rooms-open-con">
                <div class="rooms-heading">
                    <h4>Open Rooms</h4>
                    <div class="close-all-btn">
                        <p>Close all</p>
                        <CustomMDButton :isOpen="rooms.hasRoomOpen" @click="rooms.changeStatusAllRooms(true)" />
                    </div>
                </div>
                <div class="rooms-container">
                    <h5 v-if="rooms.isAllRoomsClosed">All Rooms are Closed</h5>
                    <div v-for="data in rooms.openRooms" class="rooms">
                        <h3>{{ data.roomName }}</h3>
                        <p>Open</p>
                        <p>{{ data.date.toLocaleString() }}</p>
                        <p>{{ data.responsible }}</p>
                        <div class="action-room">
                            <p>Close Room</p>
                            <CustomSMButton @smBtnEvent="rooms.changeRoomStatus(data.id)" :roomIsOpen="data.isOpen" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="boxes rooms-close-con">
                <div class="rooms-heading">
                    <h4>Closed Rooms</h4>
                    <div class="close-all-btn">
                        <p>Open all</p>
                        <CustomMDButton :isOpen="!rooms.hasRoomClosed" @click="rooms.changeStatusAllRooms(false)" />
                    </div>
                </div>
                <div class="rooms-container">
                    <h5 v-if="rooms.isAllRoomsOpen">All Rooms are Open</h5>
                    <div v-for="data in rooms.closedRooms" class="rooms">
                        <h3>{{ data.roomName }}</h3>
                        <p>Closed</p>
                        <p>{{ data.date.toLocaleString() }}</p>
                        <p>{{ data.responsible }}</p>
                        <div class="action-room">

                            <p>Open Room</p>
                            <CustomSMButton :roomIsOpen="data.isOpen" @smBtnEvent="rooms.changeRoomStatus(data.id)" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="boxes recent-logs">
                <RecentLogs />
            </div>
        
        </section>
    </transition>
</template>

<style scoped>
h5 {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-size: clamp(20px, 4vw, 22px);
}
.content-container {
    height: fit-content;
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1.4rem;
    overflow-y: scroll;
    padding: 1rem 2.5rem;
    scrollbar-width: none;
    overflow-x: hidden;
}

.boxes {
    flex: 1;
    height: fit-content;
    min-height: 28.5rem;
    min-width: 300px;
    max-height: 28.5rem;
}

.rooms-open-con,
.rooms-close-con {
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow: auto;
}
.rooms-heading {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;
    margin-bottom: 6px;
}

.rooms-heading div {
    display: flex;
    gap: 10px;
    font-size: 14px;
}

.rooms-container {
    flex: 1;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 10px;
    border-radius: 15px;
    padding: 10px;
    overflow-y: auto;
    max-height: 100%;
    scrollbar-width: none;

}

.rooms-open-con .rooms-container {
    border: 3px solid rgba(0, 159, 199, 0.226);
    background: var(--secondary-color);

}

.rooms-close-con .rooms-container {
    border: 3px solid rgba(0, 159, 199, 0.226);
    background: var(--secondary-color);

}

.rooms-open-con .rooms {
    border: 1px solid rgb(69, 203, 221);
}

.rooms-close-con .rooms {
    border: 1px solid rgb(69, 203, 221);
}

.rooms {
    /* From https://css.glass */
    background: rgba(0, 0, 0, 0.51);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 10px;
    
    padding: 10px;
    color: rgb(255, 254, 239);
    display: flex;
    flex-direction: column;
    position: relative;
    height: fit-content;
    min-height: 12rem;
}

h4 {
    font-size: clamp(16px, 3vw, 20px);
}

.rooms h3 {
    letter-spacing: .1rem;
    font-size: 16=8px;
}
.rooms p {
    font-size: clamp(10px, 2vw, 14px);
    letter-spacing: .02rem;
    margin-top: .4rem;
    color: rgb(219, 219, 219);
}
.close-all-btn {
    display: flex;
    align-items: center;
}

.action-room {
    width: 100%;
    height: fit-content;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 10px;
    left: 0;
    padding: 0px 10px;

}


.action-room p {
    margin: 0;
    color: white;
}

.recent-logs {
    border-radius: 10px;
    overflow-x: hidden;
    min-height: 0;
    height: fit-content;
    min-width: 480px;
    overflow: hidden;
    overflow-x: auto;
    scrollbar-width: thin;
    border-radius: 5px;
}


@media screen and (max-width: 650px) {
    .content-container {
        padding: 10px;
        scrollbar-width: none;
    }
}

@media screen and (max-width: 520px) {
    .boxes {
        min-height: 10rem;
        height: fit-content;
    }

    .content-container {
        padding-bottom: 7rem;
    }

    .recent-logs {
        min-width: 200px;
        width: 100vw !important;
    }


}
</style>