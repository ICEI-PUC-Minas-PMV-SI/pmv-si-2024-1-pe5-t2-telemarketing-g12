const Express = require('express');
const app = Express();
const cors = require('cors');
const morgan = require('morgan');
const { Sequelize } = require('sequelize');

const { port, dbUrlConnection } = require('./config');

const AuthorizationRoutes = require('./authorization/routes');
const UserRoutes = require('./users/routes');
const ProductRoutes = require('./products/routes');
const ClientRoutes = require('./clients/routes');
const TicketRoutes = require('./tickets/routes');
const CompanyRoutes = require('./companies/routes');

const UserModel = require('./models/User');
const ProductModel = require('./models/Product');
const ClientModel = require('./models/Client');
const TicketModel = require('./models/Ticket');
const CompanyModel = require('./models/Company');

app.use(morgan('tiny'));
app.use(cors());
app.use(Express.json());

const sequelize = new Sequelize(dbUrlConnection);

UserModel.initialise(sequelize);
ProductModel.initialise(sequelize);
ClientModel.initialise(sequelize);
TicketModel.initialise(sequelize);
CompanyModel.initialise(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log('Sequelize Ready');

    app.use('/', AuthorizationRoutes);
    app.use('/user', UserRoutes);
    app.use('/product', ProductRoutes);
    app.use('/client', ClientRoutes);
    app.use('/ticket', TicketRoutes);
    app.use('/company', CompanyRoutes);

    app.listen(port, () => {
      console.log('Server Listening on PORT:', port);
    });
  })
  .catch((err) => {
    console.error('Sequelize threw an error:', err);
  });
