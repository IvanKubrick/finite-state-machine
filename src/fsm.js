class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.config = config;
      this.state = this.config.initial;
      this.statesList = config.states;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (state in this.statesList) {
        this.prevState = this.state;
        this.state = state;
      } else {
          throw new Error('Данное состояние не найдено');
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      var transitionsObj = this.statesList[this.state].transitions
      if (event in transitionsObj) {
          this.prevState = this.state;
          this.state = transitionsObj[event];
      } else {
        throw new Error('Данное событие отсутствует');
      }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var allStates = Object.keys(this.statesList),
          appropriateStates = [];
      if (!event) return allStates;
      for (var i = 0; i < allStates.length; i++) {
        var transitionsObj = this.statesList[ allStates[i] ].transitions;
        if (event in transitionsObj) {
          appropriateStates.push( allStates[i] );
        }
      }
      return appropriateStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (!this.prevState) return false;
      this.nextState = this.state;
      this.state = this.prevState;
      this.prevState = null;
      return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (!this.nextState) return false;
      this.state = this.nextState;
      this.nextState = null;
      return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.prevState = null;
      this.nextState = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/