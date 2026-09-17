const fs = require('fs');
const path = require('path');
const Sanscript = require('sanscript');

function readableTransliterate(text, fromScheme) {
  let iast = Sanscript.t(text, fromScheme, 'iast');
  let readable = iast.toLowerCase()
    .replace(/c/g, 'ch')
    .replace(/chhh/g, 'chh')
    .replace(/ś/g, 'sh')
    .replace(/ṣ/g, 'sh')
    .replace(/ñ/g, 'ny')
    .replace(/ṅ/g, 'ng')
    .replace(/ṃ/g, 'n') // m/n depending on context, n is often safer for hindi/marathi bindu before consonants, but let's just stick to m or n. 'n' is mostly fine (e.g. Anand, ant, etc)
    .replace(/ṇ/g, 'n')
    .replace(/ṭ/g, 't')
    .replace(/ḍ/g, 'd')
    .replace(/ṛ/g, 'ru')
    .replace(/ā/g, 'a')
    .replace(/ī/g, 'i')
    .replace(/ū/g, 'u')
    .replace(/ḥ/g, 'h');

  // Title case the words, ignoring punctuation
  return readable.split(' ').map(word => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

const aartisDir = path.join(__dirname, '..', 'src', 'data', 'aartis');
const files = fs.readdirSync(aartisDir).filter(f => f.endsWith('.json'));

let count = 0;
files.forEach(file => {
  const filePath = path.join(aartisDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  let scheme = 'devanagari';
  if (data.language === 'gu') scheme = 'gujarati';
  if (data.language === 'bn') scheme = 'bengali';

  if (data.verses) {
    data.verses.forEach(verse => {
      if (verse.lines) {
        verse.transliteratedLines = verse.lines.map(line => readableTransliterate(line, scheme));
      }
    });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  count++;
});

console.log(`Transliterated verses for ${count} files.`);
