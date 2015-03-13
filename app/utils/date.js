module.exports = {

  /* Returns the current time offset by the values in object passed in */
  getTimeIn: function (timeOffset){
    var epochTime = new Date().getTime();

    if (timeOffset.milliseconds){
      epochTime += timeOffset.milliseconds;
    }

    if (timeOffset.seconds){
      epochTime += timeOffset.seconds * 1000;
    }

    if (timeOffset.minutes){
      epochTime += timeOffset.minutes * 60 * 1000;
    }

    if (timeOffset.hours){
      epochTime += timeOffset.hours * 60 * 60 * 1000;
    }

    if (timeOffset.days){
      epochTime += timeOffset.days * 24 * 60 * 60 * 1000;
    }

    return new Date(epochTime);
  },

  /* Determines if the time passed in has passed */
  hasTimePassed: function (time){
    return time.getTime() < new Date().getTime();
  },

  getDateObject: function(year, month, day) {
    return new Date(Date.UTC(year, month, day));
  }

};