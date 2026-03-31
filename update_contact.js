const fs = require('fs');
const p = '/home/karthik/project/design/src/odinhire/jobs/jobs.11tydata.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));

d.candidates.forEach((c) => {
  const firstName = c.name.split(' ')[0].toLowerCase();
  const lastName = c.name.split(' ')[1] ? c.name.split(' ')[1].toLowerCase() : 'user';
  
  c.contact = {
    email: `${firstName}.${lastName}@example.com`,
    phone: `+91 98${Math.floor(Math.random() * 90000000 + 10000000)}`,
    linkedin: `https://linkedin.com/in/${firstName}-${lastName}`,
    resume_url: `/assets/resumes/${c.id}.pdf`
  };
});

fs.writeFileSync(p, JSON.stringify(d, null, 2), 'utf8');
console.log('Successfully added contact information to all candidates.');
