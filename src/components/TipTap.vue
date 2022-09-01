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
    |
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
    |
    <button @click="editor.chain().focus().undo().run()">undo</button>
    <button @click="editor.chain().focus().redo().run()">redo</button> |
    <button @click="printContent(editor.getHTML())">Spara</button>
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
