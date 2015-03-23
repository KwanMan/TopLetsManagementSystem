var _ = require("lodash");
var validator = require("validator");

validator.extend('isPostcode', function(str) {
  return validator.matches(str, /^([a-zA-Z]{1,2}\d{1,2}|[a-zA-Z]{1,2}\d[a-zA-Z])\s?\d[a-zA-Z]{2}$/);
});

validator.extend('isNotWhitespaceOrEmpty', function(str) {
  return validator.matches(str, /\S/);
});

validator.extend('isUKPhoneNumber', function(str) {
  return validator.matches(str, /^0\d{9,10}$/);
});

module.exports = {
  handleTextChange: function(e) {
    var state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  },

  validateFields: function() {
    var self = this;

    var error = _.find(self.getFieldConstraints(), function(constraint) {
      return !constraint.validator.call(null, constraint.value);
    });

    if (error) {
      return error.message;
    }

    return null;
  },

  validator: {
    isNotNull : function(v) { return v !== null; }
  }
};