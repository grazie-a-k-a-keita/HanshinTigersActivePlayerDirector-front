import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
// 1. Define route components.
// These can be imported from other files
import Home from "./pages/Home.vue";
import Save from "./pages/Save.vue";
import Edit from "./pages/Edit.vue";
import Delete from "./pages/Delete.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: "/", component: Home },
  { path: "/save", component: Save },
  // http://localgost:3000/players/1/edit
  {
    path: "/players/:playerId/:name/:backNumber/:birthday/:age/edit",
    component: Edit,
  },
  {
    path: "/players/:playerId/:name/:backNumber/:birthday/:age/delete",
    component: Delete,
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

// 5. Create and mount the root instance.
const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

app.mount("#app");

// Now the app has started!
