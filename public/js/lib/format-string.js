module.exports = {

  currency: function(input) {
    return "£" + input.toFixed(2);
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

    return date.getDate() + nth(date.getDate()) + " " + months[date.getMonth()] + " " + date.getFullYear();
  },

  name: function(person) {
    return person.forename + " " + person.surname;
  },

  address: function(property) {
    return property.number + " " + property.street + ", " + property.postcode;
  }
  
};