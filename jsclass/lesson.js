class Lesson {
  constructor(code, name, semester, credits, compulsory, department, capacity, instructor) {
    this.code = code;
    this.name = name;
    this.semester = semester;
    this.credits = credits;
    this.compulsory = compulsory;
    this.department = department;
    this.capacity = capacity;
    this.instructor = instructor;
    this.restricted = false;
    this.restrictedSlots = [];
    this.limitedTime = false;
    this.limitedTimeSlots = [];
  }

  addRestrictedSlot(slot) {
    this.restricted = true;
    this.restrictedSlots.push(slot);
  }

  addLimitedTimeSlot(slot) {
    this.limitedTime = true;
    this.limitedTimeSlots.push(slot);
  }

  toString() {
    const restrictedSlots = this.restrictedSlots.join(", ");
    const limitedTimeSlots = this.limitedTimeSlots.join(", ");
    return `Code: ${this.code} Name: ${this.name} Semester: ${this.semester} Credits: ${this.credits} Compulsory: ${this.compulsory} Department: ${this.department} Capacity: ${this.capacity} Instructor: ${this.instructor} Restricted: ${this.restricted} Restricted Slots: ${restrictedSlots} Limited Time: ${this.limitedTime} Limited Time Slots: ${limitedTimeSlots}\n`;
  }
}

const fs = require('fs');
function convertCSVtoLessonList(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.trim().split('\n');
  const lessonList = [];

  for (let line of lines) {
    const fields = line.trim().split(';');
    const code = fields[0];
    const name = fields[1];
    const semester = fields[2];
    const credits = fields[3];
    const compulsory = fields[4] === 'C';
    const department = fields[5];
    const capacity = fields[6];
    const instructor = fields[7];
    const lesson = new Lesson(code, name, semester, credits, compulsory, department, capacity, instructor);
    lessonList.push(lesson);
  }

  return lessonList;
}

const fs2 = require('fs');
function updateRestrictedLessons(lessonList, filePath) {
  const data = fs2.readFileSync(filePath, 'utf-8');
  const lines = data.trim().split('\n');

  for (let line of lines) {
    const [instructor, day, time] = line.trim().split(';');
    const slot = `${day}-${time}`;
    for (let lesson of lessonList) {
      if (lesson.instructor === instructor) {
        lesson.addRestrictedSlot(slot);
      }
    }
  }
}

const fs3 = require('fs');
function updateLimitedTimeLessons(lessonList, filePath) {
  const data = fs3.readFileSync(filePath, 'utf-8');
  const lines = data.trim().split('\n');

  for (let line of lines) {
    const [code, day, time] = line.trim().split(';');
    const slot = `${day}-${time}`;
    for (let lesson of lessonList) {
      if (lesson.code === code) {
        lesson.addLimitedTimeSlot(slot);
      }
    }
  }
}

const lessonList = convertCSVtoLessonList('C:/Users/hasan/Desktop/jsclass/Courses.csv');
updateRestrictedLessons(lessonList, 'C:/Users/hasan/Desktop/jsclass/busy.csv');
updateLimitedTimeLessons(lessonList, 'C:/Users/hasan/Desktop/jsclass/service.csv');
for (let lesson of lessonList) {
  console.log(`Code: ${lesson.code}\nName: ${lesson.name}\nSemester: ${lesson.semester}\nCredits: ${lesson.credits}\nCompulsory: ${lesson.compulsory}\nDepartment: ${lesson.department}\nCapacity: ${lesson.capacity}\nInstructor: ${lesson.instructor}\nRestricted: ${lesson.restricted}\nRestricted Slots: ${lesson.restrictedSlots.join(", ")}\nLimited Time: ${lesson.limitedTime}\nLimited Time Slots: ${lesson.limitedTimeSlots.join(", ")}\n`);
}
