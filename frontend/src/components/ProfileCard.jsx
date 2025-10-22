import React from "react";

const ProfileCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
        <span
          className={`text-sm font-semibold px-2 py-1 rounded ${
            profile.availableForWork
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {profile.availableForWork ? "✅ Available" : "❌ Unavailable"}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-gray-600">📧 {profile.email}</p>
        <p className="text-gray-600">📍 {profile.location || "Remote"}</p>
        <p className="text-gray-600">
          💼 {profile.experienceYears} years experience
        </p>
        <p className="text-gray-600">💰 ${profile.hourlyRate}/hour</p>

        <div className="mt-3">
          <strong className="text-gray-700">🛠️ Skills:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;