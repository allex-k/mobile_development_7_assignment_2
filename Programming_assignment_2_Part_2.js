//Programming assignment 2. Part 2
"use strict";
class TimeOK{
	hours=null; minutes=null; seconds = null;
  
    constructor(param1, param2, param3){
		//console.log('num of arguments = '+arguments.length);
		if(arguments.length===3){
			//конструктор з трьома параметрами(години, хвилини, секунди)
			{
				this.hours = arguments[0];
				this.minutes = arguments[1];
				this.seconds = arguments[2];
			}
			if(! TimeOK.validate_time(arguments[0], arguments[1], arguments[2])){
				//console.log('WARNING: Time validation is not successfull');
				this.normalize_time();
			
			}
			
		}
		else if(arguments.length===1){
			//конструктор з одним параметром -об'єкти типу Date
			this.hours = arguments[0].getHours();
			this.minutes = arguments[0].getMinutes();
			this.seconds = arguments[0].getSeconds();
		}
		else if(arguments.length===0)
			//констркуктор за замовченням, без параметрів, задаємо нульові значення
			this.hours=this.minutes=this.seconds=0;
	}
  
	static validate_time(hours, minutes, seconds){
		let validationSuccess = false;
		if(hours>=0 && hours<=23 && minutes>=0 && minutes<=59 && seconds>=0 && seconds <=59)
			return true;
		else return false;
	}
	
	static clip(val, min, max){
		if (val>max) return val%(max+1);
		if(val<min) return (max+1) + val%(max+1);
		return val
	}
	
	normalize_time(){
		this.minutes+=Math.floor(this.seconds/60);
		this.hours+=Math.floor(this.minutes/60);
		
		this.seconds=TimeOK.clip(this.seconds, 0,59);
		this.minutes=TimeOK.clip(this.minutes, 0,59);
		this.hours=TimeOK.clip(this.hours, 0,23);
	}
	
  
	toString()
	{
	  let ZZ;
	  let hours = this.hours;
	  
	  if (this.hours<=12) ZZ=' AM';
	  else if(this.hours>12) {ZZ=' PM'; hours-=12;}
		  
	  return hours+':'+this.minutes+':'+this.seconds+ZZ;
	}
	
	add(timeObj){
		return new TimeOK(
		this.hours+timeObj.hours,
		this.minutes+timeObj.minutes,
		this.seconds+timeObj.seconds
		);
	}
	subtract(timeObj){
		return new TimeOK(
		this.hours-timeObj.hours,
		this.minutes-timeObj.minutes,
		this.seconds-timeObj.seconds
		);
	}
	static sum(timeObj1, timeObj2){
		return new TimeOK(
		timeObj1.hours+timeObj2.hours,
		timeObj1.minutes+timeObj2.minutes,
		timeObj1.seconds+timeObj2.seconds
		);
	}
	static difference(timeObj1, timeObj2){
		return new TimeOK(
		timeObj1.hours-timeObj2.hours,
		timeObj1.minutes-timeObj2.minutes,
		timeObj1.seconds-timeObj2.seconds
		);
	}
	
}


let time1 = new TimeOK(10,11,12); //конструктор 1
let time2 = new TimeOK(new Date()); //конструктор 2
let time3 = new TimeOK(); //конструктор 3

console.log('time1:  '+time1.toString()); 
console.log('time2:  '+time2.toString());
console.log('time3:  '+time3.toString());

let time4 = time1.add(new TimeOK(1,1,1)) //метод з пункту 6
console.log('time4:  '+time4.toString());

let time5 = TimeOK.sum(new TimeOK(23,59,59), new TimeOK(12,0,1)); //метод з пункту 7
console.log('time5:  '+time5.toString());

let time6 = TimeOK.difference(new TimeOK(0,0,0), new TimeOK(0,0,1)); //метод з пункту 7
console.log('time6:  '+time6.toString());


