<template>
  <div>
    <div
        v-if="editor"
        class="flex flex-col rounded-md min-h-[80vh] shadow-2xl shadow-base-300 text-accent-content border border-base-100"
    >
      <div v-if="isEditorMode">
        <MenuBar
            class="flex items-center flex-[0 0 auto] flex-wrap p-1 border-b-2 border-base-100"
            :editor="currentEditorId ? editors.find(ed => ed.options.id === currentEditorId) : editor"
        />
        <div class="overflow-hidden overflow-y-scroll h-[58vh]">
          <div v-for="editor in editors" :key="editor.options.id" class="form__item relative"
               :style="{ color: items.find(item => item.id === editor.options.id).isEditing ? 'gray' : 'black'}"
               :class="{'form__item-active': isChunkEdit.find(chunk => chunk.id === editor.options.id).value}"
               @mouseenter="isHover.find(el => el.id === editor.options.id).value = true"
               @mouseleave="isHover.find(el => el.id === editor.options.id).value = false"
               @dblclick="setEdit(editor.options.id)"
          >
            <div
                v-if="items.find(item => item.id === editor.options.id).isEditing"
                class="text-accent-focus mb-2">
              Этот абзац редактируется {{ editor.options.name }}
            </div>

            <div
                v-if="isHover.find(el => el.id === editor.options.id).value || isChunkEdit.find(chunk => chunk.id === editor.options.id).value"
                class="form__item-buttons absolute right-1 w-auto h-auto px-1 z-10">
              <button
                  v-if="!isChunkEdit.find(chunk => chunk.id === editor.options.id).value && !items.find(item => item.id === editor.options.id).isEditing"
                  class="w-7 h-7 text-info border border-info bg-white rounded-md p-1 mr-1 cursor-pointer hover:text-white hover:bg-info"
                  @click="setEdit(editor.options.id)"
                  title="Edit"
              >
                <svg class="remix w-full h-full fill-current">
                  <use :xlink:href="`${remixiconUrl}#ri-pencil-line`"/>
                </svg>
              </button>
              <button
                  v-if="!isChunkEdit.find(chunk => chunk.id === editor.options.id).value && !items.find(item => item.id === editor.options.id).isEditing"
                  class="w-7 h-7 text-success border border-success bg-white rounded-md p-1 mr-1 cursor-pointer hover:text-white hover:bg-success"
                  @click="addParagraph(editor.options.id)"
                  title="Add"
              >
                <svg class="remix w-full h-full fill-current">
                  <use :xlink:href="`${remixiconUrl}#ri-file-add-line`"/>
                </svg>
              </button>
              <button
                  v-if="!isChunkEdit.find(chunk => chunk.id === editor.options.id).value && !items.find(item => item.id === editor.options.id).isEditing"
                  class="w-7 h-7 text-error border border-error bg-white rounded-md p-1 mr-1 cursor-pointer hover:text-white hover:bg-error"
                  @click="deleteParagraph(editor.options.id)"
                  title="Delete"
              >
                <svg class="remix w-full h-full fill-current">
                  <use :xlink:href="`${remixiconUrl}#ri-delete-bin-line`"/>
                </svg>
              </button>
              <button v-if="isChunkEdit.find(chunk => chunk.id === editor.options.id).value"
                      class="w-7 h-7 text-success border border-success bg-white rounded-md p-1 mr-1 cursor-pointer hover:text-white hover:bg-success"
                      @click="saveParagraph(editor.options.id)"
                      title="Save"
              >
                <svg class="remix w-full h-full fill-current">
                  <use :xlink:href="`${remixiconUrl}#ri-save-line`"/>
                </svg>
              </button>
            </div>

            <EditorContent :editor="editor" @keyup.enter="addParagraphByEnter(editor.options.id)"/>
          </div>
          <div v-if="items.every(item => item.isEditing) || !boardStore.currentBoard.content.content" class="flex justify-center">
            <Button class="btn-primary mt-10" @click="addNewParagraph">Add paragraph</Button>
          </div>
        </div>
      </div>
      <div v-else>
        <EditorContent
            class="py-5 px-4 flex-auto overflow-hidden overflow-y-scroll h-[72vh]"
            :editor="editor"
        />
      </div>
      <div v-if="!!(props.board.members.some(member => member.id === userStore.currentUser.id)
    || props.board.author.id === userStore.currentUser.id)" class="m-3 mt-auto flex">
        <Input
            v-if="isEditorMode"
            v-model="commit"
            placeholder="Enter your message"
            class="w-52"
        />
        <Button
            v-if="!isLoading & isEditorMode"
            class="ml-3 mr-3"
            @click="commitChanges(editors.find(ed => ed.options.id === currentEditorId)?.getText())"
        >
          Commit
        </Button>

        <button
            v-if="!isEditorMode"
            @click="isEditorMode = true"
            class="btn btn-outline btn-primary ml-auto"
        >
          edit mode
        </button>
        <button
            v-if="isEditorMode"
            @click="setReadMode"
            class="btn btn-outline btn-primary ml-auto"
        >
          read mode
        </button>

      </div>
    </div>
    <Toast :show="messageVisible">
      {{ message }}
    </Toast>
  </div>
