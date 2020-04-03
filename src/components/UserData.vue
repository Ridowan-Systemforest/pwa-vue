<template>
    <div class="row">
        <div class="col-md-12">
            <!-- <button class="btn btn-outline-secondary mb-3" @click="getAllUser">Get Data</button> -->
            <table id="DyanmicTable" class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">姓</th>
                        <th scope="col">名</th>
                        <th scope="col">メール</th>
                        <th scope="col">会社</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in userData" :key="user.id">
                        <th scope="row"> {{ user.id }} </th>
                        <td contenteditable="false"> {{ user.firstname }} </td>
                        <td contenteditable="false"> {{ user.lastname }} </td>
                        <td contenteditable="false"> {{ user.email }} </td>
                        <td contenteditable="false"> {{ user.company }} </td>
                        <td>
                            <button id="editButton" type="button" class="btn btn-sm btn-outline-success mr-md-1" @click="userEdit(user.id)">
                                <i class="fa fa-user-edit"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id)">
                                <i class="fa fa-user-times"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import * as DBCtrl from '@/libs/DB/DBAccessCtrl'
    export default ({
        name: 'user-data',
        data() {
            return {
                // userData: []
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