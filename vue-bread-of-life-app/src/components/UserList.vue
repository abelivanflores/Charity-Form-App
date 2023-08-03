/* /* Populates all the users in the db using the get_all_users api
give two links to edit and delete
 */ */
<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Marketing</th>
                        <th>Vaccine</th>
                        <th>Additional Service?</th>
                        <th>Children</th>
                        <th>Senior Check</th>
                        <th>Veteran</th>
                        <th>Ethnicity</th>
                        <th>Zip</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user._id">
                        <td>{{ user.fullName }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.marketing }}</td>
                        <td>{{ user.vaxRequest }}</td>
                        <td>{{ user.serviceplusRequest }}</td>
                        <td>{{ user.numChildren }}</td>
                        <td>{{ user.seniorCheck }}</td>
                        <td>{{ user.vetCheck }}</td>
                        <td>{{ user.ethnicRequest }}</td>
                        <td>{{ user.zip }}</td>
                        <td>
                            <router-link :to="{name: 'Edit_User', params: { id: user._id }}" class="btn btn-success ">Edit
                            </router-link> 
                            <button @click.prevent="deleteUser(user._id)" class="btn btn-danger mx-2">Delete</button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                users: []
            }
        },
        // this is using created hook 
        created() {
            let apiURL = 'http://localhost:3000/get_all_users';
            axios.get(apiURL).then(res => {
                this.users = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        //delete button uses the reference id of the user to select which one  
        //to delete but askes if they really want to delete
        methods: {
            deleteUser(id){
                console.log(id)
                let apiURL = `http://localhost:3000/delete_users/${id}`;
                let indexOfArrayItem = this.users.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.users.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>



<style>
    .btn-success {
        margin-right: 10px;
    }
</style>
