<template>
  <div class="container jumbotron">
    <div class="row">
        <div class="col-md-6 col-sm-12">
            <div class="sidenav">
                <img alt="Vue logo" src="../assets/logo.png" />
                <div class="text-white">
                    <h2>
                        <span class="glow0">アプリ</span>
                        <br />
                        グインページ
                    </h2>
                    <p>ログインと登録はこちらです。</p>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-sm-12">
            <div class="mt-5">
                <form>
                    <div class="form-group">
                        <label>ユーザー名</label>
                        <input v-model="userInfo.userName" type="text" class="form-control" placeholder="ユーザー名..." />
                    </div>
                    <div class="form-group">
                        <label>パスワード</label>
                        <input v-model="userInfo.userPassword" type="password" class="form-control" placeholder="パスワード..." />
                    </div>
                    <button type="submit" class="btn btn-primary" @click="userLogin">ログイン</button>
                    <button type="submit" class="btn btn-secondary ml-5" @click="userRegister">登録</button>
                </form>
            </div>
        </div>
    </div>
    <div id="snackbar">ユーザー名とパスワードを入力してください。</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        userName    : "",
        userPassword: ""
      }
    }
  },
  methods: {
      userLogin () {

          if(this.userInfo.userName === localStorage.getItem('user-name') && this.userInfo.userPassword === localStorage.getItem('user-password')) {
              this.$router.replace('/UserData')
          } else {
              let snackbar = document.getElementById("snackbar");
              snackbar.innerHTML = '有効なユーザー名とパスワードを入力してください。'
              snackbar.className = "show";
              setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
          }


      },
      userRegister () {
          let snackbar = document.getElementById("snackbar");
          if(this.userInfo.userName && this.userInfo.userPassword) {
              localStorage.setItem('user-name',this.userInfo.userName)
              localStorage.setItem('user-password',this.userInfo.userPassword)
              snackbar.innerHTML = 'ユーザー名とパスワードが保存されました。'
          } else {
              snackbar.innerHTML = 'ユーザー名とパスワードを入力してください。'
          }
          snackbar.className = "show";
          setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
      },
  }
};
</script>

<style>
    body {
        font-family: "Lato", sans-serif;
    }

    .sidenav {
        height: 100%;
        background-color: #000;
        overflow-x: hidden;
        padding-top: 20px;
    }


#snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 2px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 50%; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible; /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
.glow {
  font-size: 80px;
  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
}
</style>
