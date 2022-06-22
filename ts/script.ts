class Indirizzo {
    via: string;
    citta: string;
    civico: number;

    constructor(via: string, citta: string, civico: number) {
        this.via = via;
        this.citta = citta;
        this.civico = civico;
    }
}

class MotherAccount {
    
    balanceInit:number=0  // saldo attuale 0
    indirizzo: Indirizzo;
    count = 0;
    static operazioniTotali = 0;

    constructor(balanceInit: number, indirizzo: Indirizzo){
        this.balanceInit = balanceInit;
        this.indirizzo = indirizzo;
    }

    deposit(amount:number): void { // versamento
        this.balanceInit = this.balanceInit + amount - this.addInterest(amount);
        this.count++;
        MotherAccount.operazioniTotali++;
    } 
    withDraw(amount:number): void { // prelievo
        if(amount <= this.balanceInit) {
            this.balanceInit = this.balanceInit - amount;
            this.count++;
            MotherAccount.operazioniTotali++;
        } else {
            alert('Prelievo massimo di ' + this.balanceInit);
        }
    }
    private addInterest(amount:number): number { // interesse MotherAccount 10%
        return (amount * 10)/100;
    }
}

class SonAccount extends MotherAccount {
    constructor(balanceInit: number, indirizzo: Indirizzo){
        super(balanceInit, indirizzo);
    }

    deposit(amount:number): void { // versamento
        this.balanceInit = this.balanceInit + amount;
        this.count++;
        MotherAccount.operazioniTotali++;
    } 
}

let ind = new Indirizzo('Epicode', 'Roma', 99);
let mAccount = new MotherAccount(250, ind);
let sAccount = new SonAccount(250, ind);

document.addEventListener('DOMContentLoaded', () => {
    saldoMAcount();
    saldoSAcount();

    let versaBtn = document.querySelector('#conto1 #btnVersa');  
    if(versaBtn !== null) {
        versaBtn.addEventListener('click', versaMAccount);
    } 
    
    let prelevaBtn = document.querySelector('#conto1 #btnPreleva'); 
    if(prelevaBtn !== null) {
        prelevaBtn.addEventListener('click',prelevaMAccount );
    }

    let versaBtn2 = document.querySelector('#conto2 #btnVersa');  
    if(versaBtn2 !== null) {
        versaBtn2.addEventListener('click', versaSAccount);
    }

    let prelevaBtn2 = document.querySelector('#conto2 #btnPreleva'); 
    if(prelevaBtn2 !== null) {
        prelevaBtn2.addEventListener('click',prelevaSAccount );
    }
})

function versaMAccount(){
    let input = <HTMLInputElement> document.querySelector('#conto1 input[name="c1v"]');
    if(input !== null && input.value.trim() !== '' && !isNaN(+input.value.trim())){
        let val = input.value;
        mAccount.deposit(+val);
        saldoMAcount();
    }
}

function versaSAccount(){
    let input = <HTMLInputElement> document.querySelector('#conto2 input[name="c2v"]');
    if(input !== null && input.value.trim() !== '' && !isNaN(+input.value.trim())){
        let val = input.value;
        sAccount.deposit(+val);
        saldoSAcount();
    }
}

function prelevaMAccount(){
    let input = <HTMLInputElement> document.querySelector('#conto1 input[name="c1p"]');
    if(input !== null && input.value.trim() !== ''){
        let val = input.value;
        mAccount.withDraw(+val);
        saldoMAcount();
    }
}

function prelevaSAccount(){
    let input = <HTMLInputElement> document.querySelector('#conto2 input[name="c2p"]');
    if(input !== null && input.value.trim() !== ''){
        let val = input.value;
        sAccount.withDraw(+val);
        saldoSAcount();
    }
}

function saldoMAcount(){
    let saldo = document.querySelector('#conto1 h2 span');
    let oper = document.querySelector('#conto1 h4 span');
    if(saldo !== null){
        saldo.innerHTML = mAccount.balanceInit.toString();
    } 
    if(oper !== null){
        oper.innerHTML = mAccount.count.toString();
    }
    operazTotali()
}

function saldoSAcount(){
    let saldo = document.querySelector('#conto2 h2 span');
    let oper = document.querySelector('#conto2 h4 span');
    if(saldo !== null){
        saldo.innerHTML = sAccount.balanceInit.toString();
    } 
    if(oper !== null){
        oper.innerHTML = sAccount.count.toString();
    }
    operazTotali()
}

function operazTotali() {
    let opTot = document.querySelector('#operazioniTotali h3 span');
    if(opTot !== null){
        opTot.innerHTML = MotherAccount.operazioniTotali.toString();
    }
}

