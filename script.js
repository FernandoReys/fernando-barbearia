const form = document.getElementById('bookingForm');
const errorMsg = document.getElementById('error');

const barberNumbers = { "Reis":"5511946500974","Souza":"5511946981086" };
const holidays = ['2026-01-01','2026-12-25'];

if(form){
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    errorMsg.textContent='';

    const barber = document.getElementById('barber').value;
    const service = document.getElementById('service').value;
    const name = document.getElementById('name').value.trim();
    const datetimeInput = document.getElementById('datetime').value;

    if(!barber || !service || !name || !datetimeInput){ errorMsg.textContent="Preencha todos os campos!"; return;}

    const selectedDate = new Date(datetimeInput);
    const day = selectedDate.getDay();
    const hour = selectedDate.getHours();
    const dateStr = selectedDate.toISOString().split('T')[0];

    if(holidays.includes(dateStr)){ errorMsg.textContent="Não é possível agendar em feriados!"; return;}

    let valid = false;
    if(day>=1 && day<=5 && hour>=9 && hour<20) valid=true;
    else if((day===0||day===6) && hour>=9 && hour<14) valid=true;

    if(!valid){ errorMsg.textContent="Horário indisponível! Confira nosso horário."; return;}

    const formattedDate = selectedDate.toLocaleString('pt-BR',{ weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' });

    const phone = barberNumbers[barber];
    const message = `Olá! Quero agendar um serviço: ${service}%0ABarbeiro: ${barber}%0ANome: ${name}%0AHorário: ${formattedDate}`;
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url,'_blank');
});
}
