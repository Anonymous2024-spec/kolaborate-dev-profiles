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
  const profilesPerPage = 6; // Show 6 profiles per page

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
      setProfiles(response.data);

      // Calculate total pages (you might want to get this from backend)
      // For now, we'll estimate based on current data
      const estimatedTotal =
        response.data.length === profilesPerPage
          ? page * profilesPerPage + 1
          : (page - 1) * profilesPerPage + response.data.length;

      setTotalProfiles(estimatedTotal);
      setTotalPages(Math.ceil(estimatedTotal / profilesPerPage));
    } catch (error) {
      console.error("Error fetching profiles:", error);
      alert("Failed to load profiles: " + error.message);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Search profiles (without pagination for simplicity)
  const searchProfiles = async (term) => {
    if (!term.trim()) {
      setCurrentPage(1);
      fetchProfiles(1);
      return;
    }
    try {
      setLoading(true);
      const response = await profileAPI.search(term);
      setProfiles(response.data);
      setTotalPages(1); // Disable pagination during search
      setTotalProfiles(response.data.length);
    } catch (error) {
      console.error("Error searching profiles:", error);
      // Fallback to client-side filtering
      const filtered = profiles.filter(
        (profile) =>
          profile.skills.some((skill) =>
            skill.toLowerCase().includes(term.toLowerCase())
          ) || profile.location?.toLowerCase().includes(term.toLowerCase())
      );
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
      // Refresh and go to first page to see the new profile
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
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            🚀 Kolaborate Developer Profiles
          </h1>
          <p className="text-xl opacity-90">Find and manage developer talent</p>
        </div>
      </header>

      {/* Main Content */}
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

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Profiles Grid */}
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

                {/* Pagination */}
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
