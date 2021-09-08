// Import dotenv and run config
// eslint-disable-next-line no-unused-expressions
require('dotenv').config();

const Hapi = require('@hapi/hapi');

// Notes Plugin
const Notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');

// Users Plugin
const Users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UserValidator = require('./validator/users');

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: Users,
      options: {
        service: usersService,
        validator: UserValidator,
      },
    },
  ]);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(` 🚀 Server berjalan pada ${server.info.uri}`);
};

init();
