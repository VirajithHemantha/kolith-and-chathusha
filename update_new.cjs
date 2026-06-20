const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist') {
        filelist = walkSync(filePath, filelist);
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.html')) {
        filelist.push(filePath);
      }
    }
  });
  return filelist;
};

const files = walkSync('./src');
files.push('./index.html');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Names & Parents
  content = content.replace(/Saman udakumbura/g, 'Susantha Kalyanadasa');
  content = content.replace(/anjana silva/g, 'Shamali Perera');
  content = content.replace(/Renold walter janz/g, 'L. R Jayanath');
  content = content.replace(/Gayatri Manike/g, 'Lakshmi Samarakoon');
  content = content.replace(/Achali/g, 'Kolith');
  content = content.replace(/Manul/g, 'Chathusha');
  
  // Text fixes for Groom/Bride
  content = content.replace(/Loving Son of Mr\. Susantha/g, 'Loving Son of Mr. Susantha');
  
  // Date & Time
  content = content.replace(/Wednesday 30 December 2026 At 11 AM/g, 'Saturday 24 October 2026 At 6 PM');
  content = content.replace(/Dec 30, 2026/g, 'Oct 24, 2026');
  content = content.replace(/30 DECEMBER 2026/g, '24 OCTOBER 2026');
  content = content.replace(/30 December 2026/g, '24 October 2026');
  content = content.replace(/11:00 AM/g, '6:00 PM');
  content = content.replace(/11\.00 AM/g, '6.00 PM');
  content = content.replace(/11\.15 AM/g, '6.15 PM');
  content = content.replace(/1\.30 PM/g, '8.00 PM');
  content = content.replace(/4\.00 PM/g, '11.00 PM');
  
  // Specific replacements
  content = content.replace(/Wednesday<\/p>/g, 'Saturday</p>');
  content = content.replace(/Wedding Lunch/g, 'Wedding Dinner');
  content = content.replace(/lunch to celebrate/g, 'dinner to celebrate');
  content = content.replace(/\[PORUWA CEREMONY AT 11\.15AM\]/g, '[HOMECOMING CELEBRATION AT 6.00PM]');
  content = content.replace(/Poruwa Ceremony/g, 'Homecoming Celebration');
  content = content.replace(/The traditional and sacred Poruwa ceremony where we unite our lives in front of our loved ones\./g, 'A beautiful evening as we celebrate our new journey together as husband and wife.');
  content = content.replace(/November 15/g, 'October 1');

  // Venue
  content = content.replace(/Eagle's Lakeside Attidiya/g, 'White Tower Banquet Hall');
  content = content.replace(/Eagle's Lakeside/g, 'White Tower Banquet Hall');
  content = content.replace(/Attidiya, Dehiwala/g, 'Dream Banquet');
  content = content.replace(/Attidiya/g, 'Dream Banquet');
  content = content.replace(/https:\/\/maps\.app\.goo\.gl\/Yye9NC7DLC79Kh9w6\?g_st=ic/g, 'https://maps.app.goo.gl/iAyoUxWSmehDd8Kq9?g_st=ic');
  
  // Colors - Theme Red and Black
  content = content.replace(/#8B3355/g, '#000000'); // Main text and dark elements
  content = content.replace(/#D4AF37/g, '#E60000'); // Gold to Red
  content = content.replace(/#B8941F/g, '#B91C1C'); // Darker gold to Darker Red
  
  // Tailwind classes
  content = content.replace(/from-pink-50 via-white to-orange-50\/40/g, 'from-red-50 via-white to-neutral-100');
  content = content.replace(/via-pink-50\/50/g, 'via-red-50/50');
  content = content.replace(/via-pink-50\/30/g, 'via-red-50/30');
  content = content.replace(/from-pink-400 to-pink-500/g, 'from-red-500 to-red-600');
  content = content.replace(/from-amber-400 to-amber-500/g, 'from-neutral-700 to-black');
  content = content.replace(/from-rose-400 to-rose-500/g, 'from-red-400 to-red-500');
  content = content.replace(/from-orange-400 to-orange-500/g, 'from-neutral-800 to-black');
  
  // Envelope specific colors
  content = content.replace(/#B5745C/g, '#E60000');
  content = content.replace(/#B96649/g, '#000000');
  content = content.replace(/#FFFCF9/g, '#ffffff');
  content = content.replace(/#FDF7F0/g, '#fafafa');
  content = content.replace(/#D58264/g, '#222222');
  content = content.replace(/#C67254/g, '#111111');
  content = content.replace(/#D17C5F/g, '#333333');
  content = content.replace(/#C16D4F/g, '#222222');
  content = content.replace(/#D9896A/g, '#444444');
  content = content.replace(/#CC7A5C/g, '#333333');
  content = content.replace(/#CD7556/g, '#E60000');
  content = content.replace(/#A65236/g, '#990000');
  
  // HTML Title
  content = content.replace(/Achali & Manul/g, 'Kolith & Chathusha');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}

console.log('Update complete.');
