/* Creates a form matching the create event but doesn't have required so 
parts of it can be edited without editting all of it

 */
<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Event content -->
            <h3 class="text-center">Update Event</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="event.name" >
                </div>

                <div id="v-model-select" class="form-group">
                    <select v-model="event.type" class="form-control" >
                        <option disabled value="">Please select one</option>
                        <option>Disaster Relief</option>
                        <option>Homeless Outreach</option>
                        <option>Anti-hunger Campaign</option>
                        <option>Health Outcomes</option>
                    </select>
                    <span>Type: {{ selected }}</span>
                </div>

                <div class="form-group">
                    <label>Street</label>
                    <input type="text" class="form-control" v-model="event.street" >
                </div>

                <div class="form-group">
                    <label>State</label>
                    <input type="text" class="form-control" v-model="event.state" >
                </div>

                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="event.city" >
                </div>
                <div class="form-group">
                    <label>Zip</label>
                    <input type="number" class="form-control" v-model="event.zip" >
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" class="form-control" v-model="event.date" >
                </div>

                <button class="btn btn-danger mt-3">Update</button>

            </form>
        </div>
    </div>
</template>
/* once the users hits the edit button they sent to a page with the reference id 
of the event thats used to edit that particular event
then is redirected by to the view_event page to see their changes
 */
<script>
import axios from "axios";

export default {
    data() {
        return {
            event: { }
        }
    },
    created() {
        let apiURL = `http://localhost:3000/find_event_by_id/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.event = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/patch_update_event/${this.$route.params.id}`;

            axios.patch(apiURL, this.event).then((res) => {
                console.log(res)
                this.$router.push('/View_Event')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>