<script setup>
import { ref } from "vue";
import docsModel from "../models/docs.js";
import emailModel from "../models/email.js";

const props = defineProps({
  docs: {
    type: Object,
  },
  token: {
    type: Object,
  },
  allUsers: {
    type: Object,
  },
});

let selectedNewUser = ref("");

async function saveNewUserList() {
  if (selectedNewUser.value === "") {
    //nothing selected
    return;
  }
  if (props.docs.users.includes(selectedNewUser.value)) {
    //already in list just nofify
    const mail = await emailModel.sendEmail(selectedNewUser.value, props.token);
    return;
  }
  //props.docs.users.push(selectedNewUser.value);
  //const _ = await docsModel.updateDoc(props.docs, props.token.token);

  let newUsersList = props.docs;
  newUsersList.users.push(selectedNewUser.value);
  const _ = await docsModel.updateDoc(newUsersList, props.token.token);
  const mail = await emailModel.sendEmail(selectedNewUser.value, props.token);
}
</script>

<template>
  <div class="user-wrapper">
    <div v-if="docs.users" class="users">
      <div>
        <h3>Behöriga användare</h3>
        <p v-for="user in docs.users" :key="user">
          {{ user }}
        </p>
      </div>
      <form v-if="token.email == docs.users[0]" @submit.prevent>
        <select v-model="selectedNewUser" class="select-user">
          <option
            v-for="user in allUsers.users"
            :key="user.email"
            :value="user.email"
          >
            {{ user.email }}
          </option></select
        ><br />
        <button class="select-user green" @click="saveNewUserList()">
          Add and/or notify user
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.1rem;
  text-decoration: underline;
  text-align: center;
}

.green {
  background-color: #42d392;
}

.select-user {
  margin: 10px 20px;
  padding: 5px;
  border: 2px solid #41b883;
  border-radius: 2px;
  cursor: pointer;
  font-size: 1rem;
}

.user-wrapper {
  margin: auto;
}

.users {
  display: flex;
  justify-content: space-between;
  margin: 1em 2em;
  padding: 2px 10px;
  border: 2px solid #41b883;
  border-radius: 5px;
  background-color: #fffdfa;
}
</style>
