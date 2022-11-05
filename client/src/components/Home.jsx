import React, { Suspense } from "react";
import { Header } from "./";
import { Route, Routes } from "react-router-dom";
// import StartPage from "./StartPage.jsx";
// import PremiumPage from "./PremiumPage";
// import SearchPage from "./SearchPage";
// import MyPlaylistPage from "./MyPlaylistPage";
import LoadingSpinner from "../UI/LoadingSpinner";
const StartPage = React.lazy(() => import("./StartPage"));
const PremiumPage = React.lazy(() => import("./PremiumPage"));
const SearchPage = React.lazy(() => import("./SearchPage"));
const MyPlaylistPage = React.lazy(() => import("./MyPlaylistPage"));

const Home = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-amber-900">
      <Header />

      <div className="my-4 w-full p-4">
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/home" element={<StartPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/playlist" element={<MyPlaylistPage />} />
            <Route path="/premium" element={<PremiumPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
