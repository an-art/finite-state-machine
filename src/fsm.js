class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this._state = config.initial;
        this.prev;
        this.medium;
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
        this.medium = undefined;
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
        this.medium = undefined;
        switch(event) {
            case 'get_hungry': 
                if (this.prev === 'busy' || this.prev === 'sleeping') {
                    this._state = 'hungry';
                    break;
                } else throw new Er ("Error");
            case 'get_tired': 
                if (this.prev === 'busy') {
                    this._state = 'sleeping'; 
                    break;
                } 
            case 'get_up': 
                if (this.prev === 'sleeping') {
                    this._state = 'normal'; 
                    break;
                } else throw new Er ("Error");
            case 'eat':
                if (this.prev === 'hungry') {
                    this._state = 'normal'; 
                    break;
                } else throw new Er ("Error");
            case 'study': 
                if (this.prev === 'normal') {
                    this._state = 'busy'; 
                    break;
                } else throw new Er ("Error");
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
        if(this.prev && this._state!='normal') {
            this.medium = this._state;
            this._state = this.prev;
            this.prev = this.medium;
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
        if(this.medium && this.medium!='normal') {
            this.medium = this._state;
            this._state = this.prev;
            this.prev = this.medium;
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
