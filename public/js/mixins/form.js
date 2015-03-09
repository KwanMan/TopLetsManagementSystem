module.exports = {
  handleTextChange: function(e) {
    var state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  }
};