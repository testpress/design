const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/testpress/messages/includes/chat_detail.html',
  'src/testpress/messages/includes/aside.html'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace Tailwind logical properties with physical properties
    content = content.replace(/\bps-/g, 'pl-');
    content = content.replace(/\bpe-/g, 'pr-');
    content = content.replace(/\bms-/g, 'ml-');
    content = content.replace(/\bme-/g, 'mr-');
    content = content.replace(/\binset-s-0\b/g, 'left-0');
    content = content.replace(/\binset-e-0\b/g, 'right-0');
    content = content.replace(/\bstart-0\b/g, 'left-0');
    content = content.replace(/\bend-0\b/g, 'right-0');
    content = content.replace(/\bborder-s\b/g, 'border-l');
    content = content.replace(/\bborder-s-/g, 'border-l-');
    content = content.replace(/\bborder-e\b/g, 'border-r');
    content = content.replace(/\bborder-e-/g, 'border-r-');
    content = content.replace(/\brounded-s-/g, 'rounded-l-');
    content = content.replace(/\brounded-e-/g, 'rounded-r-');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