</template>

<script setup>
import {Editor, EditorContent, Extension} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {onBeforeUnmount, onMounted, ref, toRaw} from "vue";
import {useBoardStore} from "../stores/BoardStore.js";
import MenuBar from './MenuBar.vue'
import {Highlight} from "@tiptap/extension-highlight";
import {TaskItem} from "@tiptap/extension-task-item";
import TaskList from '@tiptap/extension-task-list';
import {useUserStore} from "../stores/UserStore.js";
import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg";

const boardStore = useBoardStore();
const userStore = useUserStore();

const props = defineProps({
  board: {
    type: Object,
    required: true,
    default: () => {
    }
  }
})

const currentEditorId = ref(null)
const commit = ref('');
const isLoading = ref(false)
const message = ref('');
const messageVisible = ref(false);
const isEditorMode = ref(false)
const wasEdit = ref(false);
let isCommited = false;
const items = ref(boardStore.currentBoard.content.content)
const isChunkEdit = ref([])
const isHover = ref([])
const editors = ref([])

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {return {Enter: () => true}},
});

onMounted(() => {
  isLoading.value = true
  updateEditors()
  isLoading.value = false
})

const createEditor = (item) => {
  return new Editor({
    content: {
      type: "doc",
      content: [item]
    },
    onUpdate: () => {
      wasEdit.value = true
    },
    extensions: [
      StarterKit.configure({}),
      Highlight,
      TaskList,
      TaskItem,
      DisableEnter
    ],
    editable: false,
    name: item.editorName,
    id: item.id
  });
}

const updateEditors = () => {
  items.value = boardStore.currentBoard.content.content
  items.value.forEach(item => {
    isChunkEdit.value.push({
      id: item.id,
      value: false,
    })
    isHover.value.push({
      id: item.id,
      value: false,
    })
    const edit = createEditor(item)
    editors.value.push(edit)
  })
}

const editor = ref(new Editor({
  content: {
    type: "doc",
    content: items.value
  },
  extensions: [
    StarterKit.configure({}),
    Highlight,
    TaskList,
    TaskItem,
  ],
  editable: false
}));

const findEditorById = (id) => {
  return editors.value.find(editor => editor.options.id === id)
}

const setEdit = async (index) => {
  const response = await boardStore.checkEdit(boardStore.currentBoard.id, {paragraphId: index, editorName: userStore.currentUser.username})
  if (response.message === "Ok to editing") {
    if (currentEditorId.value) {
      await saveParagraph(currentEditorId.value)
    }
    const editor = findEditorById(index)
    isChunkEdit.value.find(chunk => chunk.id === index).value = true
    currentEditorId.value = editor.options.id
    editor.setOptions({editable: true});
    editor.commands.focus('end')
    showMessage("Вы в режиме редактирования")
  } else {
    showMessage(`Этот абзац уже редактируется пользозвателем ${response.editorName}`)
  }
}

const saveParagraph = async (id) => {
  isLoading.value = true
  const editor = findEditorById(id)
  const content = editor.getJSON().content[0].content
  const response = await boardStore.editContent(boardStore.currentBoard.id, {paragraphId: id, content: content})
  await commitChanges(editor.getText())
  boardStore.currentBoard.content = response
  editor.setOptions({editable: false});
  isChunkEdit.value.find(chunk => chunk.id === id).value = false
  currentEditorId.value = null
  isLoading.value = false
}

