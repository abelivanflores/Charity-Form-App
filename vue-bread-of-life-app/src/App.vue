<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container">
      <a class="navbar-brand" href="/">Bread of Life Management App</a>
        <div class="collapse navbar-collapse" >
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/Create_Event"
                >Create Event</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/View_Event"
                >View Events</router-link
              >
            </li>
               <li class="nav-item">
              <router-link class="nav-link" to="/Create_User"
                >Create User</router-link
              >
            </li>
                   <li class="nav-item">
              <router-link class="nav-link" to="/View_User"
                >View User</router-link
              >
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Other
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li class="nav-item">
                  <router-link class="nav-link" to="/about">About</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/chartjs"
                    >Chart Demo</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
