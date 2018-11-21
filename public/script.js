"use strict";
window.addEventListener("load", function() {
    let data=[];
    let post =[];
    async function paste () {
        let res = await fetch("http://127.0.0.1:5000/message");
        let dataJson = await res.json();
        data = dataJson;
        for (let i =data.length-1;i>=0;i--){
            post.unshift(data[i]);
        }
    };
    paste();

    async function seve (message) {
       await fetch("http://127.0.0.1:5000/save", {
           method: "POST",
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               },
           body: JSON.stringify(message)
       }
           )
    }
    const microBlog = new Vue({
        el: ".container",
        data: {
            userName: "",
            userText: "",
            time: "",
            showMessage:false,
            messages:post,
            error:false,
            usual:true,
            editKey:-1

        },
        methods:{
            newMessage:function () {
                if(this.userName!==""&&this.userText!==""){
                    let obj ={
                    name: this.userName,
                    text: this.userText,
                    timeIsNow: this.time
                };
                    this.messages.unshift(obj);
                    this.userText="";
                    this.userName="";
                }else {
                    this.usual=false;
                    this.error=true;
                    setTimeout(()=> {
                        this.usual=true;
                        this.error=false;
                    },2000);
                }
            },
            remove: function (i) {
                    this.messages.splice(i, 1);
            },
            edit:function(i){
                if(this.editKey !== i){
                    this.editKey = i;
                }else {
                    this.editKey = -1;
                }
            },
            dispatchTime: function () {
                let d = new Date();
                let options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                };
                this.time = d.toLocaleString("en-US", options);
            },
            seve:function (m) {
                seve (m);
            },
        }
    })

});


