/**
 * Created by Robert Asaturyan on 23/03/2018.
 */
const db = require('../db/db');

class Group {
  constructor() {
    this.table = 'Groups';
  }

  addGroup(name) {
    return db(this.table).insert({
      name
    });
  }

  updateGroup(id, name) {
    return db(this.table)
      .where('id', id)
      .update({
        name
      });
  }

  getGroup(id) {
    return db(this.table).select().where('id', id)
  }

  getGroups() {
    return db(this.table).select()
  }
}

module.exports = new Group();
