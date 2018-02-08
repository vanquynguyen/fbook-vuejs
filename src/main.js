import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import VeeValidate from 'vee-validate';

Vue.use(VueFire)
Vue.use(VeeValidate)

VeeValidate.Validator.extend('passphrase', {
  getMessage: field => 'Sorry dude, wrong pass phrase.',
  validate: value => value.toUpperCase() == 'Demogorgon'.toUpperCase()
});

new Vue({
  el: '#app',
  render: h => h(App)
})
