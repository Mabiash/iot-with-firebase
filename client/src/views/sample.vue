<script setup>
import { ref as vueRef, onMounted } from 'vue';
import { db } from '../config/firebase.js';
import { ref as dbRef, onValue } from 'firebase/database';

const doorStatus = vueRef('Loading...');
const result = vueRef(null);

async function getData() {
  try {
    const response = await fetch('http://localhost:3000/rooms/path'); // replace with your endpoint
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();

    const paths = data.pathData[0].paths;

    paths.forEach(item => {
      console.log(item);
    });

    const statusRef = dbRef(db, `rooms/BSIT2F2/`);
    onValue(statusRef, (snapshot) => {
      const val = snapshot.val();
      doorStatus.value = val === null ? 'Unknown' : val;
    });

  } catch (err) {
    result.value = `Error: ${err.message}`;
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