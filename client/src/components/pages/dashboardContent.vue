<script setup>
import { onMounted, ref } from 'vue';
import CustomMDButton from "./mediumButton.vue";

import CustomSMButton from "./smallButton.vue"

import RecentLogs from "./recentActivity.vue"
import { roomsData } from "../../stores/roomsData"
const rooms = roomsData()

const props = defineProps({
    isDashboard: String
})

console.log(rooms.historyData);

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
            <div class="boxes rooms-device-name">
                <h4>Rooms</h4>
                <div class="table-con">
                    <table>
                        <thead>
                            <tr>
                                <th>Device Number</th>
                                <th>Room Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in rooms.data" :key="index">
                                <td>{{ item.id }}</td>
                                <td>{{ item.roomName }}</td>
                            </tr>
                           
                        </tbody>
                    </table>

                </div>
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
.rooms-device-name h4 {
    font-size: clamp(16px, 3vw, 20px);
    width: 100%;
    color: black;
    padding: 10px;
}

table {
    width: 100%;
    color: white;
    height: 100%;
}

.table-con {
    flex: 1;
    border-radius: 10px;
    background: var(--third-color);
    min-height: 28.5rem;
    min-width: 350px;
    max-height: 28.5rem;
    overflow: auto;
    position: relative;
    scrollbar-width: thin;
}

table thead {
    position: sticky;
    background-color: rgba(0, 0, 0, 0.596);
    backdrop-filter: blur(3px);
    top: 0;
}

tbody tr {
    transition: all 150ms;
}

tbody tr:hover {
    background-color: rgba(28, 51, 43, 0.37);
    cursor: pointer;
}

th,
td {
    flex: 1;
    border-right: 1px solid rgb(243, 243, 243);
    border-bottom: 1px solid rgb(243, 243, 243);
    padding: 10px;
    text-align: left;
}

th:last-child, td:last-child{
    border-right: none;
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
    min-width: 350px;
    max-height: 28.5rem;
}

.rooms-device-name {
    flex: 1;
    background: transparent;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
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
    font-size: clamp(16px, 2vw, 18px);
    max-width: 100%;
    width: 100%;
    word-wrap: break-word;
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




}
</style>