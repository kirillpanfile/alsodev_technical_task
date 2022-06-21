import { Server } from "miragejs";
import db from "../db/db.json";
import FoodBand from "../db/food-band.json";
import GusiLebedi from "../db/gusi-lebedi.json";
import PalkiSkalki from "../db/palki-skalki.json";
import PizzaBurger from "../db/pizza-burger.json";
import PizzaPlus from "../db/pizza-plus.json";
import Tanuki from "../db/tanuki.json";
import Parteners from "../db/partners.json";

//create a post request to the server to save user with his shipping cart

export default {
  install: () => {
    new Server({
      seeds(server) {
        server.db.loadData({
          db: db,
          FoodBand: FoodBand,
          GusiLebedi: GusiLebedi,
          PalkiSkalki: PalkiSkalki,
          PizzaBurger: PizzaBurger,
          PizzaPlus: PizzaPlus,
          Tanuki: Tanuki,
          Parteners: Parteners,
          users: [],
        });
      },
      routes() {
        // this.logging = false;
        this.namespace = "api";

        this.get("/db", (schema) => schema.db.db);
        this.get("/food-band", (schema) => schema.db.FoodBand);
        this.get("/gusi-lebedi", (schema) => schema.db.GusiLebedi);
        this.get("/palki-skalki", (schema) => schema.db.PalkiSkalki);
        this.get("/pizza-burger", (schema) => schema.db.PizzaBurger);
        this.get("/pizza-plus", (schema) => schema.db.PizzaPlus);
        this.get("/tanuki", (schema) => schema.db.Tanuki);
        this.get("/parteners", (schema) => schema.db.Parteners);
        this.get("/users", (schema) => schema.db.users);
        this.post("/users", (schema, request) => {
          let user = JSON.parse(request.requestBody);
          console.log("user", user);
          schema.db.users.insert({
            login: user.login,
            password: user.password,
            cart: user.cart,
          });
        });
      },
    });
  },
};
