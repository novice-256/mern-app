
var dateObj = new Date() 


// // let curr_monthDays =[]

// // // var curr_date= 29
// // // var curr_day=5
// // // var curr_month= 6

  
// // let tmp_to_find_next_sat=curr_date
// // let tmp_curr_day= curr_day

// // // to find next sat 
// // function getFirstDayOfMonth(tmp_to_find_next_sat, tmp_curr_day, curr_month) {
// //   let firstDay;

// //   while (tmp_curr_day < 6)
// //     if (tmp_curr_day == 6) {
// //       break;
// //     } else {
// //       tmp_to_find_next_sat = tmp_to_find_next_sat + 1;

// //       tmp_curr_day++;
// //     }

// //   // to find first sat of the month
// //   let first_sat = tmp_to_find_next_sat;
// //   while (first_sat > 7) {
// //     first_sat = first_sat - 7;
// //   }

// //   // to find first day of month
// //   var tmp_to_find_first_day = first_sat;
// //   var prev_month_days = findMonDays(curr_month - 1);
// //   tmp_week_days = 6;
// //   while (tmp_week_days > 0) {
// //     if (tmp_to_find_first_day == 1 && tmp_week_days != 0) {
// //       tmp_to_find_first_day = prev_month_days;
// //     } else {
// //       tmp_to_find_first_day--;
// //     }
// //     tmp_week_days--;
// //   }
// //   firstDay = tmp_to_find_first_day;
// //   return firstDay;
// // }




// // function getAllMonthDays(tmp_to_find_first_day, prev_month_days) {
// //   let shouldCheckPrev = true;
// //   let i = 1;
// //   while (i <= 42) {
// //     if (tmp_to_find_first_day > prev_month_days && shouldCheckPrev) {
// //       tmp_to_find_first_day = 1;
// //       shouldCheckPrev = false;
// //     }
// //     if (tmp_to_find_first_day > findMonDays(curr_month) && !shouldCheckPrev) {
// //       tmp_to_find_first_day = 1;
// //     }
// //     curr_monthDays.push(tmp_to_find_first_day++);
// //     i++;
// //   }
// // }
// //     // check prev month days
   
// //     var firstDay= getFirstDayOfMonth(25, 4,4)
// //     getAllMonthDays( firstDay,30)
// //     console.log(curr_monthDays)


// var curr_date= dateObj.getDate()
// var curr_day= dateObj.getDay()
// var curr_month= dateObj.getMonth()
// let curr_monthDays =[]

// // var curr_date= 29
// // var curr_day=5
// // var curr_month= 6

//  function findMonDays(Month) {
//    let days;
//    switch (Month) {
//      case 3:
//      case 5:
//      case 8:
//      case 10:
//        days = 30;
//        break;
//      case 1:
//        days = 28;
//        break;
//      default:
//        days = 31;
//    }

//    return days;
//  }
  
// let tmp_to_find_next_sat=curr_date
// let tmp_curr_day= curr_day

// // to find next sat 
// function getFirstDayOfMonth(date, day, month) {
//   let firstDay;

//   while (day < 6)
//     if (day == 6) {
//       break;
//     } else {
//       date = date + 1;

//       day++;
//     }

//   // to find first sat of the month
//   let first_sat = date;
//   while (first_sat > 7) {
//     first_sat = first_sat - 7;
//   }

//   // to find first day of month
//   var tmp_to_find_first_day = first_sat;
//   var prev_month_days = findMonDays(month - 1);
//   tmp_week_days = 6;
//   while (tmp_week_days > 0) {
//     if (tmp_to_find_first_day == 1 && tmp_week_days != 0) {
//       tmp_to_find_first_day = prev_month_days;
//     } else {
//       tmp_to_find_first_day--;
//     }
//     tmp_week_days--;
//   }
//   firstDay = tmp_to_find_first_day;
//   return firstDay;
// }




// function getAllMonthDays(prev_last_day, prev_month_days) {
//   let shouldCheckPrev = true;
//   let i = 1;
//   while (i <= 42) {
//     if (prev_last_day > prev_month_days && shouldCheckPrev) {
//       prev_last_day = 1;
//       shouldCheckPrev = false;
//     }
//     if (prev_last_day > findMonDays(curr_month) && !shouldCheckPrev) {
//       prev_last_day = 1;
//     }
//     curr_monthDays.push(prev_last_day++);
//     i++;
//   }
// }
//     // check prev month days
//     curr_month=2
//     var firstDay= getFirstDayOfMonth(1, 3,2)
//     getAllMonthDays( firstDay,findMonDays(2))
// // new work 25 jul
//     function convert2DArr(arr){
//       let two_D_Arr = []
      
