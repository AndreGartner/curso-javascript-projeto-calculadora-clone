class CalcController {

    constructor() {
        this._locale        = 'pt-BR';
        this._timeEl        = document.querySelector('#hora');
        this._dateEl        = document.querySelector('#data');
        this._operation     = [];
        this._currentDate;
        this._displayCalcEl = document.querySelector('#display');

        this.initialize();
        this.initButtonsEvents();
    }

    initialize () {
        this.setDisplayDateTime();

        setInterval(_ => {
            this.setDisplayDateTime();
        }, 1000);
    }

    addEventListenerAll (element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }

    setError() {
        this.displayCalc = 'Error';
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    isOperator(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    } 

    addOperation(value) {
        if (this.getLastOperation() === undefined) {
            return this._operation.push(value);
        }

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                return this._operation[this._operation.length - 1] = value;
            }

            return (!isNaN(value)) ? 
                this._operation.push(value)
            : 
                console.log(`Outra coisa: ${value}`);
        }

        if (this.isOperator(value)) {
            return this._operation.push(value);
        }

        const newValue = this.getLastOperation().toString() + value.toString();
        return this._operation[this._operation.length - 1] = parseInt(newValue);
    }

    execBtn (value) {
        switch (value) {
            case 'ac':
                this.clearAll();
            break;

            case 'ce':
                this.clearEntry();
            break;

            case 'soma':
                this.addOperation('+');
            break;

            case 'subtracao':
                this.addOperation('-');
            break;

            case 'divisao':
                this.addOperation('/');
            break;

            case 'multiplicacao':
                this.addOperation('*');
            break;

            case 'porcento':
                this.addOperation('%');
            break;

            case 'igual':

            break;

            case 'ponto':
                this.addOperation('.');
            break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
            break;

            default:
                this.setError();
            break;
        }
        console.log(this._operation);
    }

    initButtonsEvents () {
       const buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach( btn => {
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace('btn-', '');
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer';
            });
        });
    }

    setDisplayDateTime () {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {day: '2-digit', month: 'long', year: 'numeric'});
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime () {
        return this._timeEl.innerHTML;
    }
    
    set displayTime (timeEl) {
        this._timeEl.innerHTML = timeEl;
    }   

    get displayDate () {
        return this._dateEl.innerHTML;
    }

    set displayDate (dateEl) {
        this._dateEl.innerHTML = dateEl;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(displayCalcEl) {
        this._displayCalcEl.innerHTML = displayCalcEl;
    } 

    get currentDate() {
        return new Date();
    }

    set currentDate(currentDate) {
        this._currentDate = currentDate;
    } 

}