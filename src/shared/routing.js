class Routing {
  #routes = [];

  add(routes) {
    this.#routes = this.#routes.concat(routes);
  }

  all() {
    return this.#routes;
  }
}

module.exports = new Routing();
