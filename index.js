const express = require('express');
const cors = require('cors');
const error = require('./middlewares/error');
const app = express();
const port = 3001;
const routes = require('./routes');
const { validateJWT } = require('./middlewares');
app.use(express.json());
app.use(cors());
app.use('/events', routes.events);
app.use('/customers', validateJWT, routes.customers);
app.use('/payments', validateJWT, routes.payments);
app.use('/users', routes.users);
app.use('/reports', routes.reports);
app.use(error);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
