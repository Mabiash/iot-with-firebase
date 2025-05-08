<script setup>
import { ref as vueRef, onMounted } from 'vue';
import { db } from '../config/firebase.js';
import { ref as dbRef, onValue } from 'firebase/database';

const doorStatus = vueRef('Loading...');
const result = vueRef(null);

async function getData() {
  try {
    const statusRef = dbRef(db, 'history');
    onValue(statusRef, (snapshot) => {
      const val = snapshot.val();

      if (!val) {
        console.log("No data found");
        return;
      }

      const isExist = Object.entries(val).some(([key, data]) => {
        console.log(key);
       return data.roomName === "BSI2F3"
     
      });

      console.log(val);
    });

  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}




onMounted(async () => {
  getData()
});
</script>

<template>
  <div>
    <h1>Door Status: {{ doorStatus }}</h1>
  </div>
</template>