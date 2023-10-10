let dbConnects;
/**
 *
 * This module exports a function  which registers users by using
 * the specified injectedUserDBHelper.
 *
 * @param injectedMySqlConnection - this object handles the execution of sql
 * related database operation such as storing them when they register
 *
 * @return {{registerUser: registerUser, login: *}}
 */
module.exports = (injectedMySqlConnection) => {
  dbConnects = injectedMySqlConnection;
  return {
    gethrdatadb: getHRDataInDB,
    getqrinfodb: getQRInfoInDB,
  };
};

function getHRDataInDB(callback) {
  try {
    const queryString = `SELECT * FROM [PHOFacility].[dbo].[tbl_HR]`;
    const results = dbConnects.query(queryString);
    results
      .then((result) => {
        var resp = createDataResponseObject(false, result);
        callback(resp);
      })
      .catch((error) => {
        var resp = createDataResponseObject(false, error);
        callback(resp);
      });
  } catch (error) {
    console.error(error);
  }
}

function getQRInfoInDB(qrCode, callback) {
  try {

    const params = {
        qrCode: qrCode
    };

    const queryString = `sp_QRInformation`;
    const results = dbConnects.executeStoredProcedure(queryString, params);
    results
      .then((result) => {
        var resp = createDataResponseObject(false, result);
        callback(resp);
      })
      .catch((error) => {
        var resp = createDataResponseObject(false, error);
        callback(resp);
      });
  } catch (error) {
    console.error(error);
  }
}

function createDataResponseObject(error, results) {
  return {
    error: error,
    results: results === undefined ? null : results === null ? null : results,
  };
}
