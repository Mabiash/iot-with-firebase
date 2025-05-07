<script setup>
import { defineEmits, ref as reff } from "vue"
import { ref, set, onValue } from "firebase/database";
import { db } from "../../config/firebase.js"
import { roomsData } from "../../stores/roomsData"
const emit = defineEmits(['close-addRoom-form'])
const rooms = roomsData()
const closeAddRoomForm = () => {
    emit('close-addRoom-form')
}

const addRoomInRealtimeDb = () => {
    const isEx = reff(false)
    let iptRoomName = document.getElementById('room-name').value.toUpperCase();
    let iptCurrentStatus = document.getElementById('current-state').value;

    const statusRef = ref(db, 'rooms');
    onValue(statusRef, (snapshot) => {
        const val = snapshot.val();

        if (!val) {
            console.log("No data found");
            return;
        }

        const isExist = Object.entries(val).some(([key, data]) => {
            return data.roomName === iptRoomName
        });

        isEx.value = isExist;
    });

    if (isEx.value) {
        alert("Room Alread Exist!")
        return
    }

    const customKey = iptRoomName.toLocaleUpperCase();
    const customRef = ref(db, `rooms/${customKey}`);

    set(customRef, {
        "date": new Date().toLocaleString(),
        "id": iptRoomName,
        "isOnline": true,
        "isOpen": iptCurrentStatus === "Open" ? true : false,
        "responsible": "Unknown",
        "roomName": iptRoomName
    });


    iptRoomName = "";
    iptCurrentStatus = ""

}

</script>

<template>
    <section>
        <div class="form-container">
            <h1>Add Room</h1>
            <div class="ipt-field-container">
                <label for="room-numer">Device Number</label>
                <input type="text" placeholder="Device Number" name="device-number" id="Device-number">
                <label for="room-name">Room Name</label>
                <input type="text" placeholder="Room Name" name="room-name" id="room-name">
                <label for="current-state">Current State</label>
                <select id="current-state">
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>
                <button @click="addRoomInRealtimeDb" class="add-btn">Add Room</button>
            </div>
            <div @click="closeAddRoomForm" class="closed-modal"><i class="fa-solid fa-xmark"></i></div>
        </div>
    </section>
</template>

<style scoped>
section {
    height: 100dvh;
    width: 100vw;
    background-color: rgba(1, 19, 8, 0.658);
    backdrop-filter: blur(3px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: grid;
    place-items: center;
}

label {
    font-size: 14px;
}
.form-container {
    width: clamp(22rem, 30vw, 25rem);
    height: fit-content;
    background-color: rgb(231, 238, 231);
    border-radius: 10px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
}

h1 {
    width: 100%;
    text-align: center;
    font-size: clamp(25px, 3vw, 30px);
    color: var(--primary-color);
}

.ipt-field-container {
    width: 100%;
    height: fit-content;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 7px;

}

input,
select,
.add-btn {
    width: 100%;
    padding: 10px 7px;
    border: 1px solid grey;
    border-radius: 5px;
}

.add-btn {
    background: var(--third-color);
    color: white;
    margin-top: 1rem;
    transition: all 150ms;
}

.add-btn:hover {
    transform: scale(105%);
}

.closed-modal {
    position: absolute;
    top: 0;
    right: 0;
    padding: .5rem .8rem;
    background-color: rgb(255, 166, 0);
    border-radius: 0 0 0 10px;
    transition: all 150ms;
    cursor: pointer;
}

.closed-modal i {
    font-size: 22px;
    color: rgb(255, 255, 255);
    text-shadow: 0 0 10px rgb(168, 168, 168);
}


.closed-modal:hover {
    background-color: rgba(255, 166, 1, 0.651);
}
</style>