const express = require('express');
const cors = require('cors');

const actionsRouter = require('./routers/actions-router');
const projectsRouter = require('./routers/projects-router');

const server = express();
const PORT = 4050;

server.use(express.json(), cors());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.listen(PORT, () =>
  console.log(`Server up and running on port: ${PORT}`)
);
