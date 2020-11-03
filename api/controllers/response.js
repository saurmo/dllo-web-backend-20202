module.exports = {
  success(response, { message, info, metainfo }) {
    let responseJSON = { message, info, metainfo };
    responseJSON.ok = true;
    return response.send(responseJSON);
  },
  error(response, config) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = config.message;
    responseJSON.info = config.info;
    return response.status(400).send(responseJSON);
  },
};
