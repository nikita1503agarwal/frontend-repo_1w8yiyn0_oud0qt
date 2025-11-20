import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import MaterialsPage from './pages/MaterialsPage'
import WorksheetPage from './pages/WorksheetPage'
import QuizPage from './pages/QuizPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/worksheet" element={<WorksheetPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
