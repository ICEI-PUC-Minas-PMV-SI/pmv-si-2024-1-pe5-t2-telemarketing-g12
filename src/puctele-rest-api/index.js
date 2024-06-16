const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

const { port } = require("./config");
const PORT = process.env.PORT || port;

const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");
const ProductRoutes = require("./products/routes");
const ClientRoutes = require("./clients/routes");
const TicketRoutes = require("./tickets/routes");
const CompanyRoutes = require("./companies/routes");

const UserModel = require("./models/User");
const ProductModel = require("./models/Product");
const ClientModel = require("./models/Client");
const TicketModel = require("./models/Ticket");
const CompanyModel = require("./models/Company");

app.use(morgan("tiny"));
app.use(cors());
app.use(Express.json());

const sequelize = new Sequelize('postgres://pucadmin:redes20204@127.0.0.1:5432/telepucdatabase');

UserModel.initialise(sequelize);
ProductModel.initialise(sequelize);
ClientModel.initialise(sequelize);
TicketModel.initialise(sequelize);
CompanyModel.initialise(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Ready");

    app.use("/", AuthorizationRoutes);
    app.use("/user", UserRoutes);
    app.use("/product", ProductRoutes);
    app.use("/client", ClientRoutes);
    app.use("/ticket", TicketRoutes);
    app.use("/company", CompanyRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("Sequelize threw an error:", err);
  });
  