import {CssBaseline} from "@mui/material";
import {Box, createTheme, ThemeProvider} from "@mui/system";
import useTheme from "@mui/material/styles/useTheme";
import Header from "./Components/Header";
import TeamCardSmall from "./Components/TeamCardSmall";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Login from "./Pages/Login";


function getRouter() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            errorElement: <Error/>,
            children: [
                {
                    index: true,
                    element: <Home/>
                },
                {
                    path: '/teams',
                    element: <TeamCardSmall/>
                }
            ]
        },
        {
            path: '/login',
            element: <Login/>
        }
    ]);
    return router;
}


function Root() {
    return (
        <>
            <CssBaseline />
            <Header/>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Box sx={{
                    bgcolor: 'background.paper',
                    maxWidth: "lg",
                    minWidth: 300,
                    minHeight: '100vh',
                    p: {xs: 1, sm: 3}
                }}>
                    <Outlet/>
                </Box>
            </Box>
        </>


    );
}

function App() {
    return (
        <RouterProvider router={getRouter()}/>
    );
}

export default App;




// const theme = createTheme({
//     palette: {
//         background: {
//             paper: '#fff',
//         },
//         text: {
//             primary: '#173A5E',
//             secondary: '#46505A',
//         },
//         action: {
//             active: '#001E3C',
//         },
//         success: {
//             dark: '#009688',
//         },
//     },
// });