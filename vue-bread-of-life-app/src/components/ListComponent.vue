<template>
    <div class="row">
        <!-- made search class to hold input box -->
        <div class="input-search">

        <input type="text" placeholder="Search by Event Type..." v-model=search>
        </div>

        <div class="col-md-12">

            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Street</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Zip</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <!--event in returnedEvents(created below)iterates through events -->
                    <tr v-for="event in returnedEvents" v-bind:key="event._id">
                        <td>{{ event.name }}</td>
                        <td>{{ event.type }}</td>
                        <td>{{ event.street }}</td>
                        <td>{{ event.state }}</td>
                        <td>{{ event.city }}</td>
                        <td>{{ event.zip }}</td>
                        <td>{{ event.date }}</td>
                        <td>
 <!--                            <router-link :to="{name: 'edit', params: { id: event._id }}" class="btn btn-success ">Edit
                            </router-link> -->
<!--                             <router-link :to="{name: 'grades', params: { id: event.street }}" class="btn btn-info">Grades
                            </router-link> -->
<!--                         <button @click.prevent="deleteEvent(event._id)" class="btn btn-danger mx-2">Delete</button>
 -->                        </td>
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
                events: null,
                search: ''
            }
        },
        // this is using created hook
        created() {
            let apiURL = 'http://localhost:3000/get_all_events';
            axios.get(apiURL).then(res => {
                this.events = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteEvent(id){
                console.log(id)
                let apiURL = `http://localhost:3000/delete_events/${id}`;
                let indexOfArrayItem = this.events.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.events.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        },
        mounted(){
            axios
            .get('http://localhost:3000/get_all_events')
            .then(res =>{
                this.events = res.data;
            })
            .catch(error => console.log(error))





        },
        computed:{

            returnedEvents: function(){
                var returnedEvents = this.events;
                console.log(returnedEvents)
                var searchFilter = this.search;
                //if searchFilter is empty then it returns all the events //
                if(!searchFilter){
                    return returnedEvents;
                }else {
                    //else filter by input characters, dynamically changes view
                searchFilter = searchFilter.trim().toLowerCase();
                //filters by event type//
                returnedEvents = returnedEvents.filter(function(item){
                    if(item.name.toLowerCase().indexOf(searchFilter)!== -1){
                        return item;
                    }
                })

                }

                return returnedEvents;
            }




        }




    }
</script>



<style>
    .btn-success {
        margin-right: 10px;
    }
    /* styling for search box */
    .input-search{
        border-radius: 5px;
        }
    .input-search input{
        font-size: 18px;
        background: transparent;

    }
</style>
