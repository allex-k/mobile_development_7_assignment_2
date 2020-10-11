// Given string with format "Student1 - Group1; Student2 - Group2; ..."

let studentsStr = 'Бортнік Василь - ІВ-72; Чередніченко Владислав - ІВ-73; Гуменюк Олександр - ІВ-71; Корнійчук Ольга - ІВ-71; Киба Олег - ІВ-72; Капінус Артем - ІВ-73; Овчарова Юстіна - ІВ-72; Науменко Павло - ІВ-73; Трудов Антон - ІВ-71; Музика Олександр - ІВ-71; Давиденко Костянтин - ІВ-73; Андрющенко Данило - ІВ-71; Тимко Андрій - ІВ-72; Феофанов Іван - ІВ-71; Гончар Юрій - ІВ-73'

// Task 1
// Create dictionary:
// - key is a group name
// - value is sorted array with students
console.log('Task 1');
var studentsGroups = {};
arr1=studentsStr.split(';'); 
arr2=arr1.map(function(elem){return elem.trim().split(' ')}); 
//arr2 - масив, кожен елемент якого масив: ['Прізвише', 'Ім'я', '-', 'Группа']

for(let i=0; i<arr2.length; ++i){
	studentsGroups[arr2[i][3]]=[];	
}
//studentsGroups - об'єкт(словник), ключем є рядок-група, значенням - пустий масив


for(let i=0; i<arr2.length; ++i){
	studentsGroups[arr2[i][3]].push(arr2[i][0]+' '+arr2[i][1]);	
}
//тепер studentsGroups - об'єкт, ключем є рядок-група, значенням - масив імен студентів, - рядок 'Прізвише Ім'я'

let groups = Object.keys(studentsGroups);
for(group of groups){
	studentsGroups[group]=studentsGroups[group].sort(); //сортування рядків 'Прізвише Ім'я' в масиві за алфавітом
}
console.log('studentsGroups:');
console.log(studentsGroups);
console.log('===========================================');


// Given array with expected max points

//let points: [Int] = [5, 8, 15, 15, 13, 10, 10, 10, 15]

// Task 2
// Create dictionary:
// - key is a group name
// - value is dictionary:
//   - key is student
//   - value is array with points (fill it with random values, use function `randomValue(maxValue: Int) -> Int` )
console.log('Task 2');
function randomValue(maxValue){
	switch(Math.floor(Math.random()*6)){
		case 1:
			return Math.ceil(maxValue*0.7);
		case 2:
			return Math.ceil(maxValue*0.9);
		case 3: case 4: case 5:
			return maxValue;
		default:
			return 0;
	}
}
function create_random_arr(len, maxValue){
	arr = new Array(len);
	for(let i=0; i<len; ++i)
		arr[i]=randomValue(maxValue);
	return arr;
}
let studentPoints = {};
const numOfPoints = 9, maxValue = 9;
for (group of groups)
{
	studentPoints[group]={};
	for(student of studentsGroups[group])
	{
		studentPoints[group][student]=create_random_arr(numOfPoints, maxValue);
	}

}
console.log('studentPoints');
console.log(studentPoints);
console.log('===========================================');

// Task 3
// Create dictionary:
// - key is a group name
// - value is dictionary:
//   - key is student
//   - value is sum of student's points

console.log('Task 3');
function sum_of_arr(arr){
	return arr.reduce((accum, currentVal)=>accum + currentVal);
}
sumPoints = Object.assign(studentPoints);
for(group  of Object.keys(sumPoints)){
	for(student of Object.keys(sumPoints[group]))
		sumPoints[group][student]=sum_of_arr(sumPoints[group][student]);
}
console.log('studentPoints:');
console.log(studentPoints);
console.log('===========================================');

// Task 4
// Create dictionary:
// - key is group name
// - value is average of all students points
console.log('Task 4');
let groupAvg = JSON.parse(JSON.stringify(sumPoints));// копіювання об'єкта через перетворення в json :/

