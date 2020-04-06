<template>
  <div class="row">
      <div class="col-md-10 offset-md-1">
          <!-- form user info -->
          <div class="card card-outline-secondary">
              <div class="card-header">
                  <h3 class="mb-0">
                      ユーザー情報編集 <i class="fa fa-user-edit"></i>
                      <select id="idselect" class="custom-select ml-3 w-auto" v-model="userID" @change="changeUser">
                        <option v-for="id in allUserID" v-bind:key="id" v-bind:value="id">{{ allUserMap.get(id).firstname }}</option>
                    </select>
                  </h3>
              </div>
              <div class="card-body">
                  <form class="form" role="form" >
                      <div class="form-group row">
                        <label for="firstname-edit" class="col-md-3 col-form-label form-control-label">姓 <i class="fas fa-signature"></i></label>
                        <div class="col-md-9">
                          <input v-model="user.firstname" id="firstname-edit" class="form-control" type="text" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="lastname-edit" class="col-md-3 col-form-label form-control-label">名 <i class="fas fa-signature"></i></label>
                        <div class="col-md-9">
                          <input v-model="user.lastname" id="lastname-edit" class="form-control" type="text" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="email-edit" class="col-md-3 col-form-label form-control-label">メール <i class="fas fa-envelope"></i></label>
                        <div class="col-md-9">
                          <input v-model="user.email" id="email-edit" class="form-control" type="email" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="company-edit" class="col-md-3 col-form-label form-control-label">会社 <i class="fas fa-torii-gate"></i></label>
                        <div class="col-md-9">
                          <input v-model="user.company" id="company-edit" class="form-control" type="text" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label form-control-label"></label>
                        <div class="col-md-9">
                          <input type="reset" class="btn btn-sm btn-outline-secondary mr-5" value="キャンセル" />
                          <input type="button" class="btn btn-sm btn-outline-success" value="保存する" @click="formSubmit" />
                        </div>
                      </div>
                  </form>
              </div>
          </div>
          <!-- /form user info -->
          <div id="toastEditMessage" role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="false">
              <div class="toast-header">
                  <!-- <img src="..." class="rounded mr-2" alt="..."> -->
                  <strong class="mr-auto">ユーザー編集 <i class="fas fa-user-plus"></i></strong>
                  <small class="text-muted">1 sec ago</small>
                  <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="toast-body">
                ユーザーデータが保存されました。
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import * as DBCtrl from '@/libs/DB/DBAccessCtrl'
import $ from 'jquery'
export default ({
    name: 'user-data-edit',
    props: ['editUserId'],
    data() {
        return {
            polling: null,
            userID: null,
        }
    },
    mounted () {
        $('#toastEditMessage').on('hidden.bs.toast', function () {
            $('#v-pills-home-tab').tab('show');
        })
        this.userID = this.allUserID[0];
        // this.user = this.allUserMap.get(this.userID);
        // this.getUser();
    },
    computed: {
        userData: {
            get: function () {
                return this.$store.getters.getUsers;
            },
            set: function (newValue) {
                this.$store.commit('setUsers', newValue)
            }
        },
        allUserMap () {
            return new Map(this.userData.map(user => [user.id, user]));
        },
        allUserID () {
            return Array.from( this.allUserMap.keys() );
        },
        user () {
            return this.allUserMap.get(this.userID);
        }
    },
    watch: {
        editUserId: function(oldValue, newValue){
            console.log('old: ', oldValue, 'new: ', newValue);
            this.userID = this.editUserId;
        }
    },
    methods: {
        getUser() {
            let vm = this
            this.polling = setInterval(() => {
                vm.allUserMap = new Map(vm.userData.map(user => [user.id, user]));
                vm.allUserID = Array.from( vm.allUserMap.keys() );
                //Initialize
                vm.userID = vm.editUserId ? vm.editUserId : vm.allUserID[0]
                vm.user = JSON.parse(JSON.stringify(vm.allUserMap.get(vm.userID)));
                clearInterval(vm.polling)
              }, 1000)
        },
        changeUser () {
            this.user = this.allUserMap.get(this.userID);
        },
        formSubmit ( ) {
            console.log(Object.keys(this.userID).some(key => this.userID[key].dirty));

            let preUser = this.allUserMap.get(this.userID);
            let curUser = this.user;
            console.log('pre:', JSON.stringify(preUser, null, 2));
            console.log('cur:', JSON.stringify(curUser, null, 2));

            if (preUser.firstname === curUser.firstname)
                delete curUser.firstname;
            if (preUser.lastname === curUser.lastname)
                delete curUser.lastname;
            if (preUser.email === curUser.email)
                delete curUser.email;
            if (preUser.company === curUser.company)
                delete curUser.company;
            if(Object.keys(curUser).length > 1) {
                let vm = this
                let localDB = new DBCtrl.DBAccessCtrl('Local Database');
                localDB.updateData(vm.user)
                .then(function (result) {
                    vm.userData = result;
                    $('#toastEditMessage').toast('show');
                })
                .catch (function (err) {
                    console.error (err);
                });
            } else {
                console.log("Nothing to update:", JSON.stringify(this.user));

            }

        }
    }
});
</script>
