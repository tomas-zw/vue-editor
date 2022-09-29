<script setup>
import { ref, watch } from "vue";
import usersModel from "../models/users.js";
import validateForm from "../models/validateForm.js";

defineProps({
  formActive: {
    type: Boolean,
    required: true,
    default: false,
  },
  toggleForm: {
    type: Function,
    required: true,
  },
  setToken: {
        type: Function,
        required: true,
    },
});
const email = ref("");
const password = ref("");
const emailMsg = ref("*");
const passwordMsg = ref("*");
const loggedIn = ref(false);
const welcomeMsg = ref("Register or Login");

const registerUser = async () => {
  if (validateForm.isFormOk(emailMsg.value, passwordMsg.value)) {
    const _ = await usersModel.addUser({
      email: email.value,
      password: password.value,
    });
    //loggedIn.value = true;
  }
};

const login = async (newToken) => {
  if (validateForm.isFormOk(emailMsg.value, passwordMsg.value)) {
    const token = await usersModel.login({
      email: email.value,
      password: password.value,
    });
    if (token.data) {
        newToken(token.data)
        loggedIn.value = true;
    }
    if (token.errors) {
        console.log(token.errors);
    }
  }
};

watch(email, (newEmail, _) => {
  if (!validateForm.validateEmail(newEmail)) {
    emailMsg.value = "Not a valid Email.";
  } else {
    emailMsg.value = "OK";
  }
});
watch(password, (newPassword, _) => {
  if (!validateForm.validatePassword(newPassword)) {
    passwordMsg.value = "Needs to be atleast 4 chars.";
  } else {
    passwordMsg.value = "OK";
  }
});
watch(loggedIn, (newState, _) => {
  if (newState) {
    welcomeMsg.value = `Logged in as ${email.value}`;
  }
});
</script>

<template>
  <div v-if="formActive" class="form-wrapper">
    <div class="form-content">
      <form @submit.prevent>
        <div class="center">
          <h3>{{ welcomeMsg }}</h3>
        </div>
        <label
          >Email: <span class="error"> {{ emailMsg }}</span></label
        >
        <input type="text" v-model="email" />
        <label
          >Password: <span class="error">{{ passwordMsg }}</span></label
        >
        <input type="password" v-model="password" />
        <!-- TODO fix buttons when logged in -->
        <div class="submit">
          <button :class="loggedIn && 'disabled'" @click="login(setToken)">Login</button>
          <button class="red" @click.stop="toggleForm">X</button>
          <button :class="loggedIn && 'disabled'" @click="registerUser">
            register
          </button>
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
  max-height: 410px;
  margin: 32px 5px;
}

.error {
  color: red;
  font-size: 1rem;
}

.disabled {
  background-color: gray;
  color: lightgray;
}

.center {
  text-align: center;
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

.red {
  background: red;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 50%;
}

button:hover {
  text-decoration: underline;
}

.submit {
  margin-top: 45px;
  text-align: center;
}
</style>
