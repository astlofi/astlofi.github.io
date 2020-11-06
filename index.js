var reload = false;

//это прогрузка бд
getTracksFile();
//проверка, есть ли сессия пользователя lofiUser


window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-172325366-1');

$(window).on('load', function() {
    $('.preloader').fadeOut().end().delay(400).fadeOut('slow');
    reloadpage().delay(400);
});

function reloadpage() {
    //	let timerId = setInterval(() => refrash(), 1);
    // setTimeout(() => { clearInterval(timerId); alert('site was updating'); }, 2);
    /* if(reload==false) {
 console.log("do");
 refrash();
reload = true;

  }
  else{
	  alert("stop");
  }*/
}

$(function() {
    $("#ui_on").css("display", "none");
    $("#btn_no").css("display", "none");
	$("#btn_no2").css("display", "none");
	$("#wiki").css("display", "none");
});

//если база загрузилась, значение меняется на true
let tracks = null;
let artists = null;
var tracksLoaded = false;
var artistsLoaded = false;
async function getTracksFile() {
    let response = await fetch('tracks.json');
    let responseartists = await fetch('artists.json');
    await response.json().then((data) => {
        tracks = data;
        tracksLoaded = true;
        console.log("Tracks DB has successfully loaded:");
        console.log(data);
    })
    await responseartists.json().then((data) => {
        artists = data;
        artistsLoaded = true;
        console.log("artists DB has successfully loaded:");
        console.log(data);
    })
}

var track_now = {
    track: "",
    name: "",
    author: "",
    photo: "",
	
};
var artists_now = {
	name_art: "",
	info_art: "",
	vk_art: "",
	youtube_art: "",
	twitter_art: "",
	instagram_art: "",
	soundcloud_art: "",
	spotify_art: "",
	deezer_art: "",
}

function ui_off(){
   $("#ui").css("display", "none");
   $("#ui_on").css("display", "");
   $("#ui_off").css("display", "none")
 
}
function ui_on(){
   $("#ui").css("display", "");
   $("#ui_on").css("display", "none");
   $("#ui_off").css("display", "")
   
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
//Неформатированное время прослушивания
//document.getElementById('radio').currentTime
//Неформатированная длительность трека
//document.getElementById('radio').duration

//пример форматирования в формат мм:сс
//formatTrackTime(document.getElementById('radio').duration);
//formatTrackTime(document.getElementById('radio').currentTime);

function formatTrackTime(timee) {
    var givenTime = Math.floor(timee);
    var minutes = "0" + Math.floor(givenTime / 60);
    var seconds = "0" + (givenTime - minutes * 60);
    var dur = minutes.substr(-2) + ":" + seconds.substr(-2);
    return dur;
}

function link() {
    window.open(artistsObj.socials.vk);
};
async function radio() {
    if (tracksLoaded == true) {
        document.getElementById("t_trackTime").innerHTML = "<img src='https://aslofiradio.imfast.io/newPreloader.gif' width='16px' height='16px'>";
        var trackObj = tracks[getRandomInt(tracks.length)];
		var artistsObj = getartists(trackObj.artistsId);
		
        track_now.track = "https://aslofiradio.imfast.io/" + trackObj.path;
        track_now.name = trackObj.name;
        track_now.author = trackObj.artist;
		
        track_now.photo = "https://aslofiradio.imfast.io/" + trackObj.logo;
		artists_now.name_art = artistsObj.socials.name;
		artists_now.info_art = artistsObj.socials.about;
		artists_now.vk_art = artistsObj.socials.vk_art;
		artists_now.youtube_art = artistsObj.socials.youtube;
		artists_now.twitter_art = artistsObj.socials.twitter;
		artists_now.instagram_art = artistsObj.socials.instagram;
		artists_now.soundcloud_art = artistsObj.socials.soundcloud;
		artists_now.spotify_art = artistsObj.socials.spotify;
		artists_now.deezer_art = artistsObj.socials.deezer;
        window.document.title = "lofi | "+track_now.name+" - "+track_now.author;
        document.getElementById("radio").src = track_now.track;
        document.getElementById("t_name").textContent = track_now.name;
        document.getElementById("t_author").textContent = track_now.author;
        document.getElementById("t_img").src = track_now.photo;
        document.getElementById("t_img").alt = window.document.title = track_now.author+" - "+track_now.name;
        document.getElementById("t_img").src = track_now.photo;
		
		document.getElementById("name_art").href = artists_now.name_art;
		document.getElementById("info_art").href = artists_now.info_art;
		document.getElementById("youtube_art").href = artists_now.youtube_art;
		document.getElementById("twitter_art").href = artists_now.twitter_art;
		document.getElementById("instagram_art").href = artists_now.instagram_art;
		document.getElementById("soundcloud_art").href = artists_now.soundcloud_art;
		document.getElementById("spotify_art").href = artists_now.spotify_art;
		document.getElementById("deezer_art").href = artists_now.deezer_art;
        document.getElementById("art_logo").src = artists_now.logo;
        //artistsId (ставим свойства тексту автора)
        if(trackObj.artistsId !== null){
            //artistsId имеется
            artistsObj = getartists(trackObj.artistsId);
            document.getElementById("t_authorParent").setAttribute("href=link()","javascript:('"+trackObj.artistsId+"');");
            document.getElementById("t_authorParent").setAttribute("onclick","showartists('"+trackObj.artistsId+"');")
        }else{
            //artistsId отсутствует
            document.getElementById("t_authorParent").removeAttribute("href"); 
            document.getElementById("t_authorParent").removeAttribute("onclick"); 
        }
        document.getElementById("radio").addEventListener('canplay', function(){
            addTimeUpdateListener(); updateMetadata();
            document.getElementById("radio").play();
        }, false);
        //artistsId END
        
        playButtonLook();
        
        $("#btn").css("display", "none");
        $("#btn_no").css("display", "");
		$("#btn_no2").css("display", "");
    } else {
        alert("Невозможно прогрузить список треков.");
    }
}

function show_art(){
	$("#wiki").css("display", "");	
}

function refrash() {
    window.location.reload();
}

function addTimeUpdateListener(){
    var v = document.getElementById("radio");
    v.addEventListener("timeupdate", function() { 
        
        updateSongTime();
    }, true);
 }
 
 function updateSongTime(){
   var v = document.getElementById("radio");
    var durationText = document.getElementById("t_trackTime");
    var currTime = formatTrackTime(v.currentTime);
    var duration = formatTrackTime(v.duration);
    if(duration != "aN:aN" || currTime != "aN:aN"){
      durationText.innerHTML = currTime+" | "+duration;
    }
    else{
      durationText.innerHTML = track_now.track+" cannot be found on the server.";
    }
 }
 
//metadata песни
function updateMetadata(){
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track_now.name,
            artists: track_now.author,
            artwork: [{
                src: track_now.photo,
                sizes: "500x500",
                type: "image/jpeg"
            }]
        });
    
    navigator.mediaSession.setActionHandler('nexttrack', function(){
        radio();
        playButtonLook();
    });
    navigator.mediaSession.setActionHandler('pause', function(){
        document.getElementById("radio").pause();
        playButtonLook();
    });
    navigator.mediaSession.setActionHandler('play', function(){
        document.getElementById("radio").play();
        playButtonLook();
    });
}

