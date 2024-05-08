<template>
  <v-container>


    <div class="d-flex flex-row justify-space-between">
      <h1>{{ author }}</h1>

      <v-btn @click="goHome()">
        Go back home
      </v-btn>
    </div>

    <v-divider class="my-5"/>

    <template v-for="post in allPosts" :key="post.id">

      <template v-if="post.kind === 't3' && 'title' in post.data">
        <Post :post="post.data" @selectPost="console.log('Post Selected:', $event)"/>
      </template>

      <template v-else-if="'body' in post.data">
        <Comment :comment="post.data"/>
      </template>

    </template>

  </v-container>
</template>

<!-- This example don't use Vuex. It's simpler but exemplify another way of showing the results -->
<script lang="ts">
import {defineComponent} from "vue";
import {Post as PostType, RedditApiResponse} from "../interfaces/redditTypes.ts";
import redditApi from "../api/redditApi.ts";
import Post from "../components/Post.vue";
import Comment from "../components/Comment.vue";

export default defineComponent({
  name: "Author",
  components: {Comment, Post},
  data() {
    return {
      author: this.$route.params.author as string,
      allPosts: [] as PostType[],
    }
  },
  mounted() {
    this.loadAuthor();
  },
  methods: {
    async loadAuthor() {
      const response: RedditApiResponse = await redditApi.getAuthor(this.author)
      this.allPosts = response.data.children;
    },
    goHome() {
      this.$router.push({name: "home"});
    }
  }
})
</script>