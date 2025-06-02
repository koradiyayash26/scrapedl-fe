import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import { Dashboard } from "./components/layouts";
import { MoviewDetailPage } from "./pages/moview_detail_page";
import { QualityOptions } from "./pages/quality_options";
import { DownloadLinks } from "./pages/download_links";
import { Automate } from "./pages/automate";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path='/movie-details' element={<MoviewDetailPage />} />
            <Route path='/quality-options' element={<QualityOptions />} />
            <Route path='/download-links' element={<DownloadLinks />} />
            <Route path='/automate' element={<Automate />} />
            <Route path='/:id' element={<MoviewDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