const addParagraph = async (id) => {
  isLoading.value = true
  const {content, newParagraph, index} = await boardStore.addContent(boardStore.currentBoard.id, {paragraphId: id})
  boardStore.currentBoard.content = content
  const newEditor = createEditor(newParagraph)
  editors.value = [...editors.value.slice(0, index + 1), newEditor, ...editors.value.slice(index + 1)]
  isChunkEdit.value = [...isChunkEdit.value.slice(0, index + 1), {id: newParagraph.id, value: true}, ...isChunkEdit.value.slice(index + 1)]
  isHover.value = [...isHover.value.slice(0, index + 1), {id: newParagraph.id, value: true}, ...isHover.value.slice(index + 1)]
  items.value = [...items.value.slice(0, index + 1), newParagraph, ...items.value.slice(index + 1)]
  currentEditorId.value = newParagraph.id
  newEditor.setOptions({editable: true})
  newEditor.commands.focus('start')
  await commitAdd()
  isLoading.value = false
}

const deleteParagraph = async (id) => {
  isLoading.value = true
  const response = await boardStore.deleteContent(boardStore.currentBoard.id, id)
  if (response.message) {
    showMessage(response.message)
  } else {
    await commitDelete(findEditorById(id).getText())
    boardStore.currentBoard.content.content = boardStore.currentBoard.content.content.filter(el => el.id !== id)
    editors.value = editors.value.filter(editor => editor.options.id !== id)
    items.value.filter(item => item.id !== id)
    isChunkEdit.value.filter(chunk => chunk.id !== id)
    currentEditorId.value = null
    isHover.value.filter(el => el.id !== id)
  }
  isLoading.value = false
}

const addParagraphByEnter = async (id) => {
  await addParagraph(id)
  await saveParagraph(id)
}

const addNewParagraph = async () => {

}

const setReadMode = async () => {
  isLoading.value = true
  isEditorMode.value = false
  editor.value.commands.setContent(boardStore.currentBoard.content)
  isLoading.value = false
}

onBeforeUnmount(async () => {
  if (currentEditorId.value) {
    await saveParagraph(currentEditorId.value)
    currentEditorId.value = null
  }
  editor.value.destroy();
  editors.value.forEach(editor => editor.destroy())
})

const createCommit = (content, message) => {
  return {
    user: userStore.currentUser.id,
    content: content,
    message: message,
  }
}

const sendCommit = async(newChange) => {
  const change = await boardStore.addChange(boardStore.currentBoard.id, newChange);
  props.board.changes.push({
    id: change._id,
    user: {
      id: userStore.currentUser.id,
      username: userStore.currentUser.username
    },
    message: change.message,
    content: change.content,
    board: change.board,
    date: change.date
  })
  isCommited = true;
  wasEdit.value = false
  commit.value = '';
}

const commitDelete = async (content) => {
  isLoading.value = true
  const newChange = createCommit(content === ' ' ? 'Пустой абзац' : content, 'Удален абзац')
  await sendCommit(newChange)
  showMessage('Удаление прошло успешно!');
  isLoading.value = false
}

const commitAdd = async () => {
  isLoading.value = true
  const newChange = createCommit('', 'Добавлен новый абзац')
  await sendCommit(newChange)
  showMessage('Добавление прошло успешно!');
  isLoading.value = false
}

const commitChanges = async (content) => {
  if (!wasEdit.value) {
    showMessage('Ничего не изменено');
  } else {
    isLoading.value = true
    const newChange = createCommit(content ? content : '', commit.value ? commit.value : 'Добавлено новое изменение')
    await sendCommit(newChange)
    showMessage('Изменение прошло успешно!');
    isLoading.value = false
  }
}

const showMessage = (msg) => {
  message.value = msg;
  messageVisible.value = true;
  setTimeout(() => {
    messageVisible.value = false;
  }, 2000);
}
</script>

<style lang="scss">
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  h1 {
    font-size: 30px;
    font-weight: bold;
  }

  h2 {
    font-size: 25px;
    font-weight: bold;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: hsl(var(--pf));
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
    background-color: #fae994;
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

.form__item {
  margin: 10px 10px 0;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  border: 1px solid #e9ecef;
  transition: .2s all ease-in-out;

  &:hover {
    border-color: #86bffa;
  }

  &--title {
    font-size: 1.5rem;
  }

  &--json {
    background: #0D0D0D;
    color: #FFF;
    font-size: 0.8rem;
  }

  &-active {
    border-color: #98c6f5;
  }
}

</style>
