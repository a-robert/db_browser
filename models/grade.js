/**
 * Created by Robert Asaturyan on 23/03/2018.
 */
const db = require('../db/db');

class Grade {
  constructor() {
    this.table = 'Grades';
  }

  addGrade(student_id, subject_id, grade) {
    return db(this.table).insert({
      student_id,
      subject_id,
      grade
    });
  }

  getSummary() {
    return db(this.table)
      .join('Students', `${this.table}.student_id`, '=', 'Students.id')
      .join('Subjects', `${this.table}.subject_id`, '=', 'Subjects.id')
      .join('Groups', `Students.group`, '=', 'Groups.id')
      .select(
        'Students.id as StudentId',
        'Groups.name as Group',
        'Students.full_name as FullName',
        'Students.full_name as FullName',
        'Students.birthdate as BirthDate',
        'Students.address as Address',
        'Students.phone_number as PhoneNumber',
        'Subjects.name as Subject',
        'Grades.grade as Grade'
      );
  }

  getGrade(id) {
    return db(this.table).select().where('id', id)
  }

  getGrades() {
    return db(this.table).select()
  }
}

module.exports = new Grade();
