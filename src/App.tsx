import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import Landing from './pages/landing/Landing'
import AboutUs from './pages/aboutUs/AboutUs'
import TermsPage from './pages/terms_policies/Terms'
import PrivacyPage from './pages/terms_policies/Policy'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App