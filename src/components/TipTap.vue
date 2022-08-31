<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const editor = useEditor({
  content: "<h3>This is Tiptap 🎉</h3>",
  extensions: [StarterKit],
});

const printContent = (text) => {
  console.log(text);
};
</script>

<template>
  <div v-if="editor" class="menu">
    <button @click="printContent(editor.getHTML())">console log</button>
  </div>
  <editor-content :editor="editor" />
</template>

<style>
/* Basic editor styles */
.ProseMirror {
  min-height: 40vh;
  margin: 2em;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
}

.menu {
  margin: 2em;
}

.menu button {
  margin: 2px;
}
</style>
