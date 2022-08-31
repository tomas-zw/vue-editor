<script>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
  },

  setup() {
    const editor = useEditor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit,
      ],
    })

    return { editor }
  },
}
</script>

<template>
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
</style>
