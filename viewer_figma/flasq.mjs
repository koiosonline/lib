// https://browserhow.com/how-to-clear-chrome-android-history-cookies-and-cache-data/
// imports
import {HideButton,DragItem,publish,subscribe,LinkClickButton,CanvasProgressInfoClass,LinkVisible,ForAllElements,setElementVal,getElementVal,DomList,getElement} from '../lib/koiosf_util.mjs';
import {SetupLogWindow} from '../lib/koiosf_log.mjs';



//Unused variables
/*import {} from './koiosf_playvideo.mjs';
var globalplayer=0;
export var currentvidinfo;
import {SelectNextLesson,GlobalLessonList } from './koiosf_lessons.mjs';
import {} from './koiosf_subtitles.mjs';
import {UpdateTranscript,SetVideoTranscriptCallbacks} from './koiosf_showtranscript.mjs';
import {UpdateSlide} from './koiosf_slides.mjs';
import {} from './koiosf_notes.mjs';
import {InitSpeak,StopSpeak,StartSpeak,EnableSpeech,IsSpeechOn} from './koiosf_speech.mjs';
import {} from './koiosf_popup.mjs';
import {} from './koiosf_messages.mjs';
import {} from './koiosf_music.mjs';
import {GetCourseInfo} from './koiosf_course.mjs';
import {} from './koiosf_login.mjs';
import {} from './koiosf_literature.mjs';
import {} from './koiosf_screenlayout.mjs';
import {} from './koiosf_comments.mjs';
import {} from './koiosf_quiz.mjs';
import {} from './koiosf_badges.mjs';
import {} from './koiosf_leaderboard.mjs';
var position;
var logpos;
var logtext=0;
var logipfs;
var slide;
var SecondsToSubtitle=[];
var globalyoutubeid; // global for onYouTubeIframeAPIReady
var previous_colour=""
var previous_row=-1;
var table
var tablediv
var captionLanguageGlobal = "en";
var vidproginput=0;
var vidprogress=0;
var fSoundOn=true;
*/

// Global variables


async function asyncloaded() {
    addStyle(`
        [class*="Button"] {
            border-radius: 7px;
            
        }
    `);
    LoadCSS('https://philffm.github.io/lib/viewer_figma/flasq.css');
    initTextFields();
    initLottie('https://assets3.lottiefiles.com/private_files/lf30_c7yhrgse.json');
    initYoutube('https://www.youtube.com/watch?v=7dzNcHe1mL0')
}

function initYoutube(youtubeUrl){
    var youtubeElement = getElement("videowrapper");
    youtubeElement.innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/7dzNcHe1mL0?controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

}

function initLottie(lottieUrl){
    LoadJS('https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js');
    var lottieElement = getElement("glasscaraffe");

    lottieElement.innerHTML = '<lottie-player src="'+ lottieUrl +  '" background="transparent"  speed=".5"  style="width: 500px; height: 500px;" loop autoplay></lottie-player>';
}

function initTextFields(){
    var target=getElement("Input");
    target.contentEditable="true"; // make div editable
    target.style.whiteSpace = "pre"; //werkt goed in combi met innerText
    target.style.color = "black";
}


SetupLogWindow();
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
window.addEventListener('DOMContentLoaded', asyncloaded);  // load



function LoadCSS(cssurl){
    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = cssurl;
    document.head.appendChild(link);
}

function LoadJS(jsurl){
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', jsurl);
    document.head.appendChild(script);
}

function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
  }
  