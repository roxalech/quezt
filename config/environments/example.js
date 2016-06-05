module.exports = {
  port: 3000,
  hostname: "127.0.0.1",
  baseUrl: 'http://localhost:3000',
  mongodb: {
    uri: "mongodb://localhost/quezt_db"
  },
  app: {
    name: "study-buddy"
  },
  session: {
    type: 'mongo',                          // store type, default `memory`
    secret: 'sTudDyBuDdyS30r3tH3r3',
    resave: false,                          // save automatically to session store
    saveUninitialized: true                 // saved new sessions
  },
  nunjucks: {
    cache: false,
    watch: true
  }
};