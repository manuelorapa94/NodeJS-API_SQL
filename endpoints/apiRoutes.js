module.exports = (router, publicAreaRoutesMethods) => {
  //route for entering into the restricted area.

  // Sample API
  router.get("/getHR", publicAreaRoutesMethods.gethrdata);

  // Get QR Information
  router.get("/getQRInformation", publicAreaRoutesMethods.getqrinfo);

  return router
};
