<template>
    <div id="app">
        <nav-bar :loginStatus="isLogin()" @notify-register="alertMe($event)" @notify-login="alertLogin($event)" :name="name"></nav-bar>
        <div class="container">
            <div class="row" v-show="showAlert">
                <div class="alert alert-success" role="alert">
                    {{message}}
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="card my-4">
                        <h5 class="card-header">Search</h5>
                        <div class="card-body">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search for...">
                            <span class="input-group-btn">
                            <button class="btn btn-secondary" type="button">Go!</button>
                            </span>
                        </div>
                        </div>
                    </div>

                    <!-- Categories Widget -->
                    <div class="card my-4">
                        <h5 class="card-header">Categories</h5>
                        <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6">
                            <ul class="list-unstyled mb-0">
                                <li>
                                <a href="#">Web Design</a>
                                </li>
                                <li>
                                <a href="#">HTML</a>
                                </li>
                                <li>
                                <a href="#">Freebies</a>
                                </li>
                            </ul>
                            </div>
                            <div class="col-lg-6">
                            <ul class="list-unstyled mb-0">
                                <li>
                                <a href="#">JavaScript</a>
                                </li>
                                <li>
                                <a href="#">CSS</a>
                                </li>
                                <li>
                                <a href="#">Tutorials</a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>

                    <!-- User Admin Widget -->
                    <div class="card my-4" v-if="isLogin()">
                        <h5 class="card-header">Author Widget</h5>
                        <div class="card-body">
                            <router-link to='/posts/user'>My Blog Posts</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <router-view/>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import NavBar from '@/components/navbar.vue'
    import SideBar from '@/components/sidebar.vue'
    import Footer from '@/components/footer.vue'
    export default {
        components : {
            NavBar,
            SideBar,
            Footer
        }, 
        methods : {
            isLogin: function(){
                if(localStorage.getItem('token')){
                    return true
                } else {
                    return false
                }
            },
            alertMe(data){
                this.showAlert = true
                this.message = `Welcome ${data}, please login to continue!`
            },
            alertLogin(data){
                this.showAlert = true
                this.message = `Welcome back ${data}!`
                this.name = data
            }
        },
        data(){
            return {
                loginForm : false,
                showAlert: false,
                message: '',
                name: ''
            }
        }
    }
</script>

<style>
#app{
    font-family: 'Montserrat', sans-serif;
}
.alert{
    width: 100%;
}
</style>
