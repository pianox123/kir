let dataRepository = { // создание объекта  
    getItem: () => {        // получения объекта по ключу 
        let string = localStorage.getItem('sp-content'); //определение переменной в которой хранится массив 
        return JSON.parse(string)  
    },

    setItem: (value) => { //добавляет объект по ключу 
        let json = JSON.stringify(value) // определение переменной в которой хранится объект  
        localStorage.setItem('sp-content', json) // добавление json с ключом 
    },

    delete: (sp) => { // удаления

    },

    update: (sp) => { // обновления новости
        let newSp = dataRepository.getAllSp().map((el) => { //сравнивает новости и обновляет ее на новую ,когда нужно
            if (el.id == paper.id) {
                return sp
            } else {
                return el
            }
        })

        dataRepository.setItem(newSp) // задаем массиву новостей новые значения
    },

    create: () => {

    },

    getAllSp: () => { // получаем весь список новостей
        return dataRepository.getItem('sp-content')
    }
}

let spItemTemplate =  // шаблон 
    '<ul class="sp-list">' + 
            '<li  class="sp-item">' +
                '<h2>{sp-title}</h2>' +
                '<h3>{sp-text}</h3>' +
                '</label>' +
                '<div class="link-js">' +
                    '<a href="{sp-link}">Новость</a>' +
                '</div>' +
            '</li>' +
        '</ul>';


function init() { // функция инит
    console.log('Init') // выводит init в консоль
    loadSampleData(); 
    render();
}
//сравнивает
function updateSpAttributeById(id, attribute, value) {
    let findedSp = dataRepository.getAllSp().filter((el) => {
        return el.id == id
    })[0]
    findedSp[attribute] = value
    dataRepository.update(findedSp)
}

//карточки которые подстовляем в шаблон
function loadSampleData() {
    if (dataRepository.getItem('sp-content') != null) {
        return
    }
    dataRepository.setItem([
        {
            id: 1,
            title: 'Кирилл Сарычев',
            text: 'Спортивные новости',
            link: 'pages/Кирилл_Сарычев.html'
        },
        {
            id: 2,
            title: 'Новости игровой недели',
            text: 'игровые новости',
            link: 'pages/Кирилл_Сарычев.html'
        },
        {
            id: 3,
            title: 'Кибер панк',
            text: 'Баги и фиксы',
            link: 'pages/cyber_punk.html'
        },

    ])
}
// получаем данные через функцию
function render()  {
    let html = '';
    let sp = dataRepository.getAllSp()
    console.log(sp)
    // функция в которой происходит частичное замещения карточек 
    for (i = 0; i < sp.length; i++) {
        html += replaceAllTemplateItems(sp[i])
    }

    let element = window.document.getElementsByClassName('sp-content')[0]
    element.innerHTML = html
    console.log(html)

}
//Заполняем шаблон и возвращаем его для карточек которые мы написали
function replaceAllTemplateItems(sp) {
    return spItemTemplate
    .replaceAll('{sp-id}', sp.id)
    .replaceAll('{sp-title}', sp.title)
    .replaceAll('{sp-text}', sp.text)
    .replaceAll('{isChecked}', sp.isChecked ? 'checked' : '')
    .replaceAll('{sp-link}', sp.link)
}
  //Изменяем состояние карточки на противоположное 
function toggle(sp) {
    sp.isChecked = !sp.isChecked
}

        //Страница загружена, вызываем то что нам надо
window.onload = (event) => {
    init();
}