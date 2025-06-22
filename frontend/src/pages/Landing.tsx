import { useState } from "react";
import AuthModal from "../components/AuthModal";
import BrowseRooms from "../components/BrowseRooms";
import Dashboard from "../components/Dashboard";
import FeaturedRooms from "../components/FeaturedRooms";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import RoomDetails from "../components/RoomDetails";
import Testimonials from "../components/Testimonials";
import { AuthProvider } from "../context/AuthContext";
import { useRooms } from "../hooks/useRooms";


function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const { rooms, favorites, toggleFavorite } = useRooms();

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedRoom(null);
  };

  const handleViewDetails = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  const handleBook = (roomId: string) => {
    alert('Booking functionality would be implemented with payment integration!');
  };

  const handleMessage = (landlordId: string) => {
    alert('Messaging functionality would be implemented here!');
  };

  const selectedRoomData = rooms.find(room => room.id === selectedRoom);

  const renderContent = () => {
    switch (currentView) {
      case 'browse':
        return <BrowseRooms onMessage={handleMessage} />;
      case 'dashboard':
        return <Dashboard />;
      case 'home':
      default:
        return (
          <>
            <Hero onBrowseClick={() => setCurrentView('browse')} />
            <FeaturedRooms onViewDetails={handleViewDetails} />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        currentView={currentView}
        onViewChange={handleViewChange}
      />
      
      {renderContent()}
      
      {currentView === 'home' && <Footer />}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {selectedRoom && selectedRoomData && (
        <RoomDetails
          room={selectedRoomData}
          onClose={() => setSelectedRoom(null)}
          onBook={handleBook}
          onMessage={handleMessage}
          isFavorite={favorites.includes(selectedRoom)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

function Landing() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default Landing;