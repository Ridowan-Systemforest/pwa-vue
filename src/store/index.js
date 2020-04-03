import Vue from "vue";
import Vuex from "vuex";
import * as DBCtrl from '@/libs/DB/DBAccessCtrl'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
       users :[]
    },
    getters: {
        userData : state => {
            let localDB = new DBCtrl.DBAccessCtrl('Local Database');
            localDB.getData()
            .then(function (result) {
                state.users = result
                return state.users;
            })
            .catch(function (err) {
                console.error(err);
            });
        }
    },
    mutations: {
        setUsers (state, newValue) {
            state.users = newValue;
          }
    },
    actions: {}
})