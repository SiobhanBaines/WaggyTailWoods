class Time {
    constructor(date) {
        this.DayOfTheWeek = date.getDay();
        this.Day = date.getDate();
        this.Element = $(
            '<div class="day"> <span class="dayNumber">' + this.Day + "</span> </div>"
        );
        this.Available = [];
    }
}
class Times {
    constructor() {
        this.month = new Date().getMonth();
        this.year = new Date().getFullYear();
        this.array = this.getTimesByDate(this.month, this.year);
    }
    getTimesByDate(month, year) {
        let date = new Date(year, month, 1);
        let days = [];
        while (date.getMonth() === month) {
            let day = new Date(date);
            let time = new Time(day);
            days.push(time);
            date.setDate(date.getDate() + 1);
        }
        return days;
    }
    addNulls(array) {
        const firstDay = array[0];
        const lastDay = array[array.length - 1];
        for (let i = 0; i < firstDay.DayOfTheWeek; i++) {
            array = [null, ...array];
        }
        for (let i = 0; i < 6 - lastDay.DayOfTheWeek; i++) {
            array = [...array, null];
        }
        return array;
    }
    formatByWeekdays(array) {
        let formated = [];
        for (let i = 0; i < 7; i++) {
            let weekday = [];
            for (let j = 0; j < array.length / 7 + 1; j++) {
                weekday.push(array[7 * j + i]);
            }
            formated[i] = weekday;
        }
        return formated;
    }
    renderCalendar() {
        let renderingArray = this.array;
        renderingArray = this.addNulls(renderingArray);
        renderingArray = this.formatByWeekdays(renderingArray);
        $(".day").remove();
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < renderingArray[0].length - 1; j++) {
                let time = renderingArray[i][j];
                if (time !== null)
                    $($(".calendarBody .column")[i]).append(time.Element);
                else $($(".calendarBody .column")[i]).append('<div class="day"></div>');
            }
        }
    }
    findTime(day) {
        return this.array.find(time => time.Day == day);
    }
}

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let weekDays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
];
let data = [{
        date: "24",
        times: ["09:00", "11:00", "18:00", "19:00", "20:00", "23:00"]
    },
    {
        date: "12",
        times: ["12:00", "13:00", "14:00", "15:00", "23:00"]
    }
];
const loadInData = (data, calendar) => {
    data.map(time => {
        calendar.findTime(time.date).Available = [...time.times];
    });
};
// const renderInfoTab = () => {
//   let currentDate = new Date(currentYear, currentMonth, currentDay + 1);
//   $(".dayInfo .date").html(months[currentMonth] + " " + currentDay);
//   $(".dayInfo .dayOfTheWeek").html(weekDays[currentDate.getDay()]);
//   let times = findByDate( currentDate );
//   if (times != undefined) {
//     times = times.times;
//     times = times.map(time => '<div class="time">' + time + "</div>");
//     times = times.reduce((accumulator, time) => accumulator + time);
//   } else times = '<span class="noTimes">No times.</span>';
//   $(".times").html(times);
// };
$(() => {
    // const times = new Times();
    // times.setArray(getMonthDays);
    // currentMonth = new Date().getMonth();
    // currentYear = new Date().getFullYear();
    // currentDay = new Date().getDate();
    // renderCalendar(getMonthDays(currentMonth, currentYear));
    // $(".dayNumber:contains('" + currentDay + "')")
    //   .parent()
    //   .addClass("active");
    // renderInfoTab();
    const calendar = new Times();
    loadInData(data, calendar);
    calendar.renderCalendar();
    console.log("array - ");
    console.log(calendar.array);
    $(".monthName .next").click(() => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(getMonthDays(currentMonth, currentYear));
    });
    $(".monthName .prev").click(() => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(getMonthDays(currentMonth, currentYear));
    });
    $(".backButton").click(() => {
        $(".Register").hide();
        $($(".Main")[1]).css("display", "grid");
    });
    $(".times .time").click(() => {
        $(".Register").css("display", "grid");
        $($(".Main")[1]).hide();
    });
    $(".calendarBody").on("click", ".day", e => {
        currentDay = parseInt(
            $(e.currentTarget)
            .children(".dayNumber")
            .html()
        );
        renderInfoTab();
        $(".calendarBody .day").removeClass("active");
        $(e.currentTarget).addClass("active");
    });
});