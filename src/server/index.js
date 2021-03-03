const Koa = require('koa');
const IO = require('koa-socket-2');
var cors = require('cors')

const app = new Koa();
// IF YOU WANT TO USE CORS
app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

const io = new IO();

io.attach(app);

io.on('connection', ctx => {
  console.log('[server] connected');
});

let usernames = [];
io.on('disconnect', ctx => {
  const { username } = ctx.socket;
  if (username) {
    console.log(`[server] disconnected: ${username}`);
    usernames = usernames.filter(u => u !== username)
  }
});

io.on('login', (ctx, { username }) => {
  console.log(`[server] login: ${username}`);
  usernames.push(username);
  ctx.socket.username = username;

  io.broadcast('users.login', { username });
});

io.on('logout', ctx => {
  const { username } = ctx.socket;
  if (username) {
    console.log(`[server] logout: ${username}`);
    usernames = usernames.filter(u => u !== username)
    delete ctx.socket['username'];

    io.broadcast('users.logout', { username });
  }
});

let messages = [];
io.on('message', (ctx, { text }) => {
  console.log(`[server] message: ${text}`);
  const message = {
    id: messages.length,
    text,
    username: ctx.socket.username,
  };
  messages.push(message);

  io.broadcast('messages.new', { message });
});

app.listen(4000, () => {
  console.log(  `🚀💪🐞🥂 🐼💳💎 🛳  🦁 🍰 🏅 🔜 Server ready at http://localhost:${4000}`);
});
