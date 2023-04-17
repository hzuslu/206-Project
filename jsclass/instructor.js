class Instructor {
  constructor(name) {
    this.name = name;
    this.courses = [];
    this.courseCapacities = [];
    this.busy = false;
    this.busyTimes = [];
  }

  addCourse(course, capacity) {
    this.courses.push(course);
    this.courseCapacities.push(`${course}-${capacity}`);
  }

  toString() {
    return `Name: ${this.name}\nCourses: ${this.courses}\nCourse Capacities: ${this.courseCapacities}\nBusy: ${this.busy}\nBusy Times: ${this.busyTimes}\n`;
  }

  setBusyTimes(times) {
    this.busy = true;
    this.busyTimes = times;
  }
}

const fs = require('fs');

function convertCSVtoInstructorList(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.trim().split('\n');
  const instructorList = {};

  for (let line of lines) {
    const fields = line.trim().split(';');
    const courseCode = fields[0];
    const instructorName = fields[7];
    const capacity = fields[6];
    if (!(instructorName in instructorList)) {
      instructorList[instructorName] = new Instructor(instructorName);
    }
    instructorList[instructorName].addCourse(courseCode, capacity);
  }

  return instructorList;
}

function setInstructorBusyTimes(instructorList, filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.trim().split('\n');

  for (let line of lines) {
    const fields = line.trim().split(';');
    const instructorName = fields[0];
    const busyDay = fields[1];
    const busyTime = fields[2];
    if (instructorList[instructorName]) {
      const busyTimes = instructorList[instructorName].busyTimes;
      busyTimes.push(`${busyDay}-${busyTime}`);
      instructorList[instructorName].setBusyTimes(busyTimes);
    }
  }
}

const instructorList = convertCSVtoInstructorList('C:/Users/hasan/Desktop/jsclass/Courses.csv');
setInstructorBusyTimes(instructorList, 'C:/Users/hasan/Desktop/jsclass/busy.csv');

for (let instructorName in instructorList) {
  console.log(instructorList[instructorName].toString());
}
