<template>
    <section class="container-fluid">
        <div class="row">
            <div class="col-sm-3">
                <div class="nav flex-sm-column nav-pills align-middle text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                    <a class="nav-link" id="v-pills-input-tab" data-toggle="pill" href="#v-pills-input" role="tab" aria-controls="v-pills-input" aria-selected="false">Input</a>
                    <a class="nav-link" id="v-pills-edit-tab" data-toggle="pill" href="#v-pills-edit" role="tab" aria-controls="v-pills-edit" aria-selected="false">Edit</a>
                    <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                </div>
            </div>
            <div class="col-sm-9">
                <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    <user-data @passUserId="sendUserId"></user-data>
                </div>
                <div class="tab-pane fade" id="v-pills-input" role="tabpanel" aria-labelledby="v-pills-input-tab">
                    <user-data-input></user-data-input>
                </div>
                <div class="tab-pane fade" id="v-pills-edit" role="tabpanel" aria-labelledby="v-pills-edit-tab">
                    <user-data-edit :editUserId="editUserId"></user-data-edit>
                </div>
                <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
@import '../assets/styles/index.css';
</style>
<script>
    import UserData from './UserData'
    import UserDataInput from './UserDataInput'
    import UserDataEdit from './UserDataEdit'
    import $ from 'jquery'
    require('@/assets/styles/index.css')
    export default ({
        name: 'index',
        components: {
            UserData
            ,UserDataInput
            ,UserDataEdit
        },
        data() {
            return {
                allUsers: [],
                editUserId: ''
            }
        },
        methods: {
            sendUserId(id) {
                this.editUserId = id;
                $('#v-pills-edit-tab').tab('show')
            }
        }
    });
</script>