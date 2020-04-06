<template>
  <div class="row">
      <div class="col-md-10 offset-md-1">
          <!-- form user info -->
          <div class="card card-outline-secondary">
              <div class="card-header">
                <h3 class="mb-0">
                  ユーザー情報入力 <i class="fa fa-users"></i>
                </h3>
              </div>
              <div class="card-body">
                  <form class="form" role="form" >
                      <div class="form-group row">
                        <label for="firstname" class="col-md-3 col-form-label form-control-label">姓 <i class="fas fa-signature"></i></label>
                        <div class="col-md-9">
                          <input v-model="userData.firstName" id="firstname" class="form-control" type="text" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="lastname" class="col-md-3 col-form-label form-control-label">名 <i class="fas fa-signature"></i></label>
                        <div class="col-md-9">
                          <input v-model="userData.lastName" id="lastname" class="form-control" type="text" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="email" class="col-md-3 col-form-label form-control-label">メール <i class="fas fa-envelope"></i></label>
                        <div class="col-md-9">
                          <input v-model="userData.email" id="email" class="form-control" type="email" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="company" class="col-md-3 col-form-label form-control-label">会社 <i class="fas fa-torii-gate"></i></label>
                        <div class="col-md-9">
                          <input v-model="userData.company" id="company" class="form-control" type="text" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label form-control-label"></label>
                        <div class="col-md-9">
                          <input type="reset" class="btn btn-sm btn-outline-secondary mr-5" value="キャンセル" />
                          <input type="button" class="btn btn-sm btn-outline-primary" value="保存する" @click="formSubmit" />
                        </div>
                      </div>
                  </form>
              </div>
          </div>
          <!-- /form user info -->
      </div>
      <div id="toastInputMessage" role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="false">
        <div class="toast-header">
          <!-- <img src="..." class="rounded mr-2" alt="..."> -->
          <strong class="mr-auto">ユーザー入力 <i class="fas fa-user-plus"></i></strong>
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
</template>
<script>
import * as DBCtrl from '@/libs/DB/DBAccessCtrl'
import $ from 'jquery'
export default ({
    name: 'user-data-input',
    data() {
        return {
          userData: {
                userName    : localStorage.getItem('user-name'),
                userPassword: localStorage.getItem('user-password'),
                firstName   : "",
                lastName    : "",
                email       : "",
                company     : "",
                timeZone    : ""
            }
        }
    },
    mounted() {
        $('#toastInputMessage').on('hidden.bs.toast', function () {
          $('#v-pills-home-tab').tab('show')
        })
    },
    methods: {
        formSubmit ( ) {
            let vm = this
            let localDB = new DBCtrl.DBAccessCtrl('Local Database');
            localDB.store(this.userData)
            .then(function (result) {
                vm.$store.commit('setUsers', result)
                $('#toastInputMessage').toast('show')
            })
            .catch (function (err) {
                console.error (err);
            });
        }
    }
});
</script>
