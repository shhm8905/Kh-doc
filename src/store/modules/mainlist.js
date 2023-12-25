import axios from "axios";

const API = axios.create({baseURL:"http://localhost:3000/mainlist"});

const state={
    mainlist:[],
    isEditor:false,
}

const getters ={
    mainlist:(state)=>state.mainlist,
    isEditor:(state)=>state.isEditor,
}

const actions={
    // * Build restfull API *

    // Get Mainlist
    async getMainlist({commit}){
        const data = await API.get('/')
        .then((res)=>res.data).catch((err)=>console.log(err));
        commit("getMainlist",data);
    },
    // Add new branch
    async addBranch({commit},branch){
        const data = await API.post('/',branch)
        .then((res)=>res.data).catch((err)=>console.log(err));
        commit('addBranch',data);
    },
    // Add branch in main branch 
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
        state.mainlist.map((item)=>{
            if(!item.isAdd&&item.id===id){
                return(item.isAdd=true);
            }else{
                return item.isAdd=false;
            }
        })
    },
    // Show text editor
    showEditor:(state)=>{
        state.isEditor=!state.isEditor;
    }
}

export default {state,getters,actions,mutations};