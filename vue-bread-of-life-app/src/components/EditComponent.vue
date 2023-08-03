<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Event content -->
            <h3 class="text-center">Update Event</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="event.firstName" required>
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

                <div class="form-group">
                    <label>Street</label>
                    <input type="text" class="form-control" v-model="event.street" required>
                </div>

                <div class="form-group">
                    <label>State</label>
                    <input type="text" class="form-control" v-model="event.state" required>
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
            event: { }
        }
    },
    created() {
        let apiURL = `http://localhost:3000/event/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.event = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/patch_update_event/${this.$route.params.id}`;

            axios.put(apiURL, this.event).then((res) => {
                console.log(res)
                this.$router.push('/view')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>