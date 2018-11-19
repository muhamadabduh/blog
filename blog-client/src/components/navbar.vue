<template>
    <div id="navbar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">BLO-GUE</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link to="/about" class="nav-link">About</router-link>
                    </li>
                    <li class="nav-item" v-if="loginStatus===false">
                        <a href="javascript:void(0)" class="nav-link" v-b-modal.modalRegister>Register</a>
                    </li>
                    <li class="nav-item" v-if="loginStatus===false"> 
                        <a href="javascript:void(0)" class="nav-link" v-b-modal.modalLogin>Login</a>
                    </li>
                    <li class="nav-item" v-if="loginStatus===true">
                        <a href="javascript:void(0)" class="nav-link" @click="logout()">{{name}}(Logout)</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        <login-modal id="modalLogin" title="Login Form" @model-email="user.email=$event" @model-password="user.password=$event" @user-login="$emit('notify-login', $event)"></login-modal>
        <register-modal id="modalRegister" title="Register Form" @register-success="$emit('notify-register', $event)"></register-modal>
    </div>
</template>

<script>
import LoginModal from '@/components/login-modal.vue'
import RegisterModal from '@/components/register-modal.vue'
export default {
    props: ['loginStatus', 'name'],
    components: {
        LoginModal,
        RegisterModal
    },
    data(){
        return {
            user: {
                name: '',
                email: '',
                password: ''
            },
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('token')
            router.push('home')
        }
    }
}
</script>

<style>
#navbar{
    margin-bottom: 4%
}
</style>


