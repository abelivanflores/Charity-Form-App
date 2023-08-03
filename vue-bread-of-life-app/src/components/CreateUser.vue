<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create User</h3>
            <form @submit.prevent="handleSubmitForm">


                <!-- Applicant's Name-->
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" class="form-control" v-model="user.fullName" required>
                </div>

                <!-- Applicant's Phone-->
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="user.phone" required>
                </div>

                <!-- Applicant's Way of hearing about Bread Of Life-->
                <div id="v-model-select" class="form-group">
                         <label>Where did you hear about us?</label>
                    <select v-model="user.marketing" class="form-control" required>
                        <option disabled value="">Please select one</option>
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>Twitter</option>
                        <option>Other</option>
                    </select>
                    <span> {{ selected }}</span>
                </div>


                <!-- Applicant's Vaccine Status-->
                <div id="v-model-select" class="form-group">
                    <label>What is your Vaccine Status? </label>
                    <select v-model="user.vaxRequest" class="form-control" required>
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
                    <select v-model="user.serviceplusRequest" class="form-control" required>
                        <option disabled value="">Please select one</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <span> {{ selected }}</span>
                </div>

                <!-- Applicant states how many children they have-->
                <div class="form-group">
                    <label>Number of Children</label>
                    <input type="number" class="form-control" v-model="user.numChildren" required>
                </div>

                <div id="v-model-select" class="form-group">
                    <label>Are you or anyone in the household over 65 years of age?</label>
                    <select v-model="user.seniorCheck" class="form-control" required>
                        <option disabled value="">Please select one</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <span> {{ selected }}</span>
                </div>

                <div id="v-model-select" class="form-group">
                   <label>Are you a veteran?</label>
                    <select v-model="user.vetCheck" class="form-control" required>
                        <option disabled value="">Please select one</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <span> {{ selected }}</span>
                </div>

                <!-- Applicant's ethnicity-->
                <div id="v-model-select" class="form-group">
                        <label>What is your ethnicity</label>
                    <select v-model="user.ethnicRequest" class="form-control" required>
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
                    <input type="number" class="form-control" v-model="user.zip" required>
                </div>





                <!-- This will check for errors -->
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }} </li>
                    </ul>
                </p>
                <button class="btn btn-danger mt-3">Create</button>
            </form>
        </div>
    </div>
</template>



 <!-- Axios will collect the data input but the user which will be then submitted to our backend via our API route-->
<script>
    import axios from "axios";

    export default {
        data() {
            return {
                errors: [],
               user: {
                fullName: '',
                phone: '',
                marketing: '',
                vaxRequest: '',
                serviceplusRequest: '',
                numChildren: '',
                seniorCheck: '',
                vetCheck: '',
                ethnicRequest: '',
                zip: ''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                //first validation
                this.errors = [];



                let apiURL = 'http://localhost:3000/new_user';

                axios.post(apiURL, this.user).then(() => {
                    //changing the view to the list
                  this.$router.push('/View_User')
                  this.user = {
                    user: {
                    fullName: '',
                    phone: '',
                    marketing: '',
                    vaxRequest: '',
                    serviceplusRequest: '',
                    numChildren: '',
                    seniorCheck: '',
                    vetCheck: '',
                    ethnicRequest: '',
                    zip: ''

                  }
                }}).catch(error => {
                    this.errors.push("Error in form submission. " + error.response.data);

                });
            }
        }

    }
</script>
