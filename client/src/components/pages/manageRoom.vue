<script setup>
import { defineEmits } from 'vue';
import { roomsData } from "../../stores/roomsData"
import { notif } from "../js/notification.js"
const rooms = roomsData();

const emit = defineEmits(["close-manageRoom-modal"])
const props = defineProps({
    room: {
        type: String,
        required: true
    }
})

const closeManageRoomModal = () => {
    emit('close-manageRoom-modal')
}

const deleteRoom = () => {
    rooms.deleteRoomPath(props.room)
}
const updateroomName = () => {
  const newName = prompt(`Enter New Room Name: ${props.room}`);

  if (newName === null) {
    // User cancelled the prompt
    notif("Update canceled.", 3000, "gray");
    return;
  }

  if (newName.trim() === "") {
    notif("Name cannot be empty!", 3000, "red");
    return;
  }

  rooms.changeRoomName(props.room, newName.trim());
  notif("Successfully updated!", 3000, "green");
};




</script> 

<template>
    <section>
        <div class="manage-room-container">
            <h1>{{ props.room }}</h1>
            <div class="btn">
                <button @click="updateroomName">
                    <p>Change Room Name</p>
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button @click="deleteRoom">
                    <p>Delete Room</p>
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div @click="closeManageRoomModal" class="closed-modal"><i class="fa-solid fa-xmark"></i></div>
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

.manage-room-container {
    width: clamp(22rem, 30vw, 25rem);
    height: fit-content;
    background-color: rgb(231, 238, 231);
    border-radius: 10px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

h1 {
    width: 100%;
    text-align: center;
    font-size: clamp(25px, 3vw, 30px);
    color: var(--primary-color);
}

.btn {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
}

.btn button {
    padding: 14px 1rem;
    cursor: pointer;
    border: 0;
    background: rgb(29, 107, 67);
    color: white;
    border-radius: 5px;
    font-size: clamp(14px, 2vw, 16px);
    transition: all 150ms;
    outline: 0;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.btn button i {
    font-size: 18px;
}

.btn button:hover {
    background: rgba(39, 95, 65, 0.733);
}

.closed-modal {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem 0.8rem;
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
