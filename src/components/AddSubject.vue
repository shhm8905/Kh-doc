<template>
    <form name="c" class="inpsub" @submit.prevent="handleSubmit">
        <input type="text" placeholder="Write your Subject" v-model="subject" required>
        <button type="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
        <p class="errmsg" v-if="errMsg">{{ errMsg }}</p>
    </form>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default{
    name:"AddSubject",

    props:{
        data:String,
        id:Number
    },

    data(){
        return{
            subject:'',
            errMsg:''
        }
    },

    computed:{
        ...mapGetters(["branches"])
    },

    methods:{
        ...mapActions(['addBranch','addBranch1']),

        handleSubmit(){
            const newBranch={
                id:Math.floor(Math.random()*10000),
                title:this.subject,
                contents:[],
                isClicked:false,
                isAdd:false,
            };
            switch (this.data) {
                case "branch1":
                    if(this.subject.length>3){
                        this.addBranch(newBranch);
                        this.subject="";
                        this.errMsg="";
                    }else{
                        this.errMsg="At least four letters!!"
                    }
                    break;
                case "branch2":
                    if(this.subject.length>3){
                        let updatedBranch={};
                        this.branches.map((branch)=>{
                            if(branch.id===this.id){
                                updatedBranch=branch;
                                branch.contents.push(newBranch);
                            }
                        })
                        this.addBranch1(updatedBranch); 
                        this.subject="";
                        this.errMsg="";
                    }else{
                        this.errMsg="At least four letters!!"
                    }
                break;
            
                default:
                    break;
            }
            
            
        },
    }
}

</script>