import React, { useState } from 'react'

export default function Calendar() {
    var dateObj = new Date() 

var curr_date= dateObj.getDate()
var curr_day= dateObj.getDay()
var curr_month= dateObj.getMonth()
 const [calen_fields,set_calen_fields] = useState({
    day:curr_day,
    date:curr_date,
    month:curr_month,
    // isCurrentMonth:curr_month==calen_fields.month
    
 })

 let curr_monthDays =[]
 var months = ["jan", 'feb', "mar", 'apr', "may", 'june', "july", 'aug', 'sept', "oct", 'nov', "dec"];
 

 function findMonDays(Month) {
   let days;
   switch (Month) {
     case 3:
     case 5:
     case 8:
     case 10:
       days = 30;
       break;
     case 1:
       days = 28;
       break;
     default:
       days = 31;
   }

   return days;
 }
  

let calstyle = {
    display: 'grid',
    gridTemplateColumns: "repeat(7,1fr)",
    gridTemplateRows:"repeat(6,1fr)",
    backgroundColor:'red'
}
// to find next sat 
function getFirstDayOfMonth(tmp_to_find_next_sat, tmp_curr_day, month) {
  let firstDay;

  while (tmp_curr_day < 6)
    if (tmp_curr_day == 6) {
      break;
    } else {
      tmp_to_find_next_sat = tmp_to_find_next_sat + 1;

      tmp_curr_day++;
    }

  // to find first sat of the month
  let first_sat = tmp_to_find_next_sat;
  while (first_sat > 7) {
    first_sat = first_sat - 7;
  }

  // to find first day of month
  var tmp_to_find_first_day = first_sat;
  var prev_month_days = findMonDays(month - 1);
  var tmp_week_days = 6;
  while (tmp_week_days > 0) {
    if (tmp_to_find_first_day == 1 && tmp_week_days != 0) {
      tmp_to_find_first_day = prev_month_days;
    } else {
      tmp_to_find_first_day--;
    }
    tmp_week_days--;
  }
  firstDay = tmp_to_find_first_day;
  return firstDay;
}




function getAllMonthDays(tmp_to_find_first_day, prev_month_days) {
  let shouldCheckPrev = true;
  let i = 1;
  while (i <= 42) {
    if (tmp_to_find_first_day > prev_month_days && shouldCheckPrev) {
      tmp_to_find_first_day = 1;
      shouldCheckPrev = false;
    }
    if (tmp_to_find_first_day > findMonDays(calen_fields.month) && !shouldCheckPrev) {
      tmp_to_find_first_day = 1;
    }
    curr_monthDays.push(tmp_to_find_first_day++);
    i++;
  }
}

    // check prev month days
   
    var firstDay= getFirstDayOfMonth(calen_fields.date,calen_fields.day,calen_fields.month)
getAllMonthDays( firstDay, findMonDays(calen_fields.month))

    function getPrev(){
  
        set_calen_fields(prev=>{
            return(
                {...prev, date:curr_monthDays[0],day:0,month:prev.month-1}
            )
        })
    }
    function getNext(){

        set_calen_fields(prev=>{
            return(
                {...prev, date:curr_monthDays[41],day:6,month:prev.month+1}
            )
        })
    }
    const {month, date,day} ={...calen_fields}
    //  console.log("month:",month,"date:", date,"day:",day)
    console.log( findMonDays(calen_fields.month))
    return (
        <div > <h3 style={{textAlign:'center'}}>{months[calen_fields.month]}</h3>
          
            <div className='cal-container' style={calstyle}>
               {curr_monthDays.map((item,index)=>{
              return  <div >{item}</div>
            })} 

            </div>
          <div><button onClick={getPrev}>previous</button><button onClick={getNext}>next</button></div>


        </div>
    )
}