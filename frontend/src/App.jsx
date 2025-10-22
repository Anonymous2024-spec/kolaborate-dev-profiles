import React, { useState, useEffect } from "react";
import { profileAPI } from "./services/api";
import ProfileCard from "./components/ProfileCard";
import SearchBar from "./components/SearchBar";
import ProfileForm from "./components/ProfileForm";
import LoadingState from "./components/LoadingState";
import EmptyState from "./components/EmptyState";
import Pagination from "./components/Pagination";

function App() {
  // State management
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProfiles, setTotalProfiles] = useState(0);
  const profilesPerPage = 6;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    skills: "",
    experienceYears: "",
    availableForWork: true,
    hourlyRate: "",
  });

  // Fetch all profiles with pagination
  const fetchProfiles = async (page = 1) => {
    try {
      setLoading(true);
      const response = await profileAPI.getAll(page, profilesPerPage);

      console.log("API Response:", response.data); // Debug log

      let profilesData = [];
      let totalCount = 0;
      let calculatedTotalPages = 1;

      if (Array.isArray(response.data)) {
        // Simple array response
        profilesData = response.data;
        totalCount = profilesData.length;
        calculatedTotalPages = Math.ceil(totalCount / profilesPerPage);
      } else if (response.data && Array.isArray(response.data.data)) {
        // Paginated response
        profilesData = response.data.data;
        totalCount =
          response.data.pagination?.totalProfiles || profilesData.length;
        calculatedTotalPages =
          response.data.pagination?.totalPages ||
          Math.ceil(totalCount / profilesPerPage);
      } else {
        console.error("Unexpected response format:", response.data);
        profilesData = [];
      }

      setProfiles(profilesData);
      setTotalProfiles(totalCount);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      alert("Failed to load profiles: " + error.message);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Search profiles (disable pagination during search)
  const searchProfiles = async (term) => {
    if (!term.trim()) {
      setCurrentPage(1);
      fetchProfiles(1);
      return;
    }
    try {
      setLoading(true);
      const response = await profileAPI.search(term);

      let profilesData = [];
      if (Array.isArray(response.data)) {
        profilesData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        profilesData = response.data.data;
      }

      setProfiles(profilesData);
      setTotalPages(1);
      setTotalProfiles(profilesData.length);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching profiles:", error);
      const filtered = Array.isArray(profiles)
        ? profiles.filter(
            (profile) =>
              profile.skills?.some((skill) =>
                skill.toLowerCase().includes(term.toLowerCase())
              ) || profile.location?.toLowerCase().includes(term.toLowerCase())
          )
        : [];
      setProfiles(filtered);
      setTotalPages(1);
      setTotalProfiles(filtered.length);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchProfiles(newPage);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Create new profile
  const createProfile = async (profileData) => {
    try {
      const processedData = {
        ...profileData,
        skills: profileData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill),
        experienceYears: parseInt(profileData.experienceYears) || 0,
        hourlyRate: parseFloat(profileData.hourlyRate) || 0,
      };

      await profileAPI.create(processedData);
      setShowForm(false);
      setFormData({
        name: "",
        email: "",
        location: "",
        skills: "",
        experienceYears: "",
        availableForWork: true,
        hourlyRate: "",
      });
      // Refresh and go to first page
      setCurrentPage(1);
      fetchProfiles(1);
      alert("Profile created successfully!");
    } catch (error) {
      alert(
        "Error creating profile: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  // Handle search term changes
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    searchProfiles(term);
  };

  // Handle form data changes
  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  // Handle add developer button
  const handleAddDeveloper = () => {
    setShowForm(true);
  };

  // Handle form close
  const handleFormClose = () => {
    setShowForm(false);
  };

  useEffect(() => {
    fetchProfiles(currentPage);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            🚀 Kolaborate Developer Profiles
          </h1>
          <p className="text-xl opacity-90">Find and manage developer talent</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onAddDeveloper={handleAddDeveloper}
        />

        <ProfileForm
          show={showForm}
          onClose={handleFormClose}
          onSubmit={createProfile}
          formData={formData}
          onFormChange={handleFormChange}
        />

        {loading && <LoadingState />}

        {!loading && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                👥 Developer Profiles ({totalProfiles})
              </h2>
              {totalPages > 1 && (
                <p className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {profiles.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
