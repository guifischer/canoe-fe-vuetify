<template>

  <v-card class="mb-5" @click="selectComment()">

    <template v-slot:subtitle>
      {{ comment.author }}
    </template>

    <template v-slot:text>
      {{ comment.body }}
    </template>

  </v-card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {CommentData} from "../interfaces/redditTypes.ts";

export default defineComponent({
  name: "Comment",
  props: {
    comment: {
      type: Object as () => CommentData,
      required: true
    }
  },
  methods: {
    selectComment() {
      this.$emit("selectComment", this.$props.comment);
    }
  }
})
</script>