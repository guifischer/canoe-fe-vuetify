<template>
  <v-container>

    <div class="d-flex flex-row justify-space-between">
      <h1>Top 25 Posts from Reddit Community</h1>

      <v-btn @click="downloadPostsAsCSV()">
        Download
      </v-btn>
    </div>

    <div class="d-flex flex-row justify-space-between">
      <v-text-field
          v-model="search"
          label="Search"
          class="mr-5"
      ></v-text-field>

      <v-select
          label="Sort By"
          v-model="sortby"
          :items="sortTypes"
          class="ml-5"
      ></v-select>
    </div>

    <v-divider class="my-5"/>

    <template v-if="loading">
      <p>Loading...</p>
    </template>

    <!--   Show only posts and not comments   -->
    <template v-for="(post) in filteredPosts" :key="index" v-else>
      <template v-if="'title' in post.data">
        <Post :post="post.data" @selectPost="console.log('Post Selected:', $event)"/>
      </template>
    </template>

    <v-divider class="my-5"/>

    <v-btn @click="fetchPosts(true)">
      Load More
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Post as PostType} from "../interfaces/redditTypes.ts";
import Post from "../components/Post.vue";
import Comment from "../components/Comment.vue";
import store from "../includes/store.ts";
import {mapGetters} from "vuex";

const CommunityName = "computerscience";

export default defineComponent({
  name: "Home",
  components: {Comment, Post},
  data() {
    return {
      sortby: "hot",
      sortTypes: ["hot", "new", "top", "rising"],
      search: "",
      loading: true,
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapGetters(['posts']),
    filteredPosts(): PostType[] {
      if (this.search === "") {
        return (this.posts as PostType[]);
      }

      return (this.posts as PostType[]).filter((post: PostType) => {

        const title = 'title' in post.data ? post.data.title : '';
        const selftext = 'selftext' in post.data ? post.data.selftext : '';

        return title.toLowerCase().includes(this.search.toLowerCase()) || selftext.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    async fetchPosts(loadMore = false) {
      this.loading = true;

      await store.dispatch('fetchPosts', {
        communityName: CommunityName,
        sortby: this.sortby,
        concatResults: loadMore,
      });

      this.search = "";
      this.loading = false;
    },

    // If we want to allow downloads in Author page for example, we could move this method to a helper file and use the same method in Author.vue
    // Method would need to be a bit different tho: we would need to pass the posts as a parameter
    downloadPostsAsCSV() {
      let csv = '';

      (this.filteredPosts as PostType[]).forEach((row) => {
        if (row.kind === 't3' && 'title' in row.data) {
          csv += `${row.data.title},${row.data.author},${row.data.selftext}\n`;
        }
      });

      const anchor = document.createElement('a');
      anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
      anchor.target = '_blank';
      anchor.download = `posts-${CommunityName}.csv`;
      anchor.click();
    }
  },
  watch: {
    sortby() {
      this.fetchPosts();
    }
  }
})
</script>