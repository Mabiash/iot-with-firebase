import { defineStore } from "pinia";
import { db } from "../config/firebase.js";
import { notif } from "../components/js/notification.js";
import {
  ref as dbRef,
  onValue,
  get,
  update,
  remove,
  ref,
  set
} from "firebase/database";

export const roomsData = defineStore("counter", {
  state: () => ({
    data: [],
    historyData : []
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

    async fetchHistory() {
      try {
        const statusRef = dbRef(db, "history");
        onValue(statusRef, (snapshot) => {
          const val = snapshot.val();

          if (!val) {
            console.log("No data found");
            return;
          }
          this.historyData = [];
          Object.entries(val).forEach(([key, data]) => {
            this.historyData.push({ id: key, ...data });
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
            roomName: newName,
          });
        } else {
          console.log("Room not found");
        }
      } catch (error) {
        console.error("Failed to update value:", error);
      }
    },

     generateUID() {
      return '_' + Math.random().toString(36).substr(2, 9);
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
        const roomRef = dbRef(db, `rooms/${path}`);
        const historyRef = dbRef(db, `history/${ this.generateUID()}`);
    
        const snapshot = await get(roomRef);
    
        if (!snapshot.exists()) {
          alert("Collection is empty or does not exist");
          return;
        }
    
        const val = snapshot.val();
        if (!val) {
          console.log("No data found");
          return;
        }
    
        // Store data in history before deletion
        await set(historyRef, {action: `Delete Room ${val.roomName}`, ...val});

    
        // Delete the original data
        await remove(roomRef);
    
        notif(
          "Successfully Deleted!",
          3000,
          "linear-gradient(43deg, rgba(6, 154, 117, 0.82) 3%, rgba(16, 190, 111, 0.84) 37%, rgba(19, 154, 93, 0.79) 85%)"
        );
      } catch (error) {
        console.error("Error:", error);
      }
    }
    
  },
});
