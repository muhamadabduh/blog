<template>
  <div>
    <!-- Modal Component -->
    <b-modal :id="id"
             ref="modal"
             :title="title"
             @ok="handleOk"
             >
      <div class="alert alert-danger" role="alert" v-show="errEmail">
        Please input a valid email!
      </div>
      <div class="alert alert-danger" role="alert" v-show="errPassword">
        Password must be at least 8 characters
      </div>
      <form @submit.stop.prevent="handleSubmit">
        <form-group label="email" type="email" v:model="user.email" validate="validateEmail" @get-value="user.email=$event"></form-group>
        <form-group label="password" type="password" @get-value="user.password=$event"></form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import FormGroup from '@/components/form-group.vue'
export default {
  data () {
    return {
      name: '',
      names: [],
      user: {
        email: '',
        password: ''
      },
      errEmail : false,
      errPassword: false,
    }
  },
  methods: {
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (this.validateEmail(this.user.email)==false) {
        this.errEmail = true
      } else if(this.user.password.length < 8) {
        this.errPassword = true
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      axios({
        method: 'post',
        url: 'http://35.196.110.1/login',
        data: this.user
      })
        .then(response=>{
          localStorage.setItem('token', response.data.token)
          this.$emit('user-login', response.data.name)
          this.$refs.modal.hide()
        })
        .catch(err=>{
          console.log(err.data)
        })
    },
    validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    }
  }, 
  components: {
    FormGroup
  },
  props: ['title', 'id']
}
</script>

<!-- modal-prevent-1.vue -->