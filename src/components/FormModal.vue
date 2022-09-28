<script setup>
defineProps({
    formActive: {
        type: Boolean,
        required: true,
        default: false,
    },
    toggleForm: {
        type: Function,
        required: true,
    }
})
</script>

<template>
  <div v-if="formActive" class="form-wrapper">
    <div class="form-content">
      <form @submit.prevent>
        <label>Email:</label>
        <input type="email" required />
        <label>Password:</label>
        <input type="password" required />
        <div class="submit">
          <button>Login</button>
          <button>Register</button>
          <button class="orange" @click.stop="toggleForm">Close</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 100;
  background-color: #1a1a1a;
  width: 100%;
  height: 100vh;
}

.form-content {
  display: flex;
  gap: 10px;
  flex-direction: column;
  background-color: #fffdfa;
  border-radius: 10px;
  max-height: 350px;
  margin: 32px 5px;
}

form {
  margin: 2em;
}

label {
  display: inline-block;
  margin-top: 35px;
  font-size: 1.2em;
  letter-spacing: 1px;
}

input {
  display: block;
  margin-top: 10px;
  font-size: 1.2em;
  font-weight: bold;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid black;
}

button {
  background: #41b883;
  border: none;
  padding: 10px 20px;
  margin: 30px 40px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
}

.orange {
  background: orange;
}

button:hover {
  text-decoration: underline;
}

.submit {
  margin-top: 45px;
  text-align: center;
}
</style>
