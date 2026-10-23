import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import AdminLogin from './adminpages/AdminLogin';
import Dashboard from './adminpages/dashboard/Dashboard';
import WesiteVistList from './adminpages/dashboard/WesiteVistList';
import CvDownloads from './adminpages/dashboard/CvDownloads';
import UploadFile from './adminpages/dashboard/UploadFile';
import MusicUpload from './adminpages/dashboard/MusicUpload';
import Enquiries from './adminpages/dashboard/Enquiries';
import ChatEntry from './pages/ChatEntry';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/chat-entry" element={<ChatEntry />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/visits" element={<WesiteVistList />} />
      <Route path="/admin/downloads" element={<CvDownloads />} />
      <Route path="/admin/enquiries" element={<Enquiries />} />
      <Route path="/admin/enquiry" element={<Enquiries />} />
      <Route path="/admin/upload" element={<UploadFile />} />
      <Route path="/admin/music" element={<MusicUpload />} />
    </Routes>
  );
}

export default App;
