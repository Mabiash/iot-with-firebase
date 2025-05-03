<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const email = ref('da@gmail.com')
const password = ref('12345678')
const router = useRouter()
async function loginUser() {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.value, password: password.value })
  });

  const data = await response.json();

  if (data.token) {
    localStorage.setItem('token', data.token)
    console.log('Logged in. Token:', data.token)
    router.push('/dashboard') 
  } else {
    console.error('Login failed:', data.message)
  }
}
</script>

<template>
  <div>
    <button @click="loginUser">Login</button>
  </div>
</template>
