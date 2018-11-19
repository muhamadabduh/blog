<template>
    <div id="article">
        <br>
        <div class="col-md-8"> 
            <b-btn variant="primary" @click="create">{{buttonForm}} </b-btn>
        </div>
        <br>
        <div class="alert alert-success" role="alert" v-show="showMessage">
            {{message}}
        </div>
        <div class="col-md-12" v-show="showForm">
            <b-form-input v-model="newPost.title" placeholder="Title" type="text"></b-form-input>
            <br>
            <b-form-textarea id="textarea1"
                     v-model="newPost.content"
                     placeholder="Content here ...."
                     :rows="3"
                     :max-rows="6">
            </b-form-textarea>
            <br>
            <b-btn variant="primary" @click="submitPost" v-if="buttonForm=='Add New Post'">Submit</b-btn>
            <b-btn variant="primary" @click="editPost" v-else-if="buttonForm =='Edit Post'">Edit</b-btn>&nbsp;
            <b-btn @click="cancel()">cancel</b-btn>
        </div>
        <br>
        <div class="col-md-12">
            <div class="table table-hover" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">title</th>
                        <th scope="col">content</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(post, index) in posts" :key="index" >
                        <th scope="row">{{index}}</th>
                        <td>{{post.title}}</td>
                        <td>{{post.content}}</td>
                        <td>
                            <b-btn variant="sm btn-primary" @click="edit(post)">edit</b-btn> &nbsp;
                            <b-btn variant="sm btn-danger" @click="deletePost(post._id)">delete</b-btn>
                        </td>
                    </tr>
                </tbody>
            </div>
        </div>
    </div>
</template>

<script>
import InputComponent from '@/components/input-component.vue'
import FormGroup from '@/components/form-group.vue'
export default {
    components: {
        InputComponent,
        FormGroup
    }, 
    data(){
        return {
            posts: [],
            token: '',
            newPost: {
                title: '',
                content: ''
            },
            showForm: false,
            message: '',
            showMessage: false,
            buttonForm: 'Add New Post'
        }
    },
    mounted(){
        this.isLogin()
        this.getPosts()
    },
    methods: {
        getPosts(){
            axios({
                method: 'get',
                url: 'http://35.196.110.1:80/posts/user',
                headers: {
                    token : this.token
                }
            })
                .then(response=>{
                    this.posts = response.data
                    
                })
                .catch(error=>{
                    console.log(error.message)
                })
        },
        isLogin(){
            if(localStorage.getItem('token')){
                this.token = localStorage.getItem('token')
            } else {
                $route.push({path: '/'})
            }
        },
        edit(obj){
            this.buttonForm = 'Edit Post'
            this.newPost = obj
            this.showForm = true
        },
        create(){
            this.showForm = !this.showForm
        },
        submitPost(){
            axios({
                method: 'post',
                url: 'http://35.196.110.1:80/posts',
                headers: {
                    token : this.token
                },
                data: this.newPost
            })
                .then(response=>{
                    this.message = response.data.message
                    this.showMessage = true
                    this.getPosts()
                    this.newPost = {
                        title: '',
                        content: ''
                    }
                    this.showForm = false
                })
                .catch(error=>{
                    console.log(error)
                })
        },
        deletePost(id){
            axios({
                method: 'delete',
                url: `http://35.196.110.1:80/posts/${id}`,
                headers: {
                    token: this.token
                }
            })
                .then(response=>{
                    this.message = response.data.message
                    this.showMessage = true
                    this.cancel()
                    this.getPosts()
                })
                .catch(err=>{
                    console.log(err )
                })
        },
        editPost(){
            axios({
                method: 'patch',
                url: `http://35.196.110.1:80/posts/${this.newPost._id}`,
                data: {
                    title: this.newPost.title,
                    content: this.newPost.content,
                    updatedAt: new Date()
                },
                headers: {
                    token: this.token
                }
            })
                .then(response=>{
                   this.message = response.data.message
                   this.showMessage = true
                   this.cancel()
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        cancel(){
            this.showForm = false,
            this.newPost = {
                title: '',
                content: ''
            }
            this.buttonForm = 'Add New Article'
        }
    }
}
</script>

