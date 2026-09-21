// ---- signup ----
var SIGNUP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwW3vC4t2RSdw7LJwwZMbtbWVRR-DBcEDLmyIXBXyuFNUqElRq4ZPXma_ucQgN6S3C6/exec';

// Values match the radio options in #plan-radios and the "plan" column in the sheet.
var PLAN_FIRM = 'Firm / White-Label';
var PLAN_UNSURE = 'Not sure yet';

function submitToSheet(data){
  var fd = new FormData();
  Object.keys(data).forEach(function(k){ fd.append(k, data[k]); });
  // Apps Script web apps don't return CORS headers for cross-origin fetch, so
  // we use no-cors: the request still reaches the script and appends the row,
  // we just can't read the response back. Treat a resolved promise (no thrown
  // network error) as success.
  return fetch(SIGNUP_ENDPOINT, { method: 'POST', mode: 'no-cors', body: fd });
}
function showHeroStatus(msg, isError){
  var el = document.getElementById('hero-status');
  el.textContent = msg;
  el.classList.toggle('is-error', !!isError);
  el.style.display = 'block';
}
function showConfirm(){
  var box = document.getElementById('confirm-box');
  document.getElementById('confirm-success').style.display = '';
  document.getElementById('confirm-error').style.display = 'none';
  box.classList.add('show');
  box.scrollIntoView({behavior:'smooth', block:'nearest'});
}
function showConfirmError(){
  var box = document.getElementById('confirm-box');
  document.getElementById('confirm-success').style.display = 'none';
  document.getElementById('confirm-error').style.display = '';
  box.classList.add('show');
  box.scrollIntoView({behavior:'smooth', block:'nearest'});
}
// Hero quick-capture is aimed at firms, so it's tagged as a firm lead.
// Individuals are pointed at the full form via the "watch your own mark" link.
function quickSignup(e){
  e.preventDefault();
  var email = document.getElementById('hero-email').value.trim();
  if(!email) return false;
  var btn = document.querySelector('#hero-form button[type=submit]');
  var original = btn.textContent;
  btn.disabled = true; btn.textContent = 'Sending…';
  submitToSheet({ name:'', email:email, plan:PLAN_FIRM, isFirm:'true' })
    .then(function(){
      btn.textContent = "You're in ✓";
      document.getElementById('f-email').value = email;
      showHeroStatus("You're on the list — we'll reach out before launch to talk through white-label setup.", false);
    })
    .catch(function(){
      btn.disabled = false; btn.textContent = original;
      showHeroStatus('Something went wrong — try the form below or email ethan@cascade-ip.com directly.', true);
    });
  return false;
}
function selectPlan(planLabel, isFirm){
  document.getElementById('signup').scrollIntoView({behavior:'smooth'});
  var radios = document.querySelectorAll('#plan-radios input[type=radio]');
  var matched = false;
  radios.forEach(function(r){ if(r.value === planLabel){ r.checked = true; matched = true; } });
  if(!matched){
    radios.forEach(function(r){ if(r.value === PLAN_UNSURE){ r.checked = true; } });
  }
  document.getElementById('f-firm').checked = !!isFirm;
}
function submitSignup(e){
  e.preventDefault();
  var name = document.getElementById('f-name').value.trim();
  var email = document.getElementById('f-email').value.trim();
  var plan = document.querySelector('#plan-radios input[type=radio]:checked').value;
  var isFirm = document.getElementById('f-firm').checked;
  if(!email) return false;
  var btn = e.target.querySelector('button[type=submit]');
  var original = btn.textContent;
  btn.disabled = true; btn.textContent = 'Sending…';
  submitToSheet({ name:name, email:email, plan:plan, isFirm:isFirm ? 'true' : 'false' })
    .then(function(){
      btn.textContent = 'Sent ✓';
      showConfirm();
    })
    .catch(function(){
      btn.disabled = false; btn.textContent = original;
      showConfirmError();
    });
  return false;
}
document.getElementById('nav-cta').addEventListener('click', function(){
  document.getElementById('signup').scrollIntoView({behavior:'smooth'});
});
// Picking the firm plan in the form implies the firm checkbox.
document.querySelectorAll('#plan-radios input[type=radio]').forEach(function(r){
  r.addEventListener('change', function(){
    if(r.checked && r.value === PLAN_FIRM){ document.getElementById('f-firm').checked = true; }
  });
});

// ---- motion ----
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce || typeof gsap === 'undefined'){ return; }

  gsap.fromTo('#hero-h1 .line span', {y:'100%'}, {y:'0%', duration:0.8, ease:'power3.out', stagger:0.08});
  gsap.fromTo(['.eyebrow', '#hero-sub', '#hero-form', '#hero-fine', '#hero-alt'],
    {opacity:0, y:14}, {opacity:1, y:0, duration:0.7, ease:'power2.out', stagger:0.08, delay:0.15});
  gsap.fromTo('#scan-panel', {opacity:0, y:18}, {opacity:1, y:0, duration:0.8, ease:'power2.out', delay:0.35});

  var sweepH = document.getElementById('scan-panel') ? document.getElementById('scan-panel').offsetHeight : 260;
  gsap.fromTo('#scan-sweep', {y:0, opacity:0.6}, {
    y:sweepH, opacity:0, duration:2.2, ease:'power1.inOut', repeat:-1, repeatDelay:1.1, delay:1
  });

  if(typeof ScrollTrigger !== 'undefined'){
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('section').forEach(function(sec){
      var head = sec.querySelector('.section-head');
      if(head){
        gsap.fromTo(head, {opacity:0, y:16}, {
          opacity:1, y:0, duration:0.6, ease:'power2.out',
          scrollTrigger:{trigger:head, start:'top 85%'}
        });
      }
      var items = sec.querySelectorAll('.step, .plan, .faq-item');
      if(items.length){
        gsap.fromTo(items, {opacity:0, y:20}, {
          opacity:1, y:0, duration:0.6, ease:'power2.out', stagger:0.08,
          scrollTrigger:{trigger:sec, start:'top 80%'}
        });
      }
      var panel = sec.querySelector('.panel');
      if(panel){
        gsap.fromTo(panel, {opacity:0, y:20}, {
          opacity:1, y:0, duration:0.6, ease:'power2.out',
          scrollTrigger:{trigger:panel, start:'top 85%'}
        });
      }
    });
  }
})();
