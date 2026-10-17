import React, { useState } from "react";
import ProfilePopup from "./ProfilePopup";
import defaultPic from "../assets/profile.jpg";

const ProfileSection = () => {
  const [currentPic, setCurrentPic] = useState(defaultPic);
  const [openPopup, setOpenPopup] = useState(false);

  // Default name = User123
  const [name, setName] = useState("User123");

  return (
    <div>
      <img
        src={currentPic}
        alt="Profile"
        style={{
          width: 60,
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onClick={() => setOpenPopup(true)}
      />

      {openPopup && (
        <ProfilePopup
          onClose={() => setOpenPopup(false)}
          onSelect={(img) => {
            setCurrentPic(img);
            setOpenPopup(false);
          }}
          name={name}
          setName={setName}
        />
      )}
    </div>
  );
};

export default ProfileSection;
