const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// Input validation helper
const validateProfile = (data) => {
  const errors = [];

  if (!data.name || data.name.trim() === "") errors.push("Name is required");
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email))
    errors.push("Valid email is required");
  if (!Array.isArray(data.skills)) errors.push("Skills must be an array");
  if (data.experienceYears && data.experienceYears < 0)
    errors.push("Experience cannot be negative");
  if (data.hourlyRate && data.hourlyRate < 0)
    errors.push("Hourly rate cannot be negative");

  return errors;
};

// GET /api/profiles - List all profiles with pagination
router.get("/", async (req, res) => {
  try {
    console.log("GET /api/profiles called");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const profiles = await Profile.getAll(page, limit);
    const totalCount = await Profile.getTotalCount();

    console.log(`Found ${profiles.length} profiles out of ${totalCount} total`);

    // Parse skills from JSON string back to array
    const parsedProfiles = profiles.map((profile) => ({
      ...profile,
      skills: JSON.parse(profile.skills),
    }));

    // Return proper paginated response
    res.json({
      data: parsedProfiles,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalProfiles: totalCount,
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/profiles:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

// GET /api/profiles/search/:term - Search profiles
router.get("/search/:term", async (req, res) => {
  try {
    console.log("GET /api/profiles/search called with term:", req.params.term);
    const profiles = await Profile.search(req.params.term);
    console.log(`Search found ${profiles.length} profiles`);

    // Parse skills from JSON
    const parsedProfiles = profiles.map((profile) => ({
      ...profile,
      skills: JSON.parse(profile.skills),
    }));

    res.json(parsedProfiles);
  } catch (error) {
    console.error("Error in GET /api/profiles/search:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

// POST /api/profiles - Create new profile
router.post("/", async (req, res) => {
  try {
    console.log("POST /api/profiles called with data:", req.body);
    const errors = validateProfile(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const result = await Profile.create(req.body);
    res.status(201).json({
      message: "Profile created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error in POST /api/profiles:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email already exists" });
    }
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

// GET /api/profiles/:id - Get single profile
router.get("/:id", async (req, res) => {
  try {
    console.log("GET /api/profiles/:id called with id:", req.params.id);
    const profile = await Profile.getById(req.params.id);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Parse skills from JSON
    profile.skills = JSON.parse(profile.skills);

    res.json(profile);
  } catch (error) {
    console.error("Error in GET /api/profiles/:id:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

// PUT /api/profiles/:id - Update profile
router.put("/:id", async (req, res) => {
  try {
    console.log("PUT /api/profiles/:id called with id:", req.params.id);
    const errors = validateProfile(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await Profile.update(req.params.id, req.body);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error in PUT /api/profiles/:id:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
