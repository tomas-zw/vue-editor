<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { ref, onMounted, toRaw } from "vue";
import DropDown from "./DropDown.vue";

const printContent = (text) => {
  console.log("printcontent");
  console.log(text);
};

async function allDocs() {
  let docs = await fetch("http://localhost:1337/");
  const result = await docs.json();
  console.log("alldocs");
  console.log(result.data.mongo);
  return result.data.mongo;
}

const docs = ref({});

function printDoc() {
  console.log("printDoc");
  console.log(toRaw(docs.value));
}

const editor = useEditor({
  content: "<h3>This is Tiptap 🎉</h3>",
  extensions: [StarterKit],
});

onMounted(async () => {
  docs.value = await allDocs();
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
    <button @click="printContent(editor.getHTML())">Spara</button>

    <button @click="printContent(docs)">printcontent</button>
    <button @click="printDoc()">printdoc</button>
    <button @click="editor.commands.setContent(docs[0].title)">alldocs</button>
    <DropDown v-if="docs.length" :docs="docs" />
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

.menu button {
  margin: 2px;
  padding: 5px;
  border: 2px solid #41b883;
  border-radius: 2px;
  background-color: #42d392;
  cursor: pointer;
}
</style>
