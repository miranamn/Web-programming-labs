let globalCards = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : [];
console.log(globalCards);

function saveCards(){
    localStorage.removeItem('cards');
    localStorage.setItem('cards', JSON.stringify(globalCards));
}

function fillCards(){
    const showcase = document.querySelector('.showcase__inner');

    showcase.innerHTML = '';
    globalCards.forEach(elem => {
        showcase.innerHTML += `<div class="card">
        <div class="card__header">
            <div class="card__id">
                <p id="card-id">ID: ${elem.id}</p>
            </div>
            <button class="card-edit-btn" onclick="editCard(this)">Править</button>
        </div>
        <div class="card__main">
            <div class="card__img-box">
                <img id="card-url" src="${elem.url}" alt="Аватарка">
            </div>
            <div class="card__title">
                <h1 id="card-name">${elem.name}</h1>
            </div>
        </div>
        <div class="card__provider">
            <p id="card-provider">${elem.provider}</p>
        </div>
        <div class="card__disc">
            <p id="card-disc">${elem.disc}</p>
        </div>
    </div>
        `;
    });

}
fillCards();
function setUpStartCards(){
    cards = [
        {
            name: 'Иллидан',
            url: 'https://kalix.club/uploads/posts/2022-12/1671763652_kalix-club-p-illidan-art-vkontakte-5.png',
            id: 0,
            disc: 'Временно у Саргераса',
            provider: 'ОАО Элуна prod.'
        },
        {
            name: 'Артас',
            url: 'https://static.wikia.nocookie.net/beecher/images/6/6c/Fuckarthas.jpg/revision/latest/scale-to-width-down/1200?cb=20150707214720',
            id: 1,
            disc: 'Власть, которая и не снилась вашему отцу',
            provider: 'ИП Теренас'
        },
        {
            name: 'Рексар',
            url: 'https://i.ytimg.com/vi/LlQnaetQvYo/maxresdefault.jpg',
            id: 2,
            disc: 'Всегда один',
            provider: 'АО Оргиммар'
        },
        {
            name: 'Тиранда',
            url: 'https://i.playground.ru/p/zSQ_qqNT8Lf_EziIS51QaQ.jpeg',
            id: 2,
            disc: 'Горячая чикса',
            provider: 'ООО Дарнасс'
        }
    ];
    globalCards = cards;
    saveCards();   
    fillCards();   
}

function addCard(){
    const name = document.getElementById('name').value;
    let url = document.getElementById('url').value;
    const disc = document.getElementById('disc').value;
    const id = Number(document.getElementById('id').value);
    const provider = document.getElementById('provider').value;
    if (name == ''){
        alert('"Название" должно быть заполнено');
        return;
    }
    if (disc == ''){
        alert('"Описание" должно быть заполнено');
        return;
    }
    if (id == ''){
        alert('"Код товара" должно быть заполнено');
        return;
    }
    if (provider == ''){
        alert('"Поставщик" должно быть заполнено');
        return;
    }
    const card = {
        name: name,
        url: url,
        id: id,
        disc: disc,
        provider: provider
    };
    globalCards.push(card);   
    saveCards();
    fillCards();
}

let toggle = true;
function editCard(event){
    if (document.querySelectorAll('.card_active').length == 0){
        const card = event.parentNode.parentNode;
        card.classList.add('card_active');
        const name = document.getElementById('name');
        const url = document.getElementById('url');
        const disc = document.getElementById('disc');
        const id = document.getElementById('id');
        const provider = document.getElementById('provider');     
        name.value = card.querySelector('#card-name').innerHTML;
        url.value = card.querySelector('#card-url').src;
        disc.value = card.querySelector('#card-disc').innerHTML;
        id.value = card.querySelector('#card-id').innerHTML.replace('ID: ', '');
        provider.value = card.querySelector('#card-provider').innerHTML;              
        const Btns = document.querySelectorAll('.add-hero-card__add-btn');
        Btns[0].classList.add('btn_hidden');
        Btns[1].classList.remove('btn_hidden');
    }
    else{
        const card = event.parentNode.parentNode;
        if (Object.values(card.classList).indexOf('card_active') != -1){
            card.classList.remove('card_active');
        const name = document.getElementById('name');
        const url = document.getElementById('url');
        const disc = document.getElementById('disc');
        const id = document.getElementById('id');
        const provider = document.getElementById('provider');
        name.value = '';
        url.value = '';
        disc.value = '';
        id.value = '';
        provider.value = '';          
        const Btns = document.querySelectorAll('.add-hero-card__add-btn');
        Btns[0].classList.remove('btn_hidden');
        Btns[1].classList.add('btn_hidden');
        }
    }
}

function changeCard(){
    const card = document.querySelector('.card_active');
    const showcase = document.querySelector('.showcase__inner');
    const cards = showcase.querySelectorAll('.card');
    const name = document.getElementById('name');
    const url = document.getElementById('url');
    const disc = document.getElementById('disc');
    const id = document.getElementById('id');
    const provider = document.getElementById('provider');
    console.log(globalCards);
    let pos = 0;
    cards.forEach(elem => {      
        if (Object.values(elem.classList).indexOf('card_active') != -1){
            const cardObj = {
                name: name.value,
                url: url.value,
                id: Number(id.value),
                disc: disc.value,
                provider: provider.value
            };         
            globalCards[pos].name = cardObj.name;
            globalCards[pos].url = cardObj.url;
            globalCards[pos].id = cardObj.id;
            globalCards[pos].disc = cardObj.disc;
            globalCards[pos].provider = cardObj.provider;
            console.log(globalCards);
            saveCards();
        }
        pos++;
    });  
    card.querySelector('#card-name').innerHTML = name.value;
    card.querySelector('#card-url').src = url.value;
    card.querySelector('#card-disc').innerHTML = disc.value;
    card.querySelector('#card-id').innerHTML = `ID: ${id.value}`;
    card.querySelector('#card-provider').innerHTML = provider.value;
}

function deleteCardScript(){
    const cards = document.querySelectorAll('.card');
    const self = document.querySelector('.delete-btn');
    if (self.innerHTML == 'Выбрать'){
        self.innerHTML = 'Удалить';
    }
    else{
        self.innerHTML = 'Выбрать';
        let pos = 0;
        cards.forEach(elem => {
            if (Object.values(elem.classList).includes('card_chosen')){
                globalCards.splice(pos, 1);
                pos--;
            }
            pos++;
        });
        saveCards();       
        fillCards();
    }
    cards.forEach(elem => {
        elem.addEventListener('click', (e) => {
            elem.classList.toggle('card_chosen');
        });
    });   
}