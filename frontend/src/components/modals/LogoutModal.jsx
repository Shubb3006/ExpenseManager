import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ setIsLogout }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  async function handleLogout() {
    await logout();
    setIsLogout(false);
  }
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <p>Do you want to Logout</p>
        <div className="modal-action">
          <button className="btn btn-error " onClick={handleLogout}>
            Logout
          </button>
          <button className="btn btn-ghost" onClick={() => setIsLogout(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
