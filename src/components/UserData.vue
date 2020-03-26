<template>
  <div class="container jumbotron">
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <!-- form user info -->
        <div class="card card-outline-secondary">
          <div class="card-header">
            <h3 class="mb-0">User Information</h3>
          </div>
          <div class="card-body">
            <form class="form" role="form" >
              <div class="form-group row">
                <label for="firstname" class="col-lg-3 col-form-label form-control-label">First name</label>
                <div class="col-lg-9">
                  <input v-model="userData.firstName" id="firstname" class="form-control" type="text" />
                </div>
              </div>
              <div class="form-group row">
                <label for="lastname" class="col-lg-3 col-form-label form-control-label">Last name</label>
                <div class="col-lg-9">
                  <input v-model="userData.lastName" id="lastname" class="form-control" type="text" />
                </div>
              </div>
              <div class="form-group row">
                <label for="email" class="col-lg-3 col-form-label form-control-label">Email</label>
                <div class="col-lg-9">
                  <input v-model="userData.email" id="email" class="form-control" type="email" />
                </div>
              </div>
              <div class="form-group row">
                <label for="company" class="col-lg-3 col-form-label form-control-label">Company</label>
                <div class="col-lg-9">
                  <input v-model="userData.company" id="company" class="form-control" type="text" />
                </div>
              </div>
              <div class="form-group row">
                <label for="user_time_zone" class="col-lg-3 col-form-label form-control-label">Time Zone</label>
                <div class="col-lg-9">
                  <select v-model="userData.timeZone" id="user_time_zone" class="form-control" size="0">
                    <option value="Hawaii">(GMT-10:00) Hawaii</option>
                    <option value="Alaska">(GMT-09:00) Alaska</option>
                    <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                    <option value="Arizona">(GMT-07:00) Arizona</option>
                    <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                    <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                    <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                    <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="username" class="col-lg-3 col-form-label form-control-label">Username</label>
                <div class="col-lg-9">
                  <input v-model="userData.userName" id="username" class="form-control" type="text" />
                </div>
              </div>
              <div class="form-group row">
                <label for="password" class="col-lg-3 col-form-label form-control-label">Password</label>
                <div class="col-lg-9">
                  <input v-model="userData.userPassword" id="password" class="form-control" type="password" />
                </div>
              </div>
              <div class="form-group row">
                <label for="confirm_password" class="col-lg-3 col-form-label form-control-label">Confirm Password</label>
                <div class="col-lg-9">
                  <input id="confirm_password" class="form-control" type="password" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label"></label>
                <div class="col-lg-9">
                  <input type="reset" class="btn btn-secondary mr-5" value="Cancel" />
                  <input type="button" class="btn btn-primary" value="Save Changes" @click="formSubmit" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- /form user info -->
      </div>
    </div>
  </div>
</template>
<script>
import Dexie from 'dexie'
export default ({
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
    methods: {
        formSubmit ( ) {
            let dexieDB = new Dexie('LocalDB')
            console.log(dexieDB);
            console.log(dexieDB.version);
            console.log(dexieDB.version(1));
            console.log(dexieDB.version(1).stores);

            dexieDB.version(1).stores({
                userInfo: "firstname, lastname, email, company"
            });
            console.log(dexieDB.userInfo);
            dexieDB.userInfo.add([{

                'firstname': this.userData.firstName,
                'lastName': this.userData.lastName,
                'email': this.userData.email,
                'company': this.userData.company
            },
            {

                'firstname': this.userData.firstName,
                'lastName': this.userData.lastName,
                'email': this.userData.email,
                'company': this.userData.company
            }]
            );
            const allUserInfo = dexieDB.userInfo.toArray();
            console.log(allUserInfo)
        }
    }
});
</script>
