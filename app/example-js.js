var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

var app2 = new Vue({
  el: '#app-2',
  data:{
    message: 'You loaded this page on ' + new Date().toLocaleString()
  }
})

var app3 = new Vue({
  el: '#app-3',
  data:{
    seen: true
  }
})

var app4 = new Vue({
  el: '#app-4',
  data:{
    books : [{text: "Harry Potter"},
            {text: "Rodger Rabbit"},
            {text: "Horrid Henry"},
            {text: "Angry Birds"}]
  }
})

var app5 = new Vue({
  el: '#app-5',
  data:{
    cars : ['Ferrari', 'Ford', 'Mercedes', 'Honda']
  }
})

var app6 = new Vue({
  el: '#app-6',
  data:{
    message: 'Hello, World!'
  },
  methods: {
    reverseMessage : function (){
      this.message = this.message.split('').reverse().join('')
    }
  }
})
