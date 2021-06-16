export default {
  db: {
    url: "mongodb://localhost:27017/tda-local"
  },
  session: {
    cookie: {
      secure: true,
      maxAge: false //24 * 60 * 60 * 1000 // 24 hours
    }
  },
  secret: "todoapp",
  log: {
    level: "debug"
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000 // One year
  },
  port: 7000,
  url: {
    baseUrl: "http://localhost:3000",
    fileUrl: "http://localhost:3000",
  },
};

