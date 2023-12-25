<template>
    <div class="left" @click="showMenu">
        <ul class="items">
            <h3 class="sub" @click ="handleShow">Add New Main Branch</h3>
            <li v-for="(list) in mainlist" :key="list.id" class="item">
                <i class="descIcon fa fa-sort-desc" aria-hidden="true" v-if="list.isShow" @click="showList(list.id)"></i>
                <i class="descIcon fa fa-caret-right" aria-hidden="true" v-else @click="showList(list.id)"></i>
                <h3 class="title" @contextmenu="disableMenu" @click.right="showMenu(list.id)">{{ list.title }}</h3>
                <ActionsMenu v-if="list.isAdd" />
                <ul class="contents" v-if="list.isShow">
                    <li v-for="branch in list.branches" :key="branch.id">
                        <i class="descIcon fa fa-sort-desc" aria-hidden="true" v-if="branch.isShow" @click="showList(branch.id)"></i>
                        <i class="descIcon fa fa-caret-right" aria-hidden="true" v-else @click="showList(branch.id)"></i>
                        <h3 class="title" @contextmenu="disableMenu" @click.right="showMenu(branch.id)">{{ branch.title }}</h3>
                        <ActionsMenu v-if="branch.isAdd" />
                        <ul class="contents" v-if="branch.isShow">
                            <li v-for="branch1 in branch.branches" :key="branch1.id">
                                <i class="descIcon fa fa-sort-desc" aria-hidden="true" v-if="branch1.isShow" @click="showList(branch1.id)"></i>
                                <i class="descIcon fa fa-caret-right" aria-hidden="true" v-else @click="showList(branch1.id)"></i>
                                <h3 class="title" @contextmenu="disableMenu" @click.right="showMenu(branch1.id)">{{ branch1.title }}</h3>
                                <ActionsMenu v-if="branch1.isAdd" />
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from "vuex";
import ActionsMenu from "./ActionsMenu.vue";

export default{
    name:'LeftSide',
    data(){
        return{
            clicked:false,
            subject:"",
        }
    },
    components:{ActionsMenu},
    computed:{
        ...mapGetters(["mainlist"])
    },
    mounted(){
        this.getMainlist();
    },
    methods:{
        ...mapActions(["getMainlist"]),
        ...mapMutations(["showList","showMenu","showEditor"]),
        handleShow(){
            this.clicked=!this.clicked;
            this.showEditor();
        },
        disableMenu(e){
            e.preventDefault();
        },
    }
}
</script>