//       let r =0
//       let c =0
//       for (const item of arr) {
//         if(c==7){
//           r=r+1
//           c=0
//         }
//         if (!two_D_Arr[r]) {
//           two_D_Arr[r] = [];
//         }
//         two_D_Arr[r].push(item)
//         c++
//       }
//       return two_D_Arr
//     }
//     function getNextMonth(currDaysArr){
//       for (const items of currDaysArr) {
//         let r = currDaysArr.length -1
//         let c = currDaysArr[0].length -1
//         if(!currDaysArr[r][c]) break;

//        if( currDaysArr[r].includes(1)){
//          return [r ,c,items ]
//        }else{
//         if(c==7) r=r-1
//         c--
//        }

//       }
//     }
//     var convertedArr = convert2DArr(curr_monthDays)

//     // console.log(convert2DArr(curr_monthDays))
//   var months = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];

//     console.log( curr_monthDays ,months[curr_month-1])
//     // console.log(findMonDays(curr_month-1))


// let curr = 5


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
function getSunAndSat(curr_date, curr_day,prevMonth) {
  let prevSun;
  let prevSat;
  if (curr_day != 0) {
    
    prevSun = curr_date - curr_day;
  }
  else{
    prevSun=curr_date
   
  } 
  if(prevSun<=0){
      prevSun= prevMonth+prevSun
    }
  prevSat= prevSun -1
  return [prevSun, prevSat];
}
function getFirAndLastDay(sun,sat,prevMonDays,currMonDays){
    let firstDay= (sun%7-7)+prevMonDays
    var lastSat = sat
    while(lastSat<currMonDays){
      lastSat= lastSat+7
    }
    lastSat=lastSat-currMonDays
    
    return [firstDay , lastSat]
  }


  function getCalFields(firstDayOfMonth, prevMonDays, currMonDays) {
    let days = firstDayOfMonth;
    let i = 0;
    let shouldCheckPrev = true;
    let currCalFields = [];
    while (i < 42) {
      currCalFields.push(days++);
      if (currCalFields[i] === prevMonDays && shouldCheckPrev) {
        shouldCheckPrev = false;
        days = 1;
      }
      if (currCalFields[i] === currMonDays && !shouldCheckPrev) {
        days = 1;
      }
      i++;
    }

    return currCalFields;
  }

  
var curr_date=26
var curr_day= 4
var curr_month= 9
var currMonDays = findMonDays(curr_month)
var prevMonDays =findMonDays(curr_month-1)

var sun = getSunAndSat(curr_date,curr_day,prevMonDays)[0]
var sat = getSunAndSat(curr_date,curr_day,prevMonDays)[1]

// console.log(getFirAndLastDay(sun,sat,prevMonDays,currMonDays))
var firstDayOfMonth=getFirAndLastDay(sun,sat,prevMonDays,currMonDays)[0]
var lastDayOfMonth=getFirAndLastDay(sun,sat,prevMonDays,currMonDays)[1]
let currCalFields= getCalFields(firstDayOfMonth, prevMonDays, currMonDays);
// console.log(firstDayOfMonth,lastDayOfMonth)
  

var curr_date=currCalFields[0]
var curr_day= 0
var curr_month= 8
var currMonDays = findMonDays(curr_month)
var prevMonDays =findMonDays(curr_month-1)

var sun = getSunAndSat(curr_date,curr_day,prevMonDays)[0]
var sat = getSunAndSat(curr_date,curr_day,prevMonDays)[1]


var currMonDays = findMonDays(curr_month)
var prevMonDays =findMonDays(curr_month-1)
var firstDayOfMonth=getFirAndLastDay(sun,sat,prevMonDays,currMonDays)[0]
var lastDayOfMonth=getFirAndLastDay(sun,sat,prevMonDays,currMonDays)[1]
let prevCalFields= getCalFields(firstDayOfMonth, prevMonDays, currMonDays);








var curr_month= 10

var curr_date=currCalFields[41]
var currMonDays = findMonDays(curr_month)
var prevMonDays =findMonDays(curr_month-1)
let nextCalFields= getCalFields(prevMonDays-curr_date, prevMonDays, currMonDays);

console.log(`--${months[8]}--`);
console.log(prevCalFields);
console.log(`--${months[9]}--`);
console.log(currCalFields);
console.log(`--${months[10]}--`);
console.log((nextCalFields));

// console.log(nextCalFields);
// console.log((sun%7-7)+prevMonDays , lastDayOfMonth);





























