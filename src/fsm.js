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
            default: throw new Er ("Error"); break;
        }
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.prev = this._state;
        switch(event) {
            case 'get_hungry': this._state = 'hungry'; break;
            case 'get_tired': this._state = 'sleeping'; break;
            case 'get_up': this._state = 'normal'; break;
            case 'eat': this._state = 'normal'; break;
            case 'study': this._state = 'busy'; break;
            default: throw new Er ("Error");
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
    getStates(event) {
        switch(event) {
            case 'get_hungry': return ['busy', 'sleeping'];
            case 'study': return ['normal'];
            case undefined: return ['normal', 'busy', 'hungry', 'sleeping'];
            default:  return [];
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        var st;
        if(this.prev) {
            st = this._state;
            this._state = this.prev;
            this.prev = st;
            return true;
        }
        else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        var st;
        if(this.prev) {
            st = this._state;
            this._state = this.prev;
            this.prev = st;
            return true;
        }
        else return false;
    }
    

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prev = undefined;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
