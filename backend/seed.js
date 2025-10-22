require("dotenv").config();
const db = require("./config/database");

const sampleProfiles = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    location: "New York",
    skills: ["React", "Node.js", "TypeScript"],
    experienceYears: 5,
    availableForWork: true,
    hourlyRate: 85,
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    location: "San Francisco",
    skills: ["Python", "Django", "PostgreSQL"],
    experienceYears: 3,
    availableForWork: true,
    hourlyRate: 75,
  },
  {
    name: "Carol Davis",
    email: "carol@example.com",
    location: "Remote",
    skills: ["Vue.js", "JavaScript", "CSS"],
    experienceYears: 4,
    availableForWork: false,
    hourlyRate: 70,
  },
  {
    name: "David Wilson",
    email: "david@example.com",
    location: "Austin",
    skills: ["Java", "Spring Boot", "MySQL"],
    experienceYears: 6,
    availableForWork: true,
    hourlyRate: 90,
  },
  {
    name: "Eva Brown",
    email: "eva@example.com",
    location: "Chicago",
    skills: ["React", "GraphQL", "MongoDB"],
    experienceYears: 2,
    availableForWork: true,
    hourlyRate: 65,
  },
];

// Insert sample data
sampleProfiles.forEach((profile) => {
  const skillsJson = JSON.stringify(profile.skills);
  const sql = `INSERT IGNORE INTO profiles (name, email, location, skills, experienceYears, availableForWork, hourlyRate) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.execute(
    sql,
    [
      profile.name,
      profile.email,
      profile.location,
      skillsJson,
      profile.experienceYears,
      profile.availableForWork,
      profile.hourlyRate,
    ],
    (err, results) => {
      if (err) console.error("Error inserting profile:", err);
      else console.log(`Inserted profile: ${profile.name}`);
    }
  );
});

console.log("Seed data completed!");
