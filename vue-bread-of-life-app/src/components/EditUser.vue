<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update User content -->
            <h3 class="text-center">Update User</h3>
            <form @submit.prevent="handleUpdateForm">

            <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" class="form-control" v-model="user.fullName" >
                </div>


                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="user.phone" >
                </div>


                <div id="v-model-select" class="form-group">
                         <label>Where did you hear about us?</label>
                    <select v-model="user.marketing" class="form-control" >
                        <option disabled value="">Please select one</option>
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>Twitter</option>
                        <option>Other</option>
                    </select>
                    <span> {{ selected }}</span>
                </div>



                <div id="v-model-select" class="form-group">
                    <label>What is your Vaccine Status? </label>
                    <select v-model="user.vaxRequest" class="form-control" >
                        <option disabled value="">Please select one</option>
                        <option>Pfizer</option>
                        <option>Moderna</option>
                        <option>Pfizer 2</option>
                        <option>Moderna 2</option>
                        <option>None</option>
                    </select>
                    <span>{{ selected }}</span>
                </div>

            <div id="v-model-select" class="form-group">
                     <label>Do you need more assistance?</label>
                    <select v-model="user.serviceplusRequest" class="form-control" >
                        <option disabled value="">Please select one</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <span> {{ selected }}</span>
                </div>

                <div class="form-group">
                    <label>Number of Children</label>
                    <input type="number" class="form-control" v-model="user.numChildren" >
                </div>
                
                <div id="v-model-select" class="form-group">
                    <label>Are you or anyone in the household over 65 years of age?</label>
                    <select v-model="user.seniorCheck" class="form-control" >
                        <option disabled value="">Please select one</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <span> {{ selected }}</span>
                </div>

                <div id="v-model-select" class="form-group">
                   <label>Are you a veteran?</label>
                    <select v-model="user.vetCheck" class="form-control" >
                        <option disabled value="">Please select one</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <span> {{ selected }}</span>
                </div>


                <div id="v-model-select" class="form-group">
                        <label>What is your ethnicity</label>
                    <select v-model="user.ethnicRequest" class="form-control" >
                        <option disabled value="">Please select one</option>
                        <option>White</option>
                        <option>Asian</option>
                        <option>Black</option>
                        <option>Hispanic</option>
                        <option>Native American</option>
                        <option>Multiracial</option>
                        <option>Other</option>
                    </select>
                    <span> {{ selected }}</span>
                </div> 
                <div class="form-group">
                    <label>Zip</label>
                    <input type="number" class="form-control" v-model="user.zip" >
                </div>

                <button class="btn btn-danger mt-3">Update</button>

            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            user: { }
        }
    },
    created() {
        let apiURL = `http://localhost:3000/find_user_by_id/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.user = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/patch_update_user/${this.$route.params.id}`;

            axios.patch(apiURL, this.user).then((res) => {
                console.log(res)
                this.$router.push('/View_User')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>