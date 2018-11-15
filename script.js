"use strict";
window.addEventListener("load", function() {
    const microBlog = new Vue({
        el: ".container",
        data: {
            userName: "",
            userText: "",
            time: "",
            showMessage:false,
            messages: [],
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
                    microBlog.messages.unshift(obj);
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
            }

        }
    })
});
