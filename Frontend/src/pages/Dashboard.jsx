import React from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Bell,
  User,
  MapPin,
  Activity,
  Wrench,
  BookOpen,
  PlusCircle,
  FileText,
  Briefcase,
  TrendingUp,
  Map,
  Filter,
  Users
} from "lucide-react";

import "../styles/DashboardCSS.css";

const Dashboard = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate(); // ✅

  const logout = async () => {
    try {
      await api.post(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      // ✅ Always clear auth
      setAuth({ user: null, accessToken: "", refreshToken: "" });

      // ✅ Remove from storage (VERY IMPORTANT)
      localStorage.removeItem("auth");

      // ✅ Redirect to login
      navigate("/login");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Users size={28} />
          </div>
          <h2>SkillShare Hub</h2>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/skills/add" className="nav-item">
            <FileText size={20} /> <span>Submit Data</span>
          </NavLink>
          <NavLink to="/skills/explore" className="nav-item">
            <TrendingUp size={20} /> <span>Community Data</span>
          </NavLink>
          <NavLink to="/dashboard" className="nav-item active">
            <Activity size={20} /> <span>Activities</span>
          </NavLink>
          <NavLink to="/skills/explore" className="nav-item">
            <Map size={20} /> <span>Status</span>
          </NavLink>
          <NavLink to="/dashboard" className="nav-item">
            <User size={20} /> <span>Profile</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Welcome {auth.user?.username}</h1>

          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={22} />
            </button>

            <div className="profile-btn">
              <User size={20} />
              <span>{auth.user?.email}</span>
            </div>

            {/* ✅ FIXED LOGOUT */}
            <button className="btn-logout" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        {/* Banner */}
        <section className="action-banner">
          <h2>Welcome back 👋</h2>
          <p>Connect, share skills, and grow your community.</p>
          <button className="btn-primary" onClick={() => navigate("/skills/add")}>
            <PlusCircle size={18} /> Offer Service
          </button>
        </section>

        {/* Grid */}
        <div className="dashboard-grid">
          <div className="card">
            <div className="card-header">
              <h3>
                <MapPin size={18} /> Nearby Activities
              </h3>
            </div>

            <div className="activity-item">
              <Wrench size={18} />
              <div>
                <h4>Music Class</h4>
                <p>2 hours • Park</p>
              </div>
            </div>

            <div className="activity-item">
              <BookOpen size={18} />
              <div>
                <h4>Math Tutoring</h4>
                <p>Tomorrow • Library</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>
                <Activity size={18} /> Services
              </h3>
              <Filter size={18} />
            </div>

            <div className="grid-list">
              <div className="service-card">
                <Wrench size={24} />
                <p>Tech</p>
              </div>

              <div className="service-card">
                <BookOpen size={24} />
                <p>Tutoring</p>
              </div>

              <div className="service-card">
                <Briefcase size={24} />
                <p>Jobs</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;