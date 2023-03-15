let comments = [];
const commList = document.querySelector('#comm-list');
const date_today = new Date(); //сегодня
const date_today2 = new Date(); //сегодня
let date_yesterday = date_today2.setDate(date_today2.getDate() -1);
date_yesterday = date_today2.toLocaleDateString();
date_yesterday = date_yesterday.split('.').reverse().join('-');
function getData(form) {
    const formData = new FormData(form);
    const dateControl = document.querySelector('input[type="date"]');
    const p__name__err = document.getElementById("p__name__err");
    const p__text__err = document.getElementById("p__text__err");
    let arr = [];
  
    /*
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    */

    if(Object.fromEntries(formData).comm__name  != '' && Object.fromEntries(formData).comm__text  != ''){
        arr.push(Object.fromEntries(formData));

        let arrEl0 = arr[0]; //нулевой элемент с объектом

        comments.push(arrEl0["comm__name"]); //имя из объекта
        comments.push(arrEl0["comm__text"]); //текст из объекта


        if(dateControl.value == ''){ //если даты нет
            comments.push(formatDate(date_today)); //+сегодняшняя дата
        }else{
            comments.push(dateControl.value); //+дата
        }


        let commentBox = document.createElement('div');
        commentBox.classList.add('comment-box');
        let h1__comm_name = document.createElement('h1');
        h1__comm_name.innerHTML = arrEl0["comm__name"];
        commentBox.appendChild(h1__comm_name);
        let p__comm_text = document.createElement('p');
        p__comm_text.innerHTML = arrEl0["comm__text"];
        commentBox.appendChild(p__comm_text);
        let p__comm_date = document.createElement('p');
        let now = formatDate(date_today);
        let nowTime = formatDateAndTime(date_today);
        let lastArrEL = comments[comments.length - 1]
        if( lastArrEL == now){
          p__comm_date.innerHTML = 'сегодня в ' + nowTime;
        }else if ( lastArrEL == date_yesterday){
          p__comm_date.innerHTML = 'вчера в ' + nowTime;
        }else{
          p__comm_date.innerHTML = comments[comments.length - 1];
        }
        commentBox.appendChild(p__comm_date);
        let icons = document.createElement('div');
        icons.classList.add('icons');
        const str = `<div class="like-icon" onclick="this.className = (this.className == 'like-icon' ? 'likefull' : 'like-icon')"></div>
        <div class="trashcan-icon" onclick="deleteComm(this)"></div>`
        icons.innerHTML = str;
        commentBox.id = p__comm_text.innerHTML;
        commentBox.appendChild(icons);

        commList.appendChild(commentBox);

        document.getElementById("comm__name").value = ""; //очистить инпуты
        document.getElementById("comm__text").value = "";
        dateControl.value = "";
        arr = []; //очистить массив
        document.getElementById("comm__name").classList.remove('error__input');
        document.getElementById("comm__name").classList.remove('error__input');
        p__name__err.classList.add('disp__none');
        p__text__err.classList.add('disp__none');

    }else if(Object.fromEntries(formData).comm__name  == '' && Object.fromEntries(formData).comm__text  == ''){
        document.getElementById("comm__name").classList.add('error__input');
        document.getElementById("comm__text").classList.add('error__input');
        p__name__err.classList.remove('disp__none');
        p__text__err.classList.remove('disp__none');
        comm__name.oninput = function() {
          if(comm__name.value != ''){
            with(this) className = defaultValue == value ? "" : "";
            p__name__err.classList.add('disp__none');
          }else{
            document.getElementById("comm__name").classList.add('error__input');
            p__name__err.classList.remove('disp__none');
          }
        };
        comm__text.oninput = function() {
          if(comm__text.value != ''){
            with(this) className = defaultValue == value ? "" : "";
            p__text__err.classList.add('disp__none');
          }else{
            document.getElementById("comm__text").classList.add('error__input');
            p__text__err.classList.remove('disp__none');
          }
        };

    }else if(Object.fromEntries(formData).comm__name  == ''){
        document.getElementById("comm__name").classList.add('error__input');
        document.getElementById("comm__name").value = ""; //очистить инпуты
        p__name__err.classList.remove('disp__none');
        comm__name.oninput = function() {
          if(comm__name.value != ''){
            with(this) className = defaultValue == value ? "" : "";
            p__name__err.classList.add('disp__none');
          }else{
            document.getElementById("comm__name").classList.add('error__input');
            p__name__err.classList.remove('disp__none');
          }
        };

    }else if(Object.fromEntries(formData).comm__text  == ''){
        document.getElementById("comm__text").classList.add('error__input');
        document.getElementById("comm__text").value = "";//очистить инпуты
        p__text__err.classList.remove('disp__none');
        comm__text.oninput = function() {
          if(comm__text.value != ''){
            with(this) className = defaultValue == value ? "" : "";
            p__text__err.classList.add('disp__none');
          }else{
            document.getElementById("comm__text").classList.add('error__input');
            p__text__err.classList.remove('disp__none');
          }
        };

    }

  }
  
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
  });

  document.getElementById("form").addEventListener( 'keyup', event => {
    if( event.code === 'Enter' ) getData(event.target);
  });



  function formatDate(date) { //формат даты
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yy = date.getFullYear()
    return yy + '-' + mm + '-' + dd;
  }

  
  function formatDateAndTime(date) { //формат даты + время
    var mm = date.getMinutes();
    if (mm < 10) mm = '0' + mm;
    var hh = date.getHours();
    if (hh < 10) hh = '0' + hh;
    return hh+ ':' + mm;
  }

function deleteComm(e){
  e.closest('.comment-box').classList.add('disp__none');
}
