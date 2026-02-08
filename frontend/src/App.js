import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import './styles/main.css';

// Public Pages
import Home from './pages/public/Home';
import Search from './pages/public/Search';
import ListingDetail from './pages/public/ListingDetail';
import Auth from './pages/public/Auth';
import About from './pages/public/About';
import HowItWorks from './pages/public/HowItWorks';
import Contact from './pages/public/Contact';

// Tenant Pages
import TenantDashboard, { TenantDashboardHome } from './pages/tenant/Dashboard';
import TenantProfile from './pages/tenant/Profile';
import TenantFavorites from './pages/tenant/Favorites';
import TenantBookings from './pages/tenant/Bookings';
import TenantMessages from './pages/tenant/Messages';
import RoommateFinder from './pages/tenant/RoommateFinder';

// Owner Pages
import OwnerDashboard, { OwnerDashboardHome } from './pages/owner/Dashboard';
import OwnerListings from './pages/owner/Listings';
import CreateListing from './pages/owner/CreateListing';
import OwnerRequests from './pages/owner/Requests';

// Admin Pages
import AdminDashboard, { AdminDashboardHome } from './pages/admin/Dashboard';
import AdminListings from './pages/admin/Listings';
import AdminUsers from './pages/admin/Users';
import AdminSupport from './pages/admin/Support';
import AdminContent from './pages/admin/Content';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/search" element={<Layout><Search /></Layout>} />
          <Route path="/listing/:id" element={<Layout><ListingDetail /></Layout>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Tenant Routes */}
          <Route
            path="/tenant"
            element={
              <ProtectedRoute roles={['tenant', 'admin']}>
                <TenantDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<TenantDashboardHome />} />
            <Route path="profile" element={<TenantProfile />} />
            <Route path="favorites" element={<TenantFavorites />} />
            <Route path="bookings" element={<TenantBookings />} />
            <Route path="messages" element={<TenantMessages />} />
            <Route path="roommate" element={<RoommateFinder />} />
            <Route path="searches" element={<TenantFavorites />} />
          </Route>

          {/* Owner Routes */}
          <Route
            path="/owner"
            element={
              <ProtectedRoute roles={['owner', 'admin']}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<OwnerDashboardHome />} />
            <Route path="listings" element={<OwnerListings />} />
            <Route path="listings/create" element={<CreateListing />} />
            <Route path="requests" element={<OwnerRequests />} />
            <Route path="messages" element={<TenantMessages />} />
            <Route path="reviews" element={<OwnerListings />} />
            <Route path="profile" element={<TenantProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboardHome />} />
            <Route path="listings" element={<AdminListings />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="support" element={<AdminSupport />} />
            <Route path="content" element={<AdminContent />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Layout><Home /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
