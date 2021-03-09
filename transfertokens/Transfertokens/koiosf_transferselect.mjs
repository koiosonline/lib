import {LinkClickButton, LinkVisible, setElementVal} from '../../lib/koiosf_util.mjs';
import {updateDisplayedToken} from '../Transfertokens/koiosf_transfertokens.mjs';

export var SelectedToken;

window.addEventListener('DOMContentLoaded', asyncloaded);

async function asyncloaded() {
    LinkVisible("scr_select"  ,ScrSelectMadeVisible);
    LinkClickButton("TitanToken",setClassicTitan);
    LinkClickButton("TitanPD20B", setTitanPD20B);
    LinkClickButton("TitanL320B", setTitanT1tan);
    setElementVal("__label", "T1tan", "TitanL320B")
}

async function ScrSelectMadeVisible() {
    console.log("Opened selection screen");
}

export function setClassicTitan(){
	SelectedToken="Titan";
    localStorage.setItem("SelectedToken", SelectedToken);
    updateDisplayedToken();
}

export function setTitanPD20B(){
	SelectedToken="TitanPD20B";
    localStorage.setItem("SelectedToken", SelectedToken);
    updateDisplayedToken();
}

export function setTitanT1tan(){
	SelectedToken="T1tan";
    localStorage.setItem("SelectedToken", SelectedToken);
    updateDisplayedToken();
}