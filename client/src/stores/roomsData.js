import { defineStore } from "pinia";
import { ref as vueRef, onMounted } from "vue";
import { db } from "../config/firebase.js";
import { ref as dbRef, onValue, get, update } from "firebase/database";

export const roomsData = defineStore("counter", {
  state: () => ({
    data: [],
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
        const res = await fetch("http://192.168.1.4:3000/rooms/path");
        const dataPath = await res.json();
        const paths = dataPath;

        paths.pathData.forEach((item, index) => {
          const statusRef = dbRef(db, `rooms/${item.path}`);
          onValue(statusRef, (snapshot) => {
            const newData = snapshot.val();
            const existingIndex = this.data.findIndex((_, i) => i === index);
            if (existingIndex !== -1) {
              this.data[existingIndex] = newData;
            } else {
              this.data.push(newData);
            }
          });
        }) 

      
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      }
    },

    async changeRoomStatus(path, newValue) {
      const roomRef = dbRef(db, `rooms/${path}`);

      try {
        const snapshot = await get(roomRef);
        if (snapshot.exists()) {
          const currentData = snapshot.val();
          const currentStatus = currentData.isOpen;
          await update(roomRef, { isOpen: !currentStatus });
          console.log("Room status updated!");
        } else {
          console.log("Room not found");
        }
      } catch (error) {
        console.error("Failed to update value:", error);
      }
    },

    async changeStatusAllRooms(roomCurrenStatus) {
      try {
        const roomsRef = dbRef(db, "rooms");
        const snapshot = await get(roomsRef);

        if (!snapshot.exists()) {
          return;
        } else {
          const rooms = snapshot.val();
          for (const roomId in rooms) {
            const roomRef = dbRef(db, `rooms/${roomId}`);
            const getRoom = await get(roomRef);
            const currentData = getRoom.val();
            const currentStatus = currentData.isOpen;

            if (currentStatus === roomCurrenStatus) {
              console.log(currentStatus);
              await update(roomRef, { isOpen: !currentStatus });
            }
          }
        }
      } catch (error) {
        console.error("Failed to open all doors:", error);
      }
    },
  },
});
