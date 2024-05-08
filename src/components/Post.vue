<template>
  <v-card class="mb-5" @click="selectPost">
    <template v-slot:title>
      {{ post.title }}
    </template>

    <template v-slot:subtitle>
      {{ post.author }}
    </template>

    <template v-slot:text>
      {{ post.selftext }}
    </template>

    <v-card-actions>
      <v-btn @click="goToAuthor()">Open Author Posts</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {PostData} from "../interfaces/redditTypes.ts";

export default defineComponent({
  name: "Post",
  props: {
    post: {
      type: Object as () => PostData,
      required: true
    }
  },
  methods: {
    selectPost() {
      this.$emit("selectPost", this.$props.post);
    },
    goToAuthor() {
      this.$router.push({name: "author", params: {author: this.$props.post.author}});
    }
  }
})
</script>