import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      toast.error("Failed to update profile!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 mt-20">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          My Profile
        </h2>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-28 h-28">
            <img
              src={
                formData.photoURL ||
                "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover shadow-sm"
            />
          </div>
          <h3 className="text-xl font-semibold mt-4 text-gray-800">
            {formData.displayName || "No Name Set"}
          </h3>
          <p className="text-gray-500 text-sm">{formData.email}</p>
        </div>

        {/* Profile Info Form */}
        <form
          onSubmit={handleUpdate}
          className="space-y-5 border-t border-gray-100 pt-6"
        >
          {/* Name */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-4 py-3 border ${
                editing ? "border-gray-300" : "border-gray-200 bg-gray-50"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-900`}
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-4 py-3 border ${
                editing ? "border-gray-300" : "border-gray-200 bg-gray-50"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-900`}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-4 py-3 border ${
                editing ? "border-gray-300" : "border-gray-200 bg-gray-50"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-900 min-h-[100px]`}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-3">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="px-5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
