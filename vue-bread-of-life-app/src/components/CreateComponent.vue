<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Event</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Event Name</label>
                    <input type="text" class="form-control" v-model="event.name" required>
                </div>
                <div id="v-model-select" class="form-group">
                    <select v-model="event.type" class="form-control" required>
                        <option disabled value="">Please select one</option>
                        <option>Disaster Relief</option>
                        <option>Homeless Outreach</option>
                        <option>Anti-hunger Campaign</option>
                        <option>Health Outcomes</option>
                    </select>
                    <span>Type: {{ selected }}</span>
                </div>

<!--                 <div class="form-group">
                    <label>Type</label>
                    <input type="text" class="form-control" v-model="event.type" required>
                </div> -->

                <div class="form-group">
                    <label>Street</label>
                    <input type="text" class="form-control" v-model="event.street" required>
                </div>

                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="event.city" required>
                </div>

                <div class="form-group">
                    <label>State</label>
                    <input type="text" class="form-control" v-model="event.state" required>
                </div>

                <div class="form-group">
                    <label>Zip</label>
                    <input type="number" class="form-control" v-model="event.zip" required>
                </div>

                <div class="form-group">
                    <label>Date</label>
                    <input type="date" class="form-control" v-model="event.date" required>
                </div>

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

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                errors: [],
                event: {
                   name: '',
                   type: '',
                   street: '',
                   state: '',
                   city: '',
                   zip: '',
                   date: ''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                //first validation
                this.errors = [];

                if (!this.event.date) {
                    this.errors.push("Date is required.");
                }
    
                let apiURL = 'http://localhost:3000/new_event';
                
                axios.post(apiURL, this.event).then(() => {
                    //changing the view to the list
                  this.$router.push('/view')
                  this.event = {
                    name: '',
                    type: '',
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    date: ''
                  }
                }).catch(error => {
                    this.errors.push("Error in form submission. " + error.response.data);
                    
                });
            }
        }
           
    }
</script>

