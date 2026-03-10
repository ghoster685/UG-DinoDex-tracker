const dinos = [{name:"Aurasaur", colors:20},{name:"Beastasaur", colors:21},{name:"Chadalodon", colors:20},{name:"Chilladon", colors:21},{name:"Chompasaurus", colors:21},{name:"Choomamasaur", colors:20},{name:"Chugadon", colors:20},{name:"Cryodon", colors:20},{name:"Crystadon", colors:20},{name:"Diemorphugon", colors:21},{name:"Dilophosugus", colors:22},{name:"Dragadon", colors:22},{name:"Flaptor", colors:20},{name:"Gertierex", colors:20},{name:"Gertiesaur", colors:20},{name:"Grugadon", colors:21},{name:"Magmadon", colors:24},{name:"Mammothor", colors:21},{name:"Newbisaurus", colors:20},{name:"Raptoe", colors:21},{name:"Razorclaw", colors:21},{name:"Shelldon", colors:20},{name:"Skellemagmon", colors:20},{name:"Sugnash", colors:20},{name:"Swoopclaw", colors:20},{name:"Swoopjaw", colors:21},{name:"Terrordactyl", colors:21},{name:"Torknash", colors:20},{name:"Triskeletops", colors:20},{name:"Tyrugosaur Rex", colors:22},{name:"UGlisaur", colors:21},{name:"UGlitoe", colors:20},{name:"Unkylosaurus", colors:21}];

function loadDex(){
const dex = document.getElementById("dex");
dex.innerHTML = "";

dinos.forEach(dino => {
let d = document.createElement("div");
d.className = "dino";

let eggKey = dino.name+"_egg";
let eggCount = localStorage.getItem(eggKey) || 0;

let colorsHTML = "";

for(let i=0;i<dino.colors;i++){
let key = dino.name+"_color_"+i;
let count = parseInt(localStorage.getItem(key) || 0);

let colorDinosHTML = "";

for(let j=0;j<count;j++){
let colorDinoLevelKey = dino.name+"_color_"+i+"_dino_"+j+"_level";
let colorDinoLevel = localStorage.getItem(colorDinoLevelKey) || 0;

colorDinosHTML += `
<div class="color-dino-container">
<p>Dino #${j+1} - Level: <button onclick="changeColorDinoLevel('${colorDinoLevelKey}',-1)">-</button><span id="${colorDinoLevelKey}">${colorDinoLevel}</span><button onclick="changeColorDinoLevel('${colorDinoLevelKey}',1)">+</button></p>
</div>
`;
}

colorsHTML += `
<div class="color">
<h4>#${i}</h4>
<img src="images/colors/${dino.name}_${i}.png"
onerror="this.src='images/placeholder.png'">
<br>
<p>Count: <button onclick="changeColor('${key}',-1)">-</button><span id="${key}">${count}</span><button onclick="changeColor('${key}',1)">+</button></p>
<div class="color-dinos">
${colorDinosHTML}
</div>
</div>
`;
}

d.innerHTML = `
<h2 class="dino-title" onclick="toggleDino('${dino.name}')">${dino.name} ▼</h2>

<div id="dino-content-${dino.name}" class="dino-content hidden">

<img src="images/dinos/${dino.name}.png"
onerror="this.src='images/placeholder.png'">

<h3>Egg</h3>

<img src="images/eggs/${dino.name}_egg.png"
onerror="this.src='images/placeholder.png'">

<br>

<button onclick="changeEgg('${eggKey}',-1)">-</button>
<span id="${eggKey}">${eggCount}</span>
<button onclick="changeEgg('${eggKey}',1)">+</button>

<h3>Colors</h3>
<div class="colors">
${colorsHTML}
</div>

</div>
`;
dex.appendChild(d);
});
}

function toggleDino(dinoName){
const content = document.getElementById(`dino-content-${dinoName}`);
const title = document.querySelector(`h2[onclick*="${dinoName}"]`);

content.classList.toggle("hidden");

if(content.classList.contains("hidden")){
title.innerHTML = `${dinoName} ▼`;
} else {
title.innerHTML = `${dinoName} ▲`;
}
}

function changeEgg(key,amount){
let val = parseInt(localStorage.getItem(key) || 0);
val += amount;
if(val < 0) val = 0;
localStorage.setItem(key,val);
document.getElementById(key).innerText = val;
}

function changeColor(key,amount){
let val = parseInt(localStorage.getItem(key) || 0);
val += amount;
if(val < 0) val = 0;
localStorage.setItem(key,val);
document.getElementById(key).innerText = val;
loadDex();
}

function changeColorDinoLevel(key,amount){
let val = parseInt(localStorage.getItem(key) || 0);
val += amount;
if(val < 0) val = 0;
localStorage.setItem(key,val);
document.getElementById(key).innerText = val;
}

loadDex();
