let records = [
  {
    id: 1,
    username: "jack",
    password: "$2a$10$Sm349QSlgWsjDmVv/M5aquEve0zX/5DnpH.ZrXxoZLbo4EM1WLbeC",
    firstName: "Jack",
    lastName: "Johnson",
    displayName: "Jack Johnson",
    email: "jj@applebee.org",
  },
  {
    id: 1,
    username: "nicole17",
    password: "$2a$10$Sm349QSlgWsjDmVv/M5aquEve0zX/5DnpH.ZrXxoZLbo4EM1WLbeC",
    firstName: "Nicole",
    lastName: "Linnarz",
    displayName: "Nicole Linnarz",
    email: "10976684@uvu.edu",
  },
  {
    id: 1,
    username: "ian",
    password: "$2a$10$Sm349QSlgWsjDmVv/M5aquEve0zX/5DnpH.ZrXxoZLbo4EM1WLbeC",
    firstName: "Ian",
    lastName: "Linnarz",
    displayName: "Ian Linnarz",
    email: "ilinnarz@yahoo.com",
  },
];
exports.findById = function (id, cb) {
  process.nextTick(() => {
    for (let i = 0, len = records.length; i < len; i++) {
      let record = records[i];
      if (record.id === id) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};
exports.findByUsername = function (username, cb) {
  process.nextTick(() => {
    for (let i = 0, len = records.length; i < len; i++) {
      let record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};
