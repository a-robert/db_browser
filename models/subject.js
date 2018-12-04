/**
 * Created by Robert Asaturyan on 23/03/2018.
 */
const db = require('../db/db');

class Subject {
  constructor() {
    this.table = 'Subjects';
  }

  addSubject(name) {
    return db(this.table).insert({
      name
    });
  }

  getSubject(id) {
    return db(this.table).select().where('id', id)
  }

  getSubjects() {
    return db(this.table).select()
  }
}

module.exports = new Subject();
