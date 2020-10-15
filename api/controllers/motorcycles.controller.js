const methods = {
  getMotorcycles(request, response) {
    response.send("Endpoint GET Motorcycles");
  },

  saveMotorcycle(request, response) {
    response.send("Endpoint POST Motorcycle");
  },

  updateMotorcycle(request, response) {
    response.send("Endpoint PUT Motorcycle");
  },

  deleteMotorcycle(request, response) {
    response.send("Endpoint DELETE Motorcycle");
  },
};

module.exports = methods;
