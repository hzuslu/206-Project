class ClassRoom {
    constructor(name, capacity) {
      this.name = name;
      this.capacity = capacity;
    }
  
    toString() {
      return `Name: ${this.name}\nCapacity: ${this.capacity}\n`;
    }
  }
  
  const fs = require('fs');
  
  function convertCSVtoClassRoomList(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.trim().split('\n');
    const classRoomList = [];
  
    for (let line of lines) {
      const fields = line.trim().split(';');
      const className = fields[0];
      const capacity = parseInt(fields[1]);
      classRoomList.push(new ClassRoom(className, capacity));
    }
  
    return classRoomList;
  }
  
  const classRoomList = convertCSVtoClassRoomList('C:/Users/hasan/Desktop/jsclass/classroom.csv');
  
  for (let classRoom of classRoomList) {
    console.log(classRoom.toString());
  }
  