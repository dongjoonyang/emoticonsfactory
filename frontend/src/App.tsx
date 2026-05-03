import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MiniroomPage from './pages/MiniroomPage/MiniroomPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MiniroomPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
