<template>
    <div class="editor">
        <button name="submit" title="Add New Branch" @click="handleSubmit"><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
        <trumbowyg v-model="form.content" :config="configs" class="form-control"></trumbowyg>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import Trumbowyg from 'vue-trumbowyg';
import 'trumbowyg/dist/ui/trumbowyg.css';
import 'trumbowyg/dist/plugins/colors/trumbowyg.colors';
import 'trumbowyg/dist/plugins/colors/ui/trumbowyg.colors.css';
import "trumbowyg/dist/plugins/history/trumbowyg.history.min.js";
import "trumbowyg/dist/plugins/base64/trumbowyg.base64.min.js";


export default{
    name:'Editor',

    components: {
      "trumbowyg": Trumbowyg
    },
 
    data(){
        return{
            form: {
                content: `<h1 class="branch-name" id="branch-name"></h1>`,
                body: null,
            },
            configs: {
                autogrow: true,
                removeformatPasted: true,
                imageWidthModalEdit: true,
                btns: [
                    ['viewHTML'],
                    ['historyUndo', 'historyRedo'],
                    ['formatting'],
                    ['bold', 'italic'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                    ['foreColor'], ['backColor'],
                    ['indent', 'outdent'],
                    ['horizontalRule'],
                    ['unorderedList', 'orderedList'],
                    ['superscript', 'subscript'],
                    ['link'],
                    ['btnGrp-image'],
                    ['removeformat'],
                    ['fullscreen'],
                ],
                btnsDef: {
                    'btnGrp-image': {
                        dropdown: ['insertImage', 'base64'],
                        ico: 'insertImage'
                    }   
                },
                
            },
            
        }
    },
    methods:{
        ...mapActions(['addBranch']),
        handleSubmit(){
            const branchName=document.getElementById('branch-name');
            const newBranch={
                id:Math.floor(Math.random()*10000),
                title: branchName.innerText ,
                branches:[],
                contents:"",
                isShow:false,
                isAdd:false,
            }; 
            if(newBranch.title.length>2){
                this.addBranch(newBranch);
            }else{
                alert('Please the name of branch most to be more than two letters!!')
            }
            
            
        },
    }
}

</script>