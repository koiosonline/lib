import {LinkButton,getElement} from '../lib/koiosf_util.mjs';
import {SetSpeechLang} from './koiosf_speech.mjs';
import {SetglobalplayerSubtitle} from '../viewer_figma/koiosf_viewer.mjs'

//Unused variables
/*
var langbtns; // array of all language buttons;
var langbtns_index=0;
var setofsheets;
var currenttrack=0;
var currentSubtitle=0;
*/
export var currentlang=0;
var SecondsArray=[];
var previous_span=0;
var previous_color=0
var PrepareLanguageButtonsTemplate;
var PrepareLanguageButtonsParent;
var SetVideoSeconds;
var TranscriptShownCB;

export function SelectLanguage(language) {
    SelectTranscriptLanguage(language);
}

function SelectTranscriptLanguage(language) {
    currentlang=language;
    SetglobalplayerSubtitle(currentlang);
}

export function SetVideoTranscriptCallbacks(_SetVideoSeconds,_TranscriptShownCB) {
    SetVideoSeconds = _SetVideoSeconds;
    TranscriptShownCB = _TranscriptShownCB;
}

function SubtitleToSeconds(subtitle) {
    var Seconds=[];
    for (var j=0;j < subtitle.length;j++) {
        var subline=subtitle[j];
        var s=parseInt(subline.start);
        var e=parseInt(parseFloat(subline.start)+parseFloat(subline.dur));
        for (var k=s; k< e;k++)
            Seconds[k]=j;
    }
    return Seconds;
}

function AddTranscripts(domid, subtitle,language) {
    while (domid.firstChild)
        domid.removeChild(domid.lastChild); // first remove previous children

    for (var j=0;j < subtitle.length;j++) {
        var spanprefix=document.createElement("span");spanprefix.innerHTML=`Start: ${Math.round(parseFloat(subtitle[j].start))} `;domid.appendChild(spanprefix);
        var span=document.createElement("span");
        let txtstr=subtitle[j].text;
        txtstr = txtstr.replace(/\.[\.]+/, ''); // replace multiple dots with empty string
        txtstr = txtstr.replace(/\.[\.]+/, ''); // repeat for the situation where ... is added twice
        span.innerHTML=txtstr+" ";
        span.id=`sub-${language}-${j}`;
        span.startsecond=parseInt(subtitle[j].start);
        domid.appendChild(span);
        span.addEventListener("click",SubTitleClicked);
        var spansuffix=document.createElement("span");spansuffix.innerHTML="<br>";domid.appendChild(spansuffix);
    }
}

function HighlightTransscript(id) {
    var sub_span=getElement(id);
    if (sub_span) {
        if (previous_span == sub_span) return;
        previous_color = sub_span.style.color; // remember color
    }
    if (previous_span) previous_span.style.color = previous_color;
    if (sub_span) {
        sub_span.style.color = 'green';
        previous_span = sub_span;
        TranscriptShownCB(sub_span.innerHTML);
    }
}

export function UpdateTranscript(CurrentPos) {   // called frequently
    if (SecondsArray.length > 0 &&  SecondsArray[currentlang]) {
        var res=SecondsArray[currentlang][ parseInt(CurrentPos)]
        HighlightTransscript(`sub-${currentlang}-${res}`);
    }
}

function SubTitleClicked(event) {
    var newpos=event.target.startsecond;
    HighlightTransscript(event.target.id);
    if (SetVideoSeconds)
        SetVideoSeconds(newpos);
}

function PrepareLanguageButtons() {
    var list = getElement("langbtn");
    if (list && list[0]) {
        PrepareLanguageButtonsTemplate = list[0];
        PrepareLanguageButtonsParent   = list[0].parentNode
        list[0].remove();
    } else
        console.error("langbtn not found");
    PrepareLanguageButtons = function(){} // next time do nothing
}

function PrepLanguage(language) {
    PrepareLanguageButtons();
    var domid=getElement(`language-span-${language}`);
    if (domid)
        return domid; // already setup
    var transcripts=getElement("transcripts");
    if (!transcripts) return undefined;
    var languagespan=document.createElement("div");
    languagespan.style.display = "none";
    languagespan.id=`language-span-${language}`;
    transcripts.appendChild(languagespan);
    var cln = PrepareLanguageButtonsTemplate.cloneNode(true);
    PrepareLanguageButtonsParent.appendChild(cln);
    cln.id=`language-button-${language}`; // assign id's
    cln.innerHTML=language; // lang_translated;
    return languagespan;
}

export async function FoundTranscript(arraypromise,language) {
    var subtitle = await arraypromise;
    var domid=PrepLanguage(language);
    AddTranscripts(domid,subtitle,language);
    SecondsArray[language]=SubtitleToSeconds(subtitle);
}