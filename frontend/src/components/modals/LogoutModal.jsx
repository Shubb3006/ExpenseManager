import React, { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ setIsLogout }) => {
  const { logout } = useAuthStore();
  async function handleLogout() {
    await logout();
    setIsLogout(false);
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsLogout(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setIsLogout]);

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <p>Do you want to Logout</p>
        <div className="modal-action">
          <button autoFocus className="btn btn-error " onClick={handleLogout}>
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
