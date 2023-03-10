<template>
  <div>
    <div v-if="editor" class="editor">
      <MenuBar class="editor__header" :editor="editor"/>
      <EditorContent class="editor__content" :editor="editor" v-focus/>
      <div v-if="!!(props.board.members.some(member => member.id === userStore.currentUser.id)
      || props.board.author.id === userStore.currentUser.id)" class="editor__footer">
        <Input v-model="commit" placeholder="Enter your message" class="commit"/>
        <Button class="commit-button" @click="commitChanges">Commit</Button>
        {{message}}
      </div>
    </div>
  </div>
</template>

<script setup>
import {Editor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {onBeforeUnmount, ref} from "vue";
import {useBoardStore} from "../stores/BoardStore.js";
import MenuBar from './MenuBar.vue'
import {Highlight} from "@tiptap/extension-highlight";
import {TaskItem} from "@tiptap/extension-task-item";
import TaskList from '@tiptap/extension-task-list';
import {useUserStore} from "../stores/UserStore.js";
import {useChangesStore} from "../stores/ChangesStore";

const boardStore = useBoardStore();
const userStore = useUserStore();
const changesStore = useChangesStore();

const props = defineProps({
  board: {
    type: Object,
    required: true,
    default: () => {
    }
  }
})

const commit = ref('');
const message = ref('');

const wasEdit = ref(false);
let isCommited = false;

const editor = new Editor({
  content: props.board.content,
  onUpdate: ({editor}) => {
    wasEdit.value = true;
    const json = editor.getJSON();
    props.board.content = json;
  },
  extensions: [
    StarterKit.configure({}),
    Highlight,
    TaskList,
    TaskItem,

  ],
  editable: !!(props.board.members.some(member => member.id === userStore.currentUser.id)
      || props.board.author.id === userStore.currentUser.id),
});

editor.commands.focus('end')

onBeforeUnmount(() => {
  editor.destroy();

  if (wasEdit.value && !isCommited) {
    const newChange = {
      id: Date.now(),
      boardId: props.board.id,
      user: {
        id: userStore.currentUser.id,
        username: userStore.currentUser.username
      },
      date: new Date(),
      content: commit.value || '?????????????????? ?????????? ??????????????????',
    }
    changesStore.addChange(newChange);
  }
})

const commitChanges = () => {
  if (!wasEdit.value) {
    message.value = '???????????? ???? ????????????????';
  } else {
    const newChange = {
      id: Date.now(),
      boardId: props.board.id,
      user: {
        id: userStore.currentUser.id,
        username: userStore.currentUser.username
      },
      date: new Date(),
      content: commit.value || '?????????????????? ?????????? ??????????????????',
    }
    changesStore.addChange(newChange);
    isCommited = true;
    message.value = '?????????????????? ???????????? ??????????????!'
    commit.value = '';
  }
}

</script>


<style scoped>
.commit {
  border-radius: 20px;
  width: 200px;
}

.commit-button {
  margin-left: 10px;
  border-radius: 20px;
}

.editor {
  display: flex;
  flex-direction: column;
  color: #0D0D0D;
  background-color: #FFF;
  border: 3px solid #0D0D0D;
  border-radius: 0.75rem;
  min-height: 80vh;
}

.editor__header {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
  padding: 0.25rem;
  border-bottom: 3px solid #0D0D0D;
}

.editor__content {
  padding: 1.25rem 1rem;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.editor__footer {
  margin: 0 0 10px 10px;
}
</style>

<style lang="scss">
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
