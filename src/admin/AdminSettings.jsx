import React, { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { UserContext } from "../user/Context/UserContext";

const AdminSettings = () => {
  const { user, login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [oldVerified, setOldVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const [profilePic, setProfilePic] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setProfilePic(user.image || "/adminpic.jpg");
    }
  }, [user]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async () => {
    if (!name || !email) {
      toast.warning("Name and email cannot be empty");
      return;
    }
    setUpdatingProfile(true);
    try {
      const res = await api.patch(`admin/profile/${user.id}/`, {
        name,
        email,
        image: profilePic,
      });
      
      // Update context and localStorage
      const updatedUser = { ...user, name, email, image: profilePic };
      login(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast.success("Profile updated successfully");
      navigate("/admin");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const verifyOldPassword = async () => {
    if (!oldPassword) {
      toast.warning("Please enter your current password");
      return;
    }
    setVerifying(true);

    try {
      // Call backend to verify password
      const res = await api.post(`admin/verify-password/`, {
        password: oldPassword,
      });
      
      if (res.data.valid) {
        setOldVerified(true);
        toast.success("Old password verified. You can now set a new password.");
      } else {
        toast.error("Old password is incorrect");
        setOldVerified(false);
      }
    } catch (err) {
      toast.error("Old password is incorrect");
      setOldVerified(false);
    } finally {
      setVerifying(false);
    }
  };

  const resetPasswordFlow = () => {
    setOldPassword("");
    setOldVerified(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handlePasswordChange = async () => {
    if (!oldVerified) {
      toast.warning("Please verify your current password first.");
      return;
    }
    if (!newPassword || !confirmPassword) {
      toast.warning("Please fill new password and confirm it");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    setUpdatingPassword(true);
    try {
      await api.patch(`admin/change-password/${user.id}/`, {
        old_password: oldPassword,
        new_password: newPassword,
      });
      
      resetPasswordFlow();
      toast.success("Password updated successfully");
    } catch (err) {
      console.error("Failed to update password:", err);
      toast.error(err.response?.data?.detail || "Failed to update password");
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading admin settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Profile</h1>

        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-purple-500 shadow-md">
              <img
                src={profilePic || "/adminpic.jpg"}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div> */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

       {/* <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="text-sm text-gray-600 cursor-pointer"
              />        */}

              <button
                onClick={handleProfileUpdate}
                disabled={updatingProfile}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition font-semibold"
              >
                {updatingProfile ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Change Password
            </h3>

            {!oldVerified ? (
              <div className="flex flex-col sm:flex-row gap-3 relative">
                <div className="flex-1 relative">
                  <input
                    type={showOld ? "text" : "password"}
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-3 top-3 text-gray-600"
                  >
                    {showOld ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                <button
                  onClick={verifyOldPassword}
                  disabled={verifying}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition font-semibold"
                >
                  {verifying ? "Verifying..." : "Verify"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <input
                      type={showNew ? "text" : "password"}
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-3 text-gray-600"
                    >
                      {showNew ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>

                  <div className="relative flex-1">
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-3 text-gray-600"
                    >
                      {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handlePasswordChange}
                    disabled={updatingPassword}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-lg hover:shadow-lg transition font-semibold"
                  >
                    {updatingPassword ? "Updating..." : "Update Password"}
                  </button>

                  <button
                    onClick={resetPasswordFlow}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
