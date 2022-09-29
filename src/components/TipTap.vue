<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { io } from "socket.io-client";

import docsModel from "../models/docs.js";
import DropDown from "./DropDown.vue";

const props = defineProps({
  token: Object,
});

const docs = ref({});
let currentDoc = ref({});

const editor = useEditor({
  content:
    "<h3>Skapa ett nytt dokument eller välj ett befintligt från menyn.</h3>",
  extensions: [StarterKit],
});

//----------------socket-------------------------

let socket = io(docsModel.baseUrl);

socket.on("update_document", (data) => {
  changeCurrentDoc(data);
});

function joinRoom(room) {
  socket.emit("create", room);
}

function leaveRoom(room) {
  socket.emit("leave", room);
}

function emitCurrentDocToRoom() {
  socket.emit("update_document", currentDoc.value);
}

function emitOnlySavedDocument(newBody) {
  currentDoc.value.body = newBody;
  currentDoc.value._id ? emitCurrentDocToRoom() : console.log("not saved");
}

//----------------socket-------------------------

async function getDocuments() {
  docs.value = await docsModel.getDocs(props.token.token);
}

async function saveDoc(newDoc) {
  if (currentDoc.value._id) {
    const docId = {
      _id: currentDoc.value._id,
      title: newDoc.title,
      body: newDoc.body,
    };
    const res = await docsModel.updateDoc(docId, props.token.token);
    //docs.value = await docsModel.getDocs(props.token.token);
    getDocuments();

    changeCurrentDoc(docId);
    emitCurrentDocToRoom();

    return;
  }
  const res = await docsModel.addDoc(newDoc, props.token.token);
  //docs.value = await docsModel.getDocs(props.token.token);
  getDocuments();
  console.log(`before propsDocs = ${docs.value.collection}`);
  if (res) {
    console.log(`res.docs = ${res.doc.insertedId}`);
    currentDoc.value._id = res.doc.insertedId;
  }
  console.log(`propsDocs = ${docs.value}`);
}

function changeCurrentDoc(doc) {
  currentDoc.value = doc;
}

function changeCurrentDocAndUpdateRooms(doc) {
  if (currentDoc.value._id) {
    leaveRoom(currentDoc.value._id);
  }
  if (doc._id) {
    joinRoom(doc._id);
  }
  console.log(`token = ${props.token.token}`);
  currentDoc.value = doc;
}

watch(currentDoc, (newDoc, oldDoc) => {
  editor.value.commands.setContent(newDoc.body);
});

onMounted(async () => {
  console.log("mounted");
  //docs.value = await docsModel.getDocs(props.token);
});

onBeforeUnmount(() => {
  socket.disconnect();
});
</script>

<template>
  <div class="editor-wrapper">
    <div v-if="editor" class="menu">
      <div
        class="emit-on-click"
        @click="emitOnlySavedDocument(editor.getHTML())"
      >
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          bold
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          italic
        </button>
        <span class="divider">|</span>
        <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          paragraph
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          h1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          h2
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          h3
        </button>
        <span class="divider">|</span>
        <button @click="editor.chain().focus().undo().run()">undo</button>
        <button @click="editor.chain().focus().redo().run()">redo</button>
      </div>
      <div v-if="token.token" class="save-menu">
        <button
          @click="
            saveDoc({
              title: currentDoc.title || 'ange titel',
              body: editor.getHTML(),
            })
          "
        >
          Spara
        </button>
        <button @click="changeCurrentDocAndUpdateRooms({})">
          nytt dokument
        </button>

        <DropDown
          :docs="docs.collection"
          :setContent="editor.commands.setContent"
          :setCurrentDoc="changeCurrentDocAndUpdateRooms"
          :getDocuments="getDocuments"
        />
      </div>
    </div>

    <div class="title-wrap">
      <input
        class="title-bar"
        v-model="currentDoc.title"
        v-on:keyup="emitOnlySavedDocument(editor.getHTML())"
        placeholder="<Titel för detta dokument>"
      />
    </div>

    <editor-content
      v-on:keyup="emitOnlySavedDocument(editor.getHTML())"
      :editor="editor"
    />
  </div>
</template>

<style>
/* Basic editor styles */
.ProseMirror {
  min-height: 40vh;
  margin: 1em 2em;
  border: 2px solid #41b883;
  border-radius: 5px;
  padding: 5px;
  background-color: #fffdfa;
}

.editor-wrapper {
  margin: auto;
  max-width: 950px;
}

.menu {
  display: flex;
  justify-content: space-between;
  margin: 2em 2em 1em 2em;
}

.title-wrap {
  margin: 1em 2em;
  border: 2px solid #41b883;
  border-radius: 5px;
  background-color: #fffdfa;
}

.title-bar {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  overflow: hidden;
  text-align: center;
  font-size: 1.1em;
}

.divider {
  margin: 5px;
  color: #798999;
}

.is-active {
  text-decoration: underline;
  color: red;
}

.menu button {
  margin: 2px;
  padding: 5px;
  border: 2px solid #41b883;
  border-radius: 2px;
  background-color: #42d392;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  text-decoration: underline;
}
</style>