function showartists(artistsId){
    var artistsObj = getartists(artistsId);


}

function getartists(artistsId){
    for (var i = 0; i < artists.length; i++){
        if (artists[i].artistsId == artistsId){
            return artists[i];
        }
        else{
            return null;
        }
    }
}

// аутентификация пользователей! потом добавлю аутентификацию через ГУГОЛ ХУЮГОЛ

//переменные пользователя
var lofiUser = {
    authenticated: false,
    authMethod: null,
    username: null,
    sessionObj: null,
    userObj: null
}

var lofiAuth = {
    VK : {
        login: function(){
            VK.Auth.getLoginStatus();
            if(lofiUser.authenticated != true){
                try{
                    VK.Auth.login(function(cb){
                        console.log(cb);
                        //настройка переменных
                        lofiUser.authenticated = true;
                        lofiUser.authMethod = "VK";
                        lofiUser.sessionObj = cb.session;
                        lofiUser.userObj = cb.session.user;
                        lofiUser.username = lofiUser.userObj.first_name+" "+lofiUser.userObj.last_name;
                        //lofiuser in localstorage
                        var lofiUserJSON = {"authenticated":true,"authMethod":"VK","sessionObj":lofiUser.sessionObj,"userObj":lofiUser.userObj,"username":lofiUser.username};
                        localStorage.setItem("lofiUser",JSON.stringify(lofiUserJSON));
                        alert("Успешно выполнен вход через "+lofiUser.authMethod+", как "+lofiUser.username+".");
                        getlocalSession();
                    });
                    
                } 
                catch (error) {
                    alert("Неудачный вход через VK, ошибка:\n"+error);
                    getlocalSession();
                }
            }
            else{
                alert("Вы уже выполнили вход через "+lofiUser.authMethod+", как "+lofiUser.username+".\nВыйдите из аккаунта, если хотите использовать другой метод аутентификации.");
                getlocalSession();
            }
        },
        logout: function(){
            VK.Auth.getLoginStatus();
            try {
                VK.Auth.logout(function(cb){
                    console.log(cb);
                    localStorage.removeItem("lofiUser");
                    //настройка переменных
                    lofiUser.authenticated = false;
                    lofiUser.authMethod = null;
                    lofiUser.sessionObj = null;
                    lofiUser.userObj = null;
                    lofiUser.username = null;
                    console.log("Выход из VK успешен.");
                    getlocalSession();
                });
            } catch (error) {
                console.log("Не удалось выйти из VK:\n"+error);
                getlocalSession();
            }
        }
    }
}
//checkSession
function getlocalSession(){
    if ("lofiUser" in localStorage) {
        var lofiLS = JSON.parse(localStorage.getItem("lofiUser"));
        lofiUser.authenticated = lofiLS.authenticated;
        lofiUser.authMethod = lofiLS.authMethod;
        lofiUser.sessionObj = lofiLS.sessionObj;
        lofiUser.userObj = lofiLS.userObj;
        lofiUser.username = lofiLS.username;
        updateAuthDown();
    } else {
        updateAuthDown();
        return false;
    }
}
function updateAuthDown(){
    var htmlDown = null;
    document.getElementById("authHTML1").innerHTML = "";
    if(lofiUser.authenticated != false){
       htmlDown = `
       <button class="dropbtn">${lofiUser.username} (${lofiUser.authMethod})<i class="fa fa-caret-down"></i></button>
       <div class="down-content">
          <a href="#" onclick="lofiAuth.${lofiUser.authMethod}.logout();">Выйти</a>
       </div>`;
    }
    else{
       htmlDown = `
       <button class="dropbtn">Authentication<i class="fa fa-caret-down"></i></button>
       <div class="down-content">
          <a href="#" onclick="lofiAuth.VK.login();">VK.COM</a>
          <a href="#"><div class="g-signin2" data-onsuccess="console.log("succ");"></div></a>
       </div>`;
    }
    document.getElementById("authHTML1").insertAdjacentHTML("afterbegin",htmlDown)
}
function isPlaying(){
    return !document.getElementById('radio').paused;
}
function playButton(){
    if(!isPlaying()){
        document.getElementById('radio').play();
    }
    else{
        document.getElementById('radio').pause();
    }
    playButtonLook();
}
function playButtonLook(){
    var pauseText = "&#10074;&#10074;";
    var playText = "&#9658;";
    if(isPlaying()){
        document.getElementById('btn_no').innerHTML = pauseText;
        //document.getElementById('btn_no').onclick = "document.getElementById('radio').pause();";
    }
    else{
        document.getElementById('btn_no').innerHTML = playText;
        //document.getElementById('btn_no').onclick = "document.getElementById('radio').play();";
    }
}
// дальше код для всплывающенго меню, не лезь туда, считай что тут код закончен :) хорошо, уговорил, не буду лезть)