for(group  of Object.keys(sumPoints)){
	let pointsArr = Object.values(sumPoints[group]);
	groupAvg[group]=sum_of_arr(pointsArr)/pointsArr.length;
		
}
console.log('groupAvg:');
console.log(groupAvg);
console.log('===========================================');

// Task 5
// Create dictionary:
// - key is group name
// - value is array of students that have >= 60 points
console.log('Task 5');
passedPerGroup={};

for(group of groups){
	passedPerGroup[group]=[];
	for(student of Object.keys(sumPoints[group])){
		if(sumPoints[group][student]>=60) passedPerGroup[group].push(student);
	}	
} 
console.log('passedPerGroup:');
console.log(passedPerGroup);

// Example of output. Your results will differ because random is used to fill points.
//
//["ІВ-72": ["Бортнік Василь", "Киба Олег", "Овчарова Юстіна", "Тимко Андрій"], "ІВ-73": ["Гончар Юрій", "Давиденко Костянтин", "Капінус Артем", "Науменко Павло", "Чередніченко Владислав"], "ІВ-71": ["Андрющенко Данило", "Гуменюк Олександр", "Корнійчук Ольга", "Музика Олександр", "Трудов Антон", "Феофанов Іван"]]
//
//["ІВ-73": ["Капінус Артем": [5, 8, 15, 14, 10, 9, 7, 10, 11], "Чередніченко Владислав": [5, 6, 15, 11, 13, 9, 0, 7, 15], "Давиденко Костянтин": [5, 8, 15, 0, 10, 0, 7, 0, 0], "Науменко Павло": [0, 8, 0, 15, 13, 10, 0, 0, 0], "Гончар Юрій": [5, 0, 11, 15, 10, 10, 10, 9, 15]], "ІВ-72": ["Киба Олег": [0, 8, 15, 11, 13, 10, 10, 9, 0], "Овчарова Юстіна": [4, 8, 15, 15, 13, 10, 7, 10, 15], "Тимко Андрій": [5, 6, 14, 15, 13, 10, 10, 10, 0], "Бортнік Василь": [5, 8, 0, 15, 13, 10, 10, 10, 0]], "ІВ-71": ["Музика Олександр": [4, 8, 15, 0, 12, 10, 10, 10, 15], "Трудов Антон": [5, 0, 0, 14, 12, 10, 0, 9, 0], "Феофанов Іван": [5, 8, 14, 11, 12, 0, 10, 10, 15], "Корнійчук Ольга": [0, 8, 11, 14, 12, 7, 7, 10, 14], "Гуменюк Олександр": [5, 8, 14, 15, 10, 0, 7, 10, 15], "Андрющенко Данило": [4, 8, 15, 15, 13, 0, 10, 7, 0]]]
//
//["ІВ-73": ["Чередніченко Владислав": 81, "Гончар Юрій": 85, "Давиденко Костянтин": 45, "Капінус Артем": 89, "Науменко Павло": 46], "ІВ-72": ["Овчарова Юстіна": 97, "Тимко Андрій": 83, "Бортнік Василь": 71, "Киба Олег": 76], "ІВ-71": ["Музика Олександр": 84, "Корнійчук Ольга": 83, "Феофанов Іван": 85, "Гуменюк Олександр": 84, "Андрющенко Данило": 72, "Трудов Антон": 50]]
//
//["ІВ-72": 81.75, "ІВ-73": 69.2, "ІВ-71": 76.333336]
//
//["ІВ-73": ["Чередніченко Владислав", "Гончар Юрій", "Капінус Артем"], "ІВ-71": ["Гуменюк Олександр", "Корнійчук Ольга", "Андрющенко Данило", "Феофанов Іван", "Музика Олександр"], "ІВ-72": ["Бортнік Василь", "Тимко Андрій", "Овчарова Юстіна", "Киба Олег"]]

