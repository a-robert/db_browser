/**
 * Created by Robert Asaturyan on 23/03/2018.
 */
const db = require('../db/db');

class Student {
  constructor() {
    this.table = 'Students';
  }

  addStudent(group, full_name, birthdate, address, phone_number) {
    return db(this.table).insert({
      group,
      full_name,
      birthdate,
      address,
      phone_number
    });
  }

  getStudent(id) {
    return db(this.table).select().where('id', id)
  }

  getStudents() {
    return db(this.table).select()
  }
}

module.exports = new Student();