var navigation = {
    // Variables
    $nav: document.querySelector('.nav'),
    $navTrigger: document.querySelector('.nav__trigger'),
    $navContent: document.querySelector('.nav__content'),
    $navList: document.querySelector('.nav__list'),
    transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',

    init: function init() {
        var self = this;

        // Handle the transitions
        self.$navTrigger.addEventListener('click', function () {
            if (!self.$navTrigger.classList.contains('is-active')) {
                // .nav--trigger active
                self.$navTrigger.classList.add('is-active');

                // .nav active
                if (!self.$nav.classList.contains('is-active')) {
                    self.$nav.classList.add('is-active');
                    self.$nav.addEventListener('transitionend', function (e) {
                        if (e.propertyName == 'width' && self.$navTrigger.classList.contains('is-active')) {
                            // .nav__content active
                            self.$navContent.classList.add('is-active');
                        }
                    });
                } else {
                    self.$navContent.classList.add('is-active');
                }

                // no-csstransitions fallback
                if (document.documentElement.classList.contains('no-csstransitions')) {
                    self.$navContent.classList.add('is-active');
                }
            } else {
                // .nav--trigger inactive
                self.$navTrigger.classList.remove('is-active');

                // .nav__content inactive
                if (self.$navContent.classList.contains('is-active')) {
                    self.$navContent.classList.remove('is-active');
                    self.$navContent.addEventListener('transitionend', function (e) {
                        if (e.propertyName == 'opacity' && !self.$navTrigger.classList.contains('is-active')) {
                            // .nav inactive
                            self.$nav.classList.remove('is-active');
                        }
                    });
                } else {
                    self.$nav.classList.remove('is-active');
                }

                // no-csstransitions fallback
                if (document.documentElement.classList.contains('no-csstransitions')) {
                    self.$nav.classList.remove('is-active');
                }
            }
        });
    }
};
window.addEventListener("load", function(){
    navigation.init();
    //не трогай мою пипиську :>
    getlocalSession();
    //googleapi
    gapi.auth2.init({
        client_id: '229868658683-e06s32it6p4pmerht2jpvdke2lcnf7st.apps.googleusercontent.com'
    });
    //vkapi
    window.vkAsyncInit = function() {
        VK.init({
           apiId: 7565001
        });
     };

     setTimeout(function() {
        var el = document.createElement("script");
        el.type = "text/javascript";
        el.src = "https://vk.com/js/api/openapi.js?168";
        el.async = true;
        document.getElementById("vk_api_transport").appendChild(el);
     }, 0);
     window.vkAsyncInit();
});
