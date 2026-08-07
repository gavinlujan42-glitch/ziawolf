const agents = [
  ["DISCOVERY","Interviewer","Turns daily work into stories, epics and acceptance criteria."],
  ["PROCESS","Workflow Scribe","Captures the real routine, decisions, handoffs and friction."],
  ["DATA","DBA","Models durable data, migrations, integrity and performance."],
  ["ANALYSIS","Business Analyst","Connects mission outcomes to system behavior."],
  ["DELIVERY","Product Lead","Protects priorities, outcomes and the product boundary."],
  ["AGILE","Scrum Master","Keeps the delivery system moving and impediments visible."],
  ["ENGINEERING","Software Architect","Shapes APIs, services, integration and technical runway."],
  ["SECURITY","CISO","Threat-models the work and keeps trust measurable."],
  ["PLATFORM","Cloud Engineer","Builds observable, portable and cost-aware infrastructure."],
  ["QUALITY","Test Engineer","Turns assumptions into repeatable evidence."],
  ["WATER","Water Scribe","Connects water knowledge, records, GIS and human questions."],
  ["GOVERNANCE","Chief of Staff","Keeps decisions, risk, accountability and communication aligned."]
];

const board = document.querySelector('#agentBoard');
const output = document.querySelector('#terminalOutput');

agents.forEach(([code,name,mission], index) => {
  const button = document.createElement('button');
  button.className = 'agent';
  button.innerHTML = `<b>${String(index + 1).padStart(2,'0')} // ${code}</b><strong>${name}</strong><small>SELECT SIGNAL ↘</small>`;
  button.addEventListener('click', () => {
    document.querySelectorAll('.agent').forEach(el => el.classList.remove('active'));
    button.classList.add('active');
    output.innerHTML = `&gt; SIGNAL ${String(index + 1).padStart(2,'0')} ACQUIRED<br>&gt; ROLE: ${name.toUpperCase()}<br>&gt; MISSION: ${mission}<br>&gt; STATUS: READY FOR HUMAN DIRECTION`;
  });
  board.appendChild(button);
});

const header = document.querySelector('.masthead');
addEventListener('scroll', () => header.style.borderBottomColor = scrollY > 40 ? 'rgba(71,197,184,.25)' : 'rgba(238,232,219,.15)', {passive:true});

// NM GeoGIS operations picture. Schematic layers are explicitly prototype data.
if (window.L && document.querySelector('#nmMap')) {
  const map = L.map('nmMap', {zoomControl:true, attributionControl:true}).setView([34.45,-106.05], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  const fiber=L.layerGroup().addTo(map), leo=L.layerGroup().addTo(map), outage=L.layerGroup().addTo(map);
  const fiberStyle={color:'#47c5b8',weight:2,opacity:.82,dashArray:'7 7'};
  [
    [[36.90,-104.44],[35.69,-105.94],[35.08,-106.65],[34.06,-106.89],[32.32,-106.76]],
    [[35.08,-106.65],[35.53,-108.74],[35.69,-108.77]],
    [[35.08,-106.65],[34.40,-103.20]],
    [[32.32,-106.76],[32.27,-107.76]]
  ].forEach(points=>L.polyline(points,fiberStyle).bindTooltip('SCHEMATIC FIBER CORRIDOR',{className:'ops-tooltip'}).addTo(fiber));
  const sites={abq:[35.0844,-106.6504],santaFe:[35.6870,-105.9378],gallup:[35.5281,-108.7426],lascruces:[32.3199,-106.7637],roswell:[33.3943,-104.5230],farmington:[36.7281,-108.2187]};
  Object.entries(sites).forEach(([name,latlng])=>L.circleMarker(latlng,{radius:5,color:'#d6ccba',weight:1,fillColor:'#47c5b8',fillOpacity:.75}).bindTooltip(`${name.toUpperCase()} // NETWORK NODE`,{className:'ops-tooltip'}).addTo(fiber));
  [[35.2,-106.3,120],[34.1,-105.6,145],[32.8,-106.4,125],[36.0,-107.0,120]].forEach(([lat,lng,r])=>L.circle([lat,lng],{radius:r*1000,color:'#6f79bc',weight:1,opacity:.42,fillColor:'#58629d',fillOpacity:.045,dashArray:'3 8'}).bindTooltip('LEO SERVICE ZONE // SCHEMATIC',{className:'ops-tooltip'}).addTo(leo));
  [['abq','FIBER DEGRADATION // SIMULATED','#c69648'],['gallup','BACKHAUL LOSS // SIMULATED','#a94e35'],['lascruces','LEO LATENCY // SIMULATED','#47c5b8']].forEach(([key,label,color])=>L.circleMarker(sites[key],{radius:11,color,weight:1,fillColor:color,fillOpacity:.15}).bindTooltip(label,{className:'ops-tooltip'}).addTo(outage));
  document.querySelectorAll('[data-layer]').forEach(input=>input.addEventListener('change',()=>{const layer={fiber,leo,outage}[input.dataset.layer];input.checked?layer.addTo(map):map.removeLayer(layer)}));
  document.querySelectorAll('.incident[data-focus]').forEach(button=>button.addEventListener('click',()=>map.flyTo(sites[button.dataset.focus],9,{duration:1.2})));
  const clock=document.querySelector('#mapClock'); const tick=()=>{if(clock)clock.textContent=`UTC ${new Date().toISOString().slice(11,19)}`}; tick(); setInterval(tick,1000); setTimeout(()=>map.invalidateSize(),150);
}
