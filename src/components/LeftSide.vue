<template>
    <div class="left" @click="showMenu">
        <!-- Showing the first list -->
        <ul class="items">
            <li v-for="(list) in mainlist" :key="list.id" class="item">
                <i class="descIcon fa fa-sort-desc" aria-hidden="true" v-if="list.isShow" @click="showList(list.id)"></i>
                <i class="descIcon fa fa-caret-right" aria-hidden="true" v-else @click="showList(list.id)"></i>
                <h3 class="title" @contextmenu="disableMenu" @click.right="showMenu(list.id)" @click="getBranch(list.id)">{{ list.title }}</h3>
                <ActionsMenu v-if="list.isAdd" :id="list.id"/>
                <!-- Showing the second list -->
                <ul class="contents" v-if="list.isShow">
                    <li v-for="branch in list.branches" :key="branch.id">
                        <i class="descIcon fa fa-sort-desc" aria-hidden="true" v-if="branch.isShow" @click="showList(branch.id)"></i>
                        <i class="descIcon fa fa-caret-right" aria-hidden="true" v-else @click="showList(branch.id)"></i>
                        <h3 class="title" @contextmenu="disableMenu" @click.right="showMenu(branch.id)" @click="getBranch(branch.id)" >{{ branch.title }}</h3>
                        <ActionsMenu v-if="branch.isAdd" :id="branch.id" />
                        <!-- Showing the third list -->
                        <ul class="contents" v-if="branch.isShow">
                            <li v-for="branch1 in branch.branches" :key="branch1.id">
                                <i class="descIcon fa fa-sort-desc" aria-hidden="true" v-if="branch1.isShow" @click="showList(branch1.id)"></i>
                                <i class="descIcon fa fa-caret-right" aria-hidden="true" v-else @click="showList(branch1.id)"></i>
                                <h3 class="title" @contextmenu="disableMenu" @click.right="showMenu(branch1.id)" @click="getBranch(branch1.id)" >{{ branch1.title }}</h3>
                                <ActionsMenu v-if="branch1.isAdd" :id="branch1.id"/>
                                <!-- Showing the fourth list -->
                                <ul class="contents" v-if="branch1.isShow">
                                    <li v-for="branch2 in branch1.branches" :key="branch2.id">
                                        <i class="descIcon fa fa-sort-desc" aria-hidden="true" v-if="branch2.isShow" @click="showList(branch2.id)"></i>
                                        <i class="descIcon fa fa-caret-right" aria-hidden="true" v-else @click="showList(branch2.id)"></i>
                                        <h3 class="title" @contextmenu="disableMenu" @click.right="showMenu(branch2.id)" @click="getBranch(branch2.id)" >{{ branch2.title }}</h3>
                                        <ActionsMenu v-if="branch2.isAdd" :id="branch2.id"/>
                                        <!-- Showing the fifth list -->
                                        <ul class="contents" v-if="branch2.isShow">
                                            <li v-for="branch3 in branch2.branches" :key="branch3.id">
                                                <i class="descIcon fa fa-sort-desc" aria-hidden="true" v-if="branch3.isShow" @click="showList(branch3.id)"></i>
                                                <i class="descIcon fa fa-caret-right" aria-hidden="true" v-else @click="showList(branch3.id)"></i>
                                                <h3 class="title" @contextmenu="disableMenu" @click.right="showMenu(branch3.id)" @click="getBranch(branch3.id)" >{{ branch3.title }}</h3>
                                                <ActionsMenu v-if="branch3.isAdd" :id="branch3.id"/>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
        <hr>
        <button class="close" title="Close The Editor" @click ="handleShow">Close The Editor</button>
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
        ...mapActions(["getMainlist","getBranch"]),
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