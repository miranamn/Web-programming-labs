let globalCards = [];
const DB_URL = "http://localhost:3000/items";

function fillCards() {
    const showcase = document.querySelector('.showcase__inner');
    if (globalCards.length !== 0) {
        const cardsHTML = globalCards.map(elem => `
            <div class="card">
                <div class="card__header">
                    <div class="card__id">
                        <p id="card-id">ID: ${elem.code}</p>
                    </div>
                    <button class="card-edit-btn" onclick="editCard(this)">Править</button>
                </div>
                <div class="card__main">
                    <div class="card__img-box">
                        <img id="card-url" src="${elem.img}" alt="Аватарка">
                    </div>
                    <div class="card__title">
                        <h1 id="card-name">${elem.title}</h1>
                    </div>
                </div>
                <div class="card__provider">
                    <p id="card-provider">${elem.provider}</p>
                </div>
                <div class="card__disc">
                    <p id="card-disc">${elem.description}</p>
                </div>
            </div>
        `);

        showcase.innerHTML = cardsHTML.join('');
    }
}

fillCards();

async function setUpStartCards() {
    try {
        const showcase = document.querySelector(".showcase__inner");
        showcase.innerHTML = '<div class="preloader"></div>';
        const response = await fetch(`${DB_URL}`);       
        if (!response.ok) {
            throw new Error('Произошел сбой на этапе загрузки');
        }
        const cardJson = await response.json();
        if (cardJson.length === 0) {
            return;
        }
        globalCards = [...cardJson];
        fillCards();
    } catch (error) {
        console.error('Возникла ошибка:', error);
    }
}

async function loadCreator() {
    try {
        const CREATOR_INFO_URL = "http://localhost:3000/creatorInfo";
        const response = await fetch(CREATOR_INFO_URL);
        if (!response.ok) throw new Error(response.statusText);
        const creatorJson = await response.json();
        const html = `${creatorJson.name} ${creatorJson.group} <a class="link" href="${creatorJson.repo}"> (Автор)</a>`;
        document.querySelector(".logo__inner").innerHTML = html;
    } catch (err) {
        console.error(err.message || err);
    }
}
loadCreator();

async function addCard() {
    try {
        document.querySelector(".loader").style.display = "flex";
        const name = document.getElementById('name').value;
        let url = document.getElementById('url').value;
        const disc = document.getElementById('disc').value;
        const id = Number(document.getElementById('id').value);
        const provider = document.getElementById('provider').value;

        if (name === '' || disc === '' || id === '' || provider === ''|| url === '') {
            alert('Все поля должны быть заполнены');
            return;
        }
        const card = {
            title: name,
            description: disc,
            img: url,
            code: id,
            provider: provider,
        };

        globalCards.push(card);
        await fetch(DB_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(card),
        });

        document.querySelector(".loader").style.display = "none";
        fillCards();
        document.getElementById("name").value = "";
        document.getElementById("url").value = "";
        document.getElementById("disc").value = "";
        document.getElementById("id").value = "";
        document.getElementById("provider").value = "";
    } catch (error) {
        console.error(error.message || error);
    }
}

let toggle = true;
function editCard(event) {
    const card = event.parentNode.parentNode;
    const isCardActive = Object.values(card.classList).includes('card_active');

    if (document.querySelectorAll('.card_active').length === 0) {
        card.classList.add('card_active');
        updateFormFields(card);
        toggleButtonsVisibility(true);
    } else if (isCardActive) {
        card.classList.remove('card_active');
        clearFormFields();
        toggleButtonsVisibility(false);
    }
}

function updateFormFields(card) {
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
}

function clearFormFields() {
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
}

function toggleButtonsVisibility(isEditMode) {
    const Btns = document.querySelectorAll('.add-hero-card__add-btn');
    Btns[0].classList.toggle('btn_hidden', isEditMode);
    Btns[1].classList.toggle('btn_hidden', !isEditMode);
}


async function changeCard() {
    try {
        document.querySelector(".loader").style.display = "flex";
        const card = document.querySelector('.card_active');
        const showcase = document.querySelector('.showcase__inner');
        const name = document.getElementById('name');
        const url = document.getElementById('url');
        const disc = document.getElementById('disc');
        const id = document.getElementById('id');
        const provider = document.getElementById('provider');
        const cards = Array.from(showcase.querySelectorAll('.card'));
        const activeCardIndex = cards.findIndex(elem => elem.classList.contains("card_active"));
        if (activeCardIndex !== -1) {
            const cardObj = {
                title: name.value,
                img: url.value,
                code: Number(id.value),
                description: disc.value,
                provider: provider.value,
            };
            globalCards[activeCardIndex] = { ...cardObj, id: globalCards[activeCardIndex].id };
            await fetch(`${DB_URL}/${globalCards[activeCardIndex].id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(globalCards[activeCardIndex]),
            });
            document.querySelector(".loader").style.display = "none";

            card.querySelector('#card-name').innerHTML = name.value;
            card.querySelector('#card-url').src = url.value;
            card.querySelector('#card-disc').innerHTML = disc.value;
            card.querySelector('#card-id').innerHTML = `ID: ${id.value}`;
            card.querySelector('#card-provider').innerHTML = provider.value;
        }
    } catch (error) {
        console.error(error.message || error);
    }
}

async function deleteCardScript() {
    const cards = document.querySelectorAll('.card');
    const deleteBtn = document.querySelector('.delete-btn');
    if (deleteBtn.innerHTML === 'Выбрать') {
        deleteBtn.innerHTML = 'Удалить';
    } else {
        deleteBtn.innerHTML = 'Выбрать';
        for (let pos = 0; pos < cards.length; pos++) {
            const card = cards[pos];
            if (card.classList.contains("card_chosen")) {
                try {
                    await fetch(`${DB_URL}/${globalCards[pos].id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify(globalCards[pos]),
                    });
                    globalCards.splice(pos, 1);
                    pos--;
                } catch (error) {
                    console.error(error.message || error);
                }
            }
        }
        fillCards();
    }
    cards.forEach((elem) => {
        elem.addEventListener("click", () => {
            elem.classList.toggle("card_chosen");
        });
    });
}