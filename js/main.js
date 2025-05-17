// onglets
const buttons = document.querySelectorAll('.tab-buttons button');
const sections = document.querySelectorAll('.tab-content');

buttons.forEach(btn => btn.onclick = () => {
  buttons.forEach(b => b.classList.remove('active'));
  sections.forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(btn.dataset.tab).classList.add('active');
});

// compteurs
const counters = document.querySelectorAll('.stat-number');
const options = { threshold: 0.6 };
const startCount = entry => {
  const el = entry.target, target = +el.dataset.target;
  let current = 0;
  const step = Math.ceil(target / 60); // ~1 sec anim
  const tick = () => {
    current += step;
    if (current >= target){ el.textContent = target; return; }
    el.textContent = current;
    requestAnimationFrame(tick);
  };
  tick();
};

const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ startCount(e); io.unobserve(e.target);} });
}, options);

counters.forEach(c=>io.observe(c));
