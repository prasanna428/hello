const { books } = require('../FakeData');


const resolvers = {
    Query: {
      books: () => books,
    },
  };

  module.exports = { resolvers };