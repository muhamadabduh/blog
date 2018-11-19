<template>
    <div id="single">
          <!-- Title -->
          <h1 class="mt-4">{{post.title}}</h1>

          <!-- Author -->
          <p class="lead">
            by
            <a href="#">{{post.author.name}}</a>
          </p>

          <hr>

          <!-- Date/Time -->
          <p>Posted on {{post.createdAt}} </p>

          <hr>

          <!-- Preview Image -->
          <img class="img-fluid rounded" src="http://placehold.it/900x300" alt="">

          <hr>

          <!-- Post Content -->
          <p class="lead">{{post.content}} </p>

          <hr>

          <!-- Comments Form -->
          <div class="card my-4">
            <h5 class="card-header">Leave a Comment:</h5>
            <div class="alert alert-warning" role="alert" v-show="alertComment">
                {{alertMessage}}
            </div>
            <div class="alert alert-success" role="alert" v-show="succesComment">
                {{alertMessage}}
            </div>
            <div class="card-body">
             
                <div class="form-group">
                  <textarea class="form-control" rows="3" v-model="comment" placeholder="Input your comment here ..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary" @click="submitComment()">Submit</button>
                &nbsp;
            </div>
            
          </div>

          <!-- Single Comment -->
          <div class="media mb-4" v-for="(comm, index) in post.comments" :key="index">
            <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
            <div class="media-body">
              <h5 class="mt-0">Commenter Name</h5>
              {{comm.content}}
            </div>
          </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getPost()
        this.getToken()
    },
    data(){
        return {
            post: {},
            comment: '',
            alertComment: false,
            alertMessage: '',
            token : '',
            succesComment: false
        }
    }, 
    methods: {
        getPost(){
            axios({
                method: 'get',
                url: `http://localhost:3000/posts/${this.$route.params.id}`
            })
                .then(response=>{
                    console.log(response)
                    this.post = response.data
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        submitComment(){
            if(localStorage.getItem('token')){
                axios({
                    method: 'put',
                    url: `http://localhost:3000/posts/${this.$route.params.id}/comments`,
                    headers : {
                        token: this.token
                    },
                    data: {
                        content: this.comment
                    }
                })
                    .then(response=>{
                        // console.log(response)
                        this.succesComment = true
                        this.alertMessage = response.data.message
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            } else {
                this.alertComment = true
                this.alertMessage = 'Please login first to input comment!'
                this.comment = ''
            }
        },
        getToken(){
            if(localStorage.getItem('token')){
                this.token = localStorage.getItem('token')
            }
        }
    }
}
</script>

