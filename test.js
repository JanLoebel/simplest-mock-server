const newman = require('newman');

newman.run({
    collection: require('./simplest-mock-server.postman_collection.json'),
    reporters: 'cli'
}, function (err) {
    if (err) { throw err; }
    console.log('Test run complete!');
});