<template>
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: darkgray;">
  <a class="navbar-brand" href="#">KDT-MultiCampus BootCamp(feat. with jslim)</a>

  <ul class="navbar-nav mr-auto" >
	<li class="nav-item active">
      <router-link class="nav-link" :to="{name : 'Home'}" style="background-color: darkgray;">Home <span class="sr-only">(current)</span></router-link>
    </li>
    <li class="nav-item active">
      <router-link class="nav-link" :to="{name : 'Todos'}" style="background-color: darkgray;">Todos <span class="sr-only">(current)</span></router-link>
    </li>
    <li class="nav-item active">
      <router-link class="nav-link" :to="{name : 'Login'}" style="background-color: darkgray;">Login <span class="sr-only">(current)</span></router-link>
    </li>
 
  </ul>
</nav>
  <router-view></router-view>
</template>

<script>
export default {
  setup() {},
};
</script>

<style></style>
