const sqlConfig = {
  user: "LAPTOP-1F9S9B0Cmanny_webdev",
  password: "",
  server: "localhost",
  database: "PHOFacility",
  options: {
    trustedConnection: true,
    enableArithAbort: true,
  },
};

const sql = require("mssql/msnodesqlv8");
const pool = new sql.ConnectionPool(sqlConfig);

module.exports = {
  connect: async () => {
    try {
      await pool.connect();
      console.log("Connected to the database using Windows Authentication.");
    } catch (err) {
      console.error("Database connection failed:", err);
    }
  },
  pool,
  query: async (queryString) => {
    try {
      await pool.connect();
      const request = pool.request();

      const result = await request.query(queryString);
      return result.recordset;
    } catch (err) {
      console.error("SQL query error:", err);
      throw err;
    }
  },
  executeStoredProcedure: async (procedureName, params) => {
    try {
      await pool.connect();
      const request = pool.request();

      if (params) {
        for (const paramName in params) {
          if (params.hasOwnProperty(paramName)) {
            request.input(paramName, params[paramName]);
          }
        }
      }

      const result = await request.execute(procedureName);
      return result.recordset;
    } catch (err) {
      console.error("Stored procedure execution error:", err);
      throw err;
    }
  },
};
