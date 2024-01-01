import axios from "axios";
import 'trumbowyg';
import $ from 'jquery';

const API = axios.create({baseURL:"http://localhost:3000/mainlist"});

const state={
    mainlist:[],
    isEditor:false,
    branchContent: `<h1 class="branch-name" id="branch-name"></h1>`,
    isUpdate:false,
}

const getters ={
    mainlist:(state)=>state.mainlist,
    isEditor:(state)=>state.isEditor,
    branchContent:(state)=>state.branchContent,
    isUpdate:(state)=>state.isUpdate,
}

const actions={
    // * Build restfull API *

    // Get Mainlist
    async getMainlist({commit}){
        const data = await API.get('/')
        .then((res)=>res.data).catch((err)=>console.log(err));
        commit("getMainlist",data);
    },

    // Get a specific branch
    async getBranch({commit},id){
        const data = await API.get(`/${id}`)
        .then((res)=>res.data).catch((err)=>console.log(err));
        commit('getBranch',data);
    },
    // Add new branch
    async addBranch({commit},branch){
        const data = await API.post('/',branch)
        .then((res)=>res.data).catch((err)=>console.log(err));
        commit('addBranch',data);
    },
    // Update main branch  branch in main branch 
    async addBranch1({commit},branch){
        const data = await API.patch(`/${branch.id}`,branch)
        .then((res)=>res.data).catch((err)=>console.log(err));
        commit('addBranch1',data);
    }
}

const mutations = {
    // Get all mainlist
    getMainlist:(state,data)=>{
        if(data.length>0){
            return state.mainlist=data;
        }else{
            state.isEditor=false;
        }
    },
    // Get a specific branch
    getBranch:(state,data)=>{
        state.branchContent = data.content;
        $('.form-control').trumbowyg('html',state.branchContent);
        state.isEditor=true;
        state.isUpdate=true;
    },
    // Add new main branch
    addBranch:(state,data)=>{
        state.isEditor=true;
        state.mainlist.map((branch1)=>{
            console.log(branch1)
        })
        state.mainlist.push(data);
    },
    // Add branch in main branch 
    addBranch1:(state,data)=>{
        state.mainlist.filter((branch)=>{
            return branch.id===data.id?data:branch;
        })
    },
    // * Build some main functions *

    // View list of specific main title or other branches
    showList:(state,id)=>{
        // mainlist
        state.mainlist.map((item)=>{
            if(item.id===id){
                return(item.isShow=!item.isShow);
            // List-1
            }else if(item.branches.length>0){
                item.branches.map((branch)=>{
                    if(branch.id===id){
                        return branch.isShow=!branch.isShow;
                    // List-2
                    }else if(branch.branches.length>0){
                        branch.branches.map((branch1)=>{
                            if(branch1.id===id){
                                return branch1.isShow=!branch1.isShow;
                            // List-3
                            }else if(branch1.branches.length>0){
                                branch1.branches.map((branch2)=>{
                                    if(branch2.id===id){
                                        return branch2.isShow=!branch2.isShow;
                                    // List-4
                                    }else if(branch2.branches.length>0){
                                        branch2.branches.map((branch3)=>{
                                            if(branch3.id===id){
                                                return branch3.isShow=!branch3.isShow;
                                            // List-5
                                            }else if(branch3.branches.length>0){
                                                branch3.branches.map((branch4)=>{
                                                    if(branch4.id===id){
                                                        return branch4.isShow=!branch4.isShow;
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    // Show menu list(Adding,Editing,Deleting)
    showMenu:(state,id)=>{
        // Check which branch is clicked

        // Check the first list
        state.mainlist.map((list)=>{
            if(list.id===id&&!list.isAdd){
                list.isAdd=true;
            }else{
                list.isAdd=false;
            }
            // Check the second list 
            if(list.branches.length>0){
                list.branches.map((branch)=>{
                    if(branch.id===id&&!branch.isAdd&&!list.isAdd){
                        branch.isAdd=true;
                    }else{
                        branch.isAdd=false;
                    }
                    // Check the third list 
                    if(branch.branches.length>0){
                        branch.branches.map((branch1)=>{
                            if(branch1.id===id&&!branch1.isAdd&&!branch.isAdd&&!list.isAdd){
                                branch1.isAdd=true;
                            }else{
                                branch1.isAdd=false;
                            }
                            // Check the fourth list
                            if(branch1.branches.length>0){
                                branch1.branches.map((branch2)=>{
                                    if(branch2.id===id&&!branch2.isAdd&&!branch1.isAdd&&!branch.isAdd&&!list.isAdd){
                                        branch2.isAdd=true;
                                    }else{
                                        branch2.isAdd=false;
                                    }
                                    // Check the fifth list
                                    if(branch2.branches.length>0){
                                        branch2.branches.map((branch3)=>{
                                            if(branch3.id===id&&!branch3.isAdd&&!branch2.isAdd&&!branch1.isAdd&&!branch.isAdd&&!list.isAdd){
                                                branch3.isAdd=true;
                                            }else{
                                                branch3.isAdd=false;
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    // Show text editor
    showEditor:(state)=>{
        state.isEditor=!state.isEditor;
    }
}

export default {state,getters,actions,mutations};