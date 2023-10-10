let db;

module.exports = (injectedDBAccess) => {
  db = injectedDBAccess;

  return {
    gethrdata: getHRData,
    getqrinfo: getQRInfo,
  };
};

function getHRData(req, res) {
  try {
    db.gethrdatadb((dataResponseObject) => {
      const message =
        dataResponseObject.error === null ? "Successful" : "Failed";
      if (!dataResponseObject.error) {
        res.send(dataResponseObject.results);
      } else {
        sendErrorResponse(res, message, dataResponseObject.error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function getQRInfo(req, res) {
    try {
      db.getqrinfodb(req.body.qrCode, (dataResponseObject) => {
        const message =
          dataResponseObject.error === null ? "Successful" : "Failed";
        if (!dataResponseObject.error) {
          res.send(dataResponseObject.results);
        } else {
          sendErrorResponse(res, message, dataResponseObject.error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

function sendErrorResponse(res, message, error) {
  logger.error(
    "apiMethods: sendErrorResponse: Message: " +
      message +
      "; Error: " +
      error
  );
  res.status(error !== null ? (error !== null ? 400 : 400) : 200).json({
    message: message,
    error: error,
  });
}
