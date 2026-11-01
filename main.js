document.addEventListener('DOMContentLoaded',()=>{
 const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
 if(toggle&&nav) toggle.addEventListener('click',()=>nav.classList.toggle('open'));
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const cfg=window.RS_CONFIG||{};
 document.querySelectorAll('[data-whatsapp]').forEach(a=>{
   const n=(cfg.whatsapp||'').replace(/\D/g,'');
   a.href=n&&!n.includes('XXXXXXXX')?`https://wa.me/${n}?text=${encodeURIComponent('Hello RS Digital Marketing, I would like to discuss a project.')}`:'#';
   a.target='_blank';a.rel='noopener';
   if(a.getAttribute('href')==='#') a.addEventListener('click',e=>{e.preventDefault();alert('Please add your WhatsApp number in assets/js/config.js first.');});
 });
 document.querySelectorAll('[data-email-link]').forEach(a=>a.href=`mailto:${cfg.email||'hello@example.com'}`);
 const items=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});items.forEach(el=>io.observe(el));}else items.forEach(el=>el.classList.add('visible'));
});