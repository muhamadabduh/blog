<template>
  <div class="home">
    <h1 class="my-4">All Posts
          
          </h1>
          <!-- Blog Post -->
          <div class="card mb-4" v-for="(post, index) in posts" :key="index">
            <img class="card-img-top" src="http://placehold.it/750x300" alt="Card image cap">
            <div class="card-body">
              <h2 class="card-title">{{post.title}}</h2>
              <p class="card-text">{{post.content}} </p>
              <router-link href="#" class="btn btn-primary" :to="{name: 'posts', params : {id : post._id}}">Read More &rarr;</router-link>
            </div>
            <div class="card-footer text-muted">
              Posted on {{post.createdAt}}  by
              {{post.author.name}}
            </div>
          </div>


          <!-- Pagination -->
          <b-pagination align="center" :total-rows="100" v-model="currentPage" :per-page="2">
          </b-pagination>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data(){
    return {
      posts : [],
      currentPage: 3
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    this.getAllPosts()
  },
  methods: {
    getAllPosts(){
      axios({
        method: 'get',
        url: 'http://35.196.110.1/posts'
      })
        .then(response=>{
          this.posts = response.data.posts
        })
        .catch(error=>{
          console.log(error)
        })
    },
    getDateFormat(date){
      return `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`
    }
  }
}
</script>

