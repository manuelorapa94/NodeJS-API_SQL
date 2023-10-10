const dbConnects = require("./api/db.js");
const dbAccess = require("./api/database-helper.js")(dbConnects);

const oAuth2Server = require("node-oauth2-server");

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// app.oauth = oAuth2Server({
//   model: oAuthModel,
//   grants: ["password"],
//   debug: true,
// });

app.use(express.json());

// app.get("/phofacility", (req, res) => {
//   res.send("Welcome to your SQL Server API");
// });

const publicAreaRoutesMethods = require("./endpoints/apiMethods.js")(dbAccess);
const publicAreaRoutes = require("./endpoints/apiRoutes.js")(
  express.Router(),
  publicAreaRoutesMethods
);

//set public routes to access pos data
app.use('/phofacility', publicAreaRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`🚀 Server ready at http://localhost:3000/apis`);
});

