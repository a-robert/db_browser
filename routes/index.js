const _ = require('lodash-node');

const public_apis = [{
  route: '/students',
  url: './public/students.js'
}, {
  route: '/grades',
  url: './public/grades.js'
}, {
  route: '/groups',
  url: './public/groups.js'
}, {
  route: '/subjects',
  url: './public/subjects.js'
}, {
  route: '/summary',
  url: './public/summary.js'
}];

module.exports = function(app) {
  use(app, public_apis);
};

function use(root_app, apis) {
  _.each(apis, function(api) {
    const router = require(api.url);
    root_app.use('/api' + api.route, router);
  });
}
