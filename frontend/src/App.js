import Home from './Pages/Home'
import Details from './Pages/Listing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/books/:id" element={<Details />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default App
