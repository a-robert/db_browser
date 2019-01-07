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

  updateStudent(id, group, full_name, birthdate, address, phone_number) {
    return db(this.table).where('id', id)
      .update({
        group,
        full_name,
        birthdate,
        address,
        phone_number
      });
  }

  getStudent(id) {
    return db(this.table).select().where('id', id);
  }

  getStudents() {
    return db(this.table).select();
  }

  deleteStudent(id) {
    return db(this.table).where('id', id)
      .del();
  }
}

module.exports = new Student();
