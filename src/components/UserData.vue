<template>
    <div class="table-responsive">
        <vue-simple-suggest
            v-model="chosen"
            :list="userNames"
            placeholder="工事内容を検索"
            autocomplete="off"
            :filter-by-query="true">
        </vue-simple-suggest>
        <!-- <button class="btn btn-outline-secondary mb-3" @click="getAllUser">Get Data</button> -->
        <table id="DyanmicTable" class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col"><i class="fas fa-sort-amount-down"></i></th>
                    <th scope="col">姓</th>
                    <th scope="col">名</th>
                    <th scope="col">メール</th>
                    <th scope="col">会社</th>
                    <th scope="col" class="text-center align-middle m-0 p-0">
                        <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteUser(1)">
                            削除 <i class="fas fa-user-slash"></i>
                        </button>
                    </th>

                </tr>
            </thead>
            <draggable v-model="userData" tag="tbody">
                <tr v-for="user in userData" :key="user.id">
                    <th scope="row"> {{ user.id }} </th>
                    <td contenteditable="false"> {{ user.firstname }} </td>
                    <td contenteditable="false"> {{ user.lastname }} </td>
                    <td contenteditable="false"> {{ user.email }} </td>
                    <td contenteditable="false"> {{ user.company }} </td>
                    <td class="text-center align-middle m-0 p-0">
                        <button id="editButton" type="button" class="btn btn-sm btn-outline-success mr-md-1 mr-sm-0" @click="userEdit(user.id)">
                            <i class="fa fa-user-edit"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id)">
                            <i class="fa fa-user-times"></i>
                        </button>
                    </td>
                </tr>
            </draggable>
        </table>
    </div>
</template>
<script>
    import  draggable  from  'vuedraggable' ;
    import VueSimpleSuggest from 'vue-simple-suggest'
    import 'vue-simple-suggest/dist/styles.css' // Optional CSS
    import * as DBCtrl from '@/libs/DB/DBAccessCtrl'
    export default ({
        name: 'user-data',
        components :  {
            draggable ,
            VueSimpleSuggest
        },
        data() {
            return {
                chosen: ''
            }
        },
        computed: {
            userData: {
                get: function () {
                    return this.$store.state.users
                },
                set: function (newValue) {
                    this.$store.commit('setUsers', newValue)
                }
            },
            userNames: function () {
                return this.userData.map(user => user.firstname);
            }
        },
        // watch: {
        //     userData: function(){
        //         this.userData = this.$store.state.users
        //         console.log(JSON.stringify(this.userData, null, 4));
        // }
        // },
        created() {
            var vm = this;
            let localDB = new DBCtrl.DBAccessCtrl('Local Database');
            localDB.getData()
            .then(function (result) {
                vm.userData = result;
            })
            .catch(function (err) {
                console.error(err);
            });
        },
        methods: {
            userEdit(id) {
                this.$emit('passUserId', id)
            },
            deleteUser(id) {
                let vm = this;
                let localDB = new DBCtrl.DBAccessCtrl('Local Database');
                localDB.deleteData(id)
                .then(function (result) {
                    vm.userData = result;
                })
                .catch(function (err) {
                    console.error(err);
                });
            }
        }
    });
</script>