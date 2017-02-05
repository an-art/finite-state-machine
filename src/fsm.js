class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this._state = config.initial;
        this.prev;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.prev = this._state;
        switch (state){
            case 'hungry': this._state = 'hungry'; break;
            case 'normal': this._state = 'normal'; break;
            case 'sleeping': this._state = 'sleeping'; break;
            case 'busy': this._state = 'busy'; break;
            default: throw new Er ("Error");
        }
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.prev = this._state;
        switch(event){
            case 'get_hungry': this._state = 'hungry';
            case 'get_tired': this._state = 'sleeping';
            case 'get_up': 
            case 'eat': this._state = 'normal';
            case 'study': this._state = 'busy';
            //default: throw new Err ("Error");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._state = 'normal';
        return this._state;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.prev) return true;
        else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
