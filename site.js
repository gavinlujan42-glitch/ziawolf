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
