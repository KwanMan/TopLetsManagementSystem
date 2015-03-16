module.exports = {

  getClasses: function(moreClasses) {
    var classes = [];

    if (Array.isArray(moreClasses)) {
      classes = classes.concat(moreClasses);
    } else {
      classes.push(moreClasses);
    }

    if (this.props.className) {
      classes.push(this.props.className);
    }

    return classes.join(" ");
  }

};