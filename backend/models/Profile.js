const db = require("../config/database");

class Profile {
  // CREATE - Add new developer profile
  static async create(profileData) {
    const {
      name,
      email,
      location,
      skills,
      experienceYears,
      availableForWork,
      hourlyRate,
    } = profileData;

    // Convert skills array to JSON string for MySQL storage
    const skillsJson = JSON.stringify(skills);

    const sql = `INSERT INTO profiles (name, email, location, skills, experienceYears, availableForWork, hourlyRate) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    try {
      const [results] = await db.execute(sql, [
        name,
        email,
        location,
        skillsJson,
        experienceYears,
        availableForWork,
        hourlyRate,
      ]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // READ - Get all profiles with pagination
  static async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const sql = "SELECT * FROM profiles LIMIT ? OFFSET ?";

    try {
      const [results] = await db.execute(sql, [limit, offset]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // READ - Get single profile by ID
  static async getById(id) {
    const sql = "SELECT * FROM profiles WHERE id = ?";

    try {
      const [results] = await db.execute(sql, [id]);
      return results[0]; // Return first result
    } catch (error) {
      throw error;
    }
  }

  // UPDATE - Update profile by ID
  static async update(id, profileData) {
    const {
      name,
      email,
      location,
      skills,
      experienceYears,
      availableForWork,
      hourlyRate,
    } = profileData;
    const skillsJson = JSON.stringify(skills);

    const sql = `UPDATE profiles 
                 SET name = ?, email = ?, location = ?, skills = ?, experienceYears = ?, availableForWork = ?, hourlyRate = ?
                 WHERE id = ?`;

    try {
      const [results] = await db.execute(sql, [
        name,
        email,
        location,
        skillsJson,
        experienceYears,
        availableForWork,
        hourlyRate,
        id,
      ]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // SEARCH - Search by skills or location
  static async search(searchTerm) {
    const sql = `SELECT * FROM profiles 
                 WHERE location LIKE ? OR JSON_CONTAINS(skills, ?)`;

    try {
      const [results] = await db.execute(sql, [
        `%${searchTerm}%`,
        `"${searchTerm}"`,
      ]);
      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Profile;
