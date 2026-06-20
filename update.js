const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/#183d72/g, '#8B3355');
app = app.replace(/from-slate-50 via-white to-slate-100\/40/g, 'from-pink-50 via-white to-orange-50/40');
app = app.replace(/via-blue-50\/50/g, 'via-pink-50/50');
app = app.replace(/via-blue-50\/30/g, 'via-pink-50/30');
app = app.replace(/Thursday 07 May 2026 At 9 AM/g, 'Wednesday 30 December 2026 At 11 AM');
app = app.replace(/May 07, 2026/g, 'Dec 30, 2026');
app = app.replace(/Thursday<\/p>/g, 'Wednesday</p>');
app = app.replace(/9:00 AM<\/p>/g, '11:00 AM</p>');
app = app.replace(/Seven Say Banquet Hall/g, Eagle\\'s Lakeside Attidiya);
app = app.replace(/Magalegoda, Veyangoda/g, 'Attidiya, Dehiwala');
app = app.replace(/\[PORUWA CEREMONY AT 9.20AM\]/g, '[PORUWA CEREMONY AT 11.15AM]');
app = app.replace(/17 April 2026/g, '10 December 2026');
fs.writeFileSync('src/App.tsx', app);
console.log('App.tsx updated');

let env = fs.readFileSync('src/components/EnvelopeOpening.tsx', 'utf8');
env = env.replace(/Thursday Morning/g, 'Wednesday Morning');
env = env.replace(/MAY 07, 2026/g, 'DECEMBER 30, 2026');
env = env.replace(/At 9:00 AM/g, 'At 11:00 AM');
env = env.replace(/Seven Say Banquet Hall/g, Eagle\\'s Lakeside);
env = env.replace(/Magalegoda, Veyangoda/g, 'Attidiya');
fs.writeFileSync('src/components/EnvelopeOpening.tsx', env);
console.log('EnvelopeOpening.tsx updated');

