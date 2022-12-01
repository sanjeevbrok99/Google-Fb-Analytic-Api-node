let date = new Date();

date.setDate("01");
date.setDate(date.getDate());
date.setHours("00");
date.setMinutes("00");
date.setMilliseconds("000");
date.setHours(date.getHours()+18);
date.setMinutes(date.getMinutes()+30);
let startDateOfMonth = date.toISOString().slice(0,10);
let todayDate = new Date().toISOString().slice(0,10);

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; 
const yyyy = today.getFullYear();
if(dd<10) 
{
    dd=`0${dd}`;
} 

if(mm<10) 
{
    mm=`0${mm}`;
} 
today = `${dd}-${mm}-${yyyy}`;

 module.exports = [
    {
        today: "2019-05-22"
   },
   {
       start: startDateOfMonth 
   },
   {
       present: today
   }
]   