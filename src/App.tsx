import { Routes, Route } from "react-router-dom";
import StripePage from "./layouts/StripePage/StripePage";
import LoginPage from "./layouts/LoginPage/LoginPage";
import RegisterPage from "./layouts/RegisterPage/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HomePage from "./layouts/HomePage/HomePage";
import NewPost from "./layouts/NewPost/NewPost";
import {useAppSelector} from "./hooks/redux";
import Header from "./components/Header/Header";
import {Box} from "@mui/material";

function App() {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

    return (
        <>
            <Header/>
            <Box sx={{marginTop: '60px'}}>
                <Routes>
                    <Route path="/" element={<StripePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute isAllowed={isAuthenticated}>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/newPost"
                        element={
                            <ProtectedRoute isAllowed={isAuthenticated}>
                                <NewPost />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Box>
        </>
    );
}

export default App;

