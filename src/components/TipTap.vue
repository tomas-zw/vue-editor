<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { ref, onMounted, toRaw, watch } from "vue";

import docsModel from "../models/docs.js";
import DropDown from "./DropDown.vue";

const docs = ref({});
let currentDoc = ref({});

const printContent = (text) => {
  console.log("current body");
  console.log(text);
};

function printDoc() {
  console.log("all Docs");
  console.log(toRaw(docs.value));
  console.log("current doc");
  console.log(toRaw(currentDoc.value));
}

async function saveDoc(newDoc) {
  if (currentDoc.value._id) {
    const docId = {
      _id: currentDoc.value._id,
      title: newDoc.title,
      text: newDoc.body,
    };
    const res = await docsModel.updateDoc(docId);
    docs.value = await docsModel.getDocs();
    return;
  }
  const res = await docsModel.addDoc(newDoc);
  docs.value = await docsModel.getDocs();
  const newCurr = docs.value.collection.slice(-1);
  changeCurrentDoc(newCurr[0]);
}

const editor = useEditor({
  content: "<h3>This is Tiptap 🎉</h3>",
  extensions: [StarterKit],
});

function changeCurrentDoc(doc) {
  currentDoc.value = doc;
}

watch(currentDoc, (newDoc, oldDoc) => {
  editor.value.commands.setContent(newDoc.body);
});

onMounted(async () => {
  docs.value = await docsModel.getDocs();
});
</script>

<template>
  <div v-if="editor" class="menu">
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
    <span class="divider">|</span>
    <button @click="printContent(editor.getHTML())">consol.log</button>
    <button @click="printDoc()">printdoc</button>
    <span class="divider">|</span>
    <button @click="saveDoc({ title: 'default', body: editor.getHTML() })">
      Spara
    </button>
    <button @click="changeCurrentDoc({})">nytt dokument</button>

    <DropDown
      v-if="docs.collection"
      :docs="docs.collection"
      :setContent="editor.commands.setContent"
      :setCurrentDoc="changeCurrentDoc"
    />
  </div>
  <editor-content :editor="editor" />
</template>

<style>
/* Basic editor styles */
.ProseMirror {
  min-height: 40vh;
  margin: 2em;
  border: 2px solid #41b883;
  border-radius: 5px;
  padding: 5px;
  background-color: #fffdfa;
}

.menu {
  margin: 2em;
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
</style>
