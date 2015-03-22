module.exports = {

  currency: function(input) {
    var value = parseFloat(input);

    if (value < 0) {
      return "-£" + (value * -1).toFixed(2);
    }
    return "£" + value.toFixed(2);
  },

  monthShort: function(month) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    return months[parseInt(month)];
  },

  month: function(month) {
    var months = [
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

    return months[parseInt(month)];
  },

  date: function(dateStr) {
    var date = new Date(dateStr);

    var nth = function(day) {
      var d = parseInt(day);
      if (d>3 && d<21) {
        // 11th, 12th, 13th needs this
        return "th";
      }
      switch(d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    return date.getDate() + nth(date.getDate()) + " " + this.monthShort(date.getMonth()) + " " + date.getFullYear();
  }
  
};