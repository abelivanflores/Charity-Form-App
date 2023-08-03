<template>
  <section class="container">
    <div class="columns">
      <div class="column">
        <h3>Events Chart</h3>
        <!-- code for bargraph -->
         <UsersBar
              v-if="!loading && !error"
              :label="labels"
              :chart-data="datasets"
            ></UsersBar>
      </div>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="
                  text-6xl
                  font-bold
                  text-center text-gray-500
                  animate-pulse
                "
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
            <br />
            <br />
          </div>
  </section>
</template>

<script>
const axios = require("axios");

//importing from other file
import UsersBar from "@/components/BarChartComponent";

export default {
  name: "VueChartJS",
  components: {

    UsersBar,
  },
  data() {
    //data that'll load into x and y axis
    return {
      labels: [],
      chartData: [],
      loading: false,
      error: null,
    };
  },
  methods: {

    async fetchData() {

      try {

        this.error = null;
        this.loading = true;
        //fetching all events to display onto bar graph
        const url = `http://localhost:3000/get_all_events`;
        const response = await axios.get(url);
        //confirming length of response
        const length = response.data.length;
        console.log(length)

        //const count = Object.keys(response).length;
        //"re-organizing" - mapping json from the response
        //x and y axis code
        this.labels = response.data.map((item) => item.type);
        this.datasets = response.data.map((item) => item.zip);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>