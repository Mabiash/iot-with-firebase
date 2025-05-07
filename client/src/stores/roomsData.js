import { defineStore } from "pinia";
import { db } from "../config/firebase.js";
import {notif} from "../components/js/notification.js"
import {
  ref as dbRef,
  onValue,
  get,
  update,
  remove,
  ref,
} from "firebase/database";

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
        const statusRef = dbRef(db, "rooms");
        onValue(statusRef, (snapshot) => {
          const val = snapshot.val();

          if (!val) {
            console.log("No data found");
            return;
          }
          this.data = [];
          Object.entries(val).forEach(([key, data]) => {
            this.data.push({ id: key, ...data });
          });
        });
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      }
    },

    async changeRoomStatus(path) {
      const roomRef = dbRef(db, `rooms/${path}`);

      try {
        const snapshot = await get(roomRef);
        if (snapshot.exists()) {
          const currentData = snapshot.val();
          const currentStatus = currentData.isOpen;
          await update(roomRef, {
            isOpen: !currentStatus,
            date: new Date().toLocaleString(),
            responsible: "Daryl",
          });
          console.log("Room status updated!");
        } else {
          console.log("Room not found");
        }
      } catch (error) {
        console.error("Failed to update value:", error);
      }
    },

    async changeRoomName(path, newName) {
      const roomRef = dbRef(db, `rooms/${path}`);

      try {
        const snapshot = await get(roomRef);
        if (snapshot.exists()) {
          await update(roomRef, {
            roomName : newName
          });
          
        
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



    async deleteRoomPath(path) {
      try {
        const collectionRef = ref(db, `rooms/${path}`);
        const snapshot = await get(collectionRef);

        if (!snapshot.exists()) {
          alert("Collection is empty or does not exist");
          return;
        }

        await remove(collectionRef);
        alert(`Room ${path} was successfully deleted!`)
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
});
