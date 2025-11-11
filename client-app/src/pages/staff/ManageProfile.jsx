import React, { useEffect, useState } from "react";
import { getProfile } from "../../api/api";
import "./ManageProfile.css";

const ManageProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error("❌ Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Gọi API update nếu BE hỗ trợ (vd: PUT /api/auth/profile)
      console.log("Updated data:", formData);
      setProfile(formData);
      setIsEditing(false);
      alert("✅ Profile updated (frontend only, add API to save)");
    } catch (error) {
      console.error("❌ Failed to save profile:", error);
    }
  };

  if (!profile) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">Manage Profile</h1>
      <div className="profile-card">
        <div className="profile-row">
          <label>Full Name:</label>
          {isEditing ? (
            <input
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.fullName}</span>
          )}
        </div>

        <div className="profile-row">
          <label>Email:</label>
          {isEditing ? (
            <input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.email}</span>
          )}
        </div>

        <div className="profile-row">
          <label>Role:</label>
          <span className="profile-role">{profile.role || "User"}</span>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="btn save" onClick={handleSave}>
                💾 Save
              </button>
              <button
                className="btn cancel"
                onClick={() => setIsEditing(false)}
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <button className="btn edit" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
