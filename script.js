(() => {
  'use strict';

  /* ── Custom cursor ──────────────────────────── */
  const cur = document.getElementById('cursor');
  let mx=0,my=0,cx=0,cy=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  (function animCur(){
    cx += (mx-cx)*.13; cy += (my-cy)*.13;
    if(cur){ cur.style.left=cx+'px'; cur.style.top=cy+'px'; }
    requestAnimationFrame(animCur);
  })();
  document.querySelectorAll('a,button,.tag,.win,.project,.skill-list span').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
  });

  /* ── Nav mobile ─────────────────────────────── */
  const hbg=document.getElementById('hbg');
  const nl=document.getElementById('nl');
  hbg&&hbg.addEventListener('click',()=>{
    const o=nl.classList.toggle('open');
    hbg.classList.toggle('open',o);
  });
  nl&&nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nl.classList.remove('open'); hbg&&hbg.classList.remove('open');
  }));
  document.addEventListener('keydown',e=>e.key==='Escape'&&nl&&nl.classList.remove('open'));

  /* ── Active nav on scroll ────────────────────── */
  const sections=document.querySelectorAll('section[id],header[id]');
  const navAs=document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll',()=>{
    let current='';
    sections.forEach(s=>{ if(window.scrollY>=s.offsetTop-100) current=s.id; });
    navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
  },{passive:true});

  /* ── Scroll-to-top ───────────────────────────── */
  const stb=document.getElementById('scrollTop');
  window.addEventListener('scroll',()=>stb&&stb.classList.toggle('show',window.scrollY>600),{passive:true});
  stb&&stb.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  /* ── Wrap hero name letters for slide animation */
  document.querySelectorAll('.hn').forEach(hn=>{
    const txt=hn.textContent;
    hn.innerHTML=`<span class="hn-inner">${txt}</span>`;
  });

  /* ── Reveal on scroll ────────────────────────── */
  const rv=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('in'),i*80); rv.unobserve(e.target); }
    });
  },{threshold:.08,rootMargin:'0px 0px -40px 0px'});

  ['.project','.win','.edu-item','.skill-col','.cl',
   '.s-title','.s-label','.about-left','.about-right',
   '.contact-big','.contact-sub'].forEach(sel=>{
    document.querySelectorAll(sel).forEach((el,i)=>{
      el.classList.add('rv');
      el.style.transitionDelay=(i*.05)+'s';
      rv.observe(el);
    });
  });

  /* ── Counter animation ───────────────────────── */
  const cntObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target;
      const to=parseInt(el.dataset.to);
      const suf=el.dataset.suffix||'';
      let s=0; const dur=1600; const t0=performance.now();
      (function tick(now){
        const p=Math.min((now-t0)/dur,1);
        const ease=1-Math.pow(1-p,3);
        el.textContent=Math.floor(s+(to-s)*ease)+suf;
        if(p<1) requestAnimationFrame(tick);
      })(t0);
      cntObs.unobserve(el);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-to]').forEach(el=>cntObs.observe(el));

  /* ── Hero photo parallax ─────────────────────── */
  const photo=document.getElementById('heroPhoto');
  window.addEventListener('scroll',()=>{
    if(photo&&window.scrollY<window.innerHeight){
      photo.style.transform=`translateY(${window.scrollY*.08}px)`;
    }
  },{passive:true});

  /* ── Copy email on click ─────────────────────── */
  document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const email=a.getAttribute('href').replace('mailto:','');
      if(navigator.clipboard){
        e.preventDefault();
        navigator.clipboard.writeText(email).then(()=>{
          const v=a.querySelector('.cl-v');
          if(v){ const o=v.textContent; v.textContent='Copied ✓'; v.style.color='var(--teal)';
            setTimeout(()=>{ v.textContent=o; v.style.color=''; },2000); }
        }).catch(()=>{});
      }
    });
  });

  /* ══════════════════════════════════════════════
     ── PROJECT FILTER ────────────────────────────
  ══════════════════════════════════════════════ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.pcard');
  const emptyState = document.getElementById('projectsEmpty');
  const fcAll      = document.getElementById('fc-all');

  // Set correct total count on load
  if(fcAll) fcAll.textContent = cards.length;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      let visible = 0;
      cards.forEach(card => {
        const cats = card.dataset.cats || '';
        const match = filter === 'all' || cats.split(' ').includes(filter);
        card.classList.toggle('hidden', !match);
        if(match) visible++;
      });

      // Show/hide empty state
      if(emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
    });
  });

  /* ── Console ─────────────────────────────────── */
  console.log('%c DEVAPRAKASH S ','background:#00e5c3;color:#080808;font-weight:700;font-size:1rem;padding:.2rem .5rem');
  console.log('%cSoftware Developer · MCA @ Anna University CEG\n📧 deva27997@gmail.com','color:#00e5c3');
})();