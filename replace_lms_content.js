const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/testpress/messages/includes/chat_detail.html',
  'src/testpress/messages/includes/aside.html'
];

const replacements = {
  // chat_detail.html
  "Hi, I'd like to ask some questions. Can I use Preline UI on a client project?": "Hi, I missed yesterday's class because I had a fever. Can I get the recording?",
  "Preline UI, crafted with Tailwind CSS": "UPSC GS Foundation Course 2024",
  "Preline UI is an open-source set of prebuilt UI components based on the utility-first Tailwind CSS framework.": "Comprehensive General Studies preparation program covering Prelims and Mains with daily answer writing and expert mentorship.",
  "https://preline.co/": "https://testpress.in/upsc-foundation/",
  "Yes, you can!": "Yes! The recording has been uploaded.",
  "Preline is a large open-source project": "The mock test is now live on the portal",
  "After the purchase, user should receive two emails, one from us with the details to create an account for Preline Pro and another one from Paddle with the user purchase details including invoice.<br><br>Also need to check the spam folders just in case": "The recording has been uploaded to the course portal. You will receive an email with the link to access it.<br><br>Also, make sure to check the class notes attached in the portal.",
  "Costa Quinn": "Rahul Kumar",
  "Costa": "Rahul",
  "James": "Admin",
  "Preline": "Testpress", // Careful with this, might replace UI classes if not careful, but there are no "Preline" classes usually.
  
  // aside.html (some extra names and texts)
  "Amanda Harvey": "Priya Sharma",
  "Anna Richard": "Karthik N",
  "Alex Brown": "Sneha R",
  "Bob Dean": "Amit Patel",
  "Chun Wa": "Neha Singh",
  "David Harrison": "Vikram Seth",
  "Ella Lauda": "Anita Desai",
  "Elizabeth Cru": "Suresh Kumar",
  "Lewis Clarke": "Ravi Teja",
  "Mark Colbert": "Pooja Hegde",
  "Ols Schols": "Arjun Kapoor",
  "Rachel Doe": "Divya M",

  "When using open method, const select = new HSSelect(document.querySelector('#select'));": "Will tomorrow's class be rescheduled?",
  "How's these all free? 🤯": "I'll renew my subscription today. 💯",
  "Can you please send me a link?": "Can you please send me the syllabus link?",
  "I'm trying to add a new user to my team, but I'm getting an error message.": "I'm trying to access the mock test, but I'm getting an error message.",
  "Looks like user entered the wrong email": "Looks like you entered the wrong email",
  "annarichard@gmail.cm": "karthik@gmail.cm",
  "annarichard@gmail.com": "karthik@gmail.com"
};

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace text
    for (const [key, value] of Object.entries(replacements)) {
      // Create a global regex replacing exact matches
      // Note: Some keys have special characters so we escape them
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // For "Preline", only match whole word to avoid breaking URL or paths, except it's capitalized
      if (key === 'Preline') {
          content = content.replace(/\bPreline\b(?! UI)/g, value);
      } else {
          const regex = new RegExp(escapedKey, 'g');
          content = content.replace(regex, value);
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
