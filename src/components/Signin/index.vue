<template>
<div class="container">
    <div class="signin_container">

        <h1>Sign in</h1>
        <form @submit.prevent="onSubmit">

             <div 
                  class="input_field"
                  :class="{invalid: $v.formdata.email.$error}"
                  >
                 <label>Email</label>
                 <input 
                 type="email"
                 @blur="$v.formdata.email.$touch()"
                 v-model.trim="formdata.email">
                 <div v-if="$v.formdata.email.$error">
                     <p class="error_label" v-if="!$v.formdata.email.required">
                         This field is Required
                     </p>
                     <p class="error_label" v-if="!$v.formdata.email.email">
                         Please enter a valid email
                     </p>
                 </div>
             </div>

             <div 
                  class="input_field"
                  :class="{invalid: $v.formdata.password.$error}"
                  >
                 <label>Password</label>
                 <input 
                 type="password"
                 @blur="$v.formdata.password.$touch()"
                 v-model.trim="formdata.password">
                 <div v-if="$v.formdata.password.$error">
                     <p class="error_label" v-if="!$v.formdata.password.required">
                         This field is Required
                     </p>
                     <p class="error_label" v-if="!$v.formdata.password.minLength">
                         Please enter at least 4 characters
                     </p>
                 </div>

             
             </div>

             <button type="submit">
                 Sign in
             </button>

             <p class="error_label" v-if="error">
                 Something is wrong 
             </p>

             <p class="error_label" v-if="authFailed">
                 Please check your Email and Password
             </p>

         </form>
         </div>
    </div>
</template>


<script>
       import { required , email, minLength } from 'vuelidate/lib/validators'


     export default {
         data(){
             return {
                 error: false,
                 formdata:{
                     email: '',
                     password:''
                 }
             }
         },
         computed:{
             authFailed(){
                 return this.$store.state.admin.authFailed
             }
         },
         destroyed(){
              this.$store.commit('admin/authFailed', 'reset')
         },
         validations:{
              formdata:{
                  email:{
                       required,
                       email
                  },
                  password:{
                       required,
                       minLength: minLength(4)
                  }
              }       
         },
         methods:{
             onSubmit(){
                 if(!this.$v.$invalid){
                  this.$store.dispatch('admin/signIn', this.formdata)
                 } else {
                     this.error = true;
                     setTimeout(()=>{
                           this.error = false
                     },3000)
                 }
                 
                 
                 
             }
         }
     }
</script>

<style scoped>
     .input_field.invalid input,
     .input_field.invalid select {
         border: 1px solid red;
     }
</style>

