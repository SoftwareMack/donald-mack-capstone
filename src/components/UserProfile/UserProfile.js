// UserProfile.js

import React, { useState } from 'react';
import './UserProfile.scss'; // Import the corresponding SCSS file

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="user-profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-picture">
        {profilePicture ? (
          <img src={profilePicture} alt="User Profile" />
        ) : (
          <div className="default-picture">Default Picture</div>
        )}
      </div>
      <label htmlFor="profile-image" className="upload-label">
        Upload Profile Picture
      </label>
      <input
        type="file"
        id="profile-image"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default UserProfile;
