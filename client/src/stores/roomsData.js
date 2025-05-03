import { defineStore } from "pinia";
import { ref as vueRef, onMounted } from "vue";
import { db } from "../config/firebase.js";
import { ref as dbRef, onValue } from "firebase/database";

export const roomsData = defineStore("counter", {
  state: () => ({
    data: [
      
    ],
  }),

  getters: {
    openRooms(state) {
      return state.data.filter((room) => room.isOpen);
    },
    closedRooms(state) {
      return state.data.filter((room) => !room.isOpen);
    },
    hasRoomClosed(state) {
      return state.data.some((room) => room.isOpen === false);
    },
    hasRoomOpen(state) {
      return state.data.some((room) => room.isOpen);
    },
    isAllRoomsClosed(state) {
      return state.data.every((room) => !room.isOpen);
    },
    isAllRoomsOpen(state) {
      return state.data.every((room) => room.isOpen);
    },
  },

  actions: {
    async fetchRooms() {
      try {
        const res = await fetch("http://localhost:3000/rooms/path");
        const dataPath = await res.json();
        const paths = dataPath.pathData[0].paths;
        paths.forEach((item, index) => {
          const statusRef = dbRef(db, `rooms/${item}`);
          onValue(statusRef, (snapshot) => {
            const newData = snapshot.val();
            const existingIndex = this.data.findIndex((_, i) => i === index);
            if (existingIndex !== -1) {
              this.data[existingIndex] = newData;
            } else {
              this.data.push(newData);
            }
          });
        });
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      }
    },
  },
});
