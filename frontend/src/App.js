import {CssBaseline} from "@mui/material";
import {Box} from "@mui/system";
import Header from "./Components/Header";
import TeamCardSmall from "./Components/TeamCardSmall";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import {Provider} from "react-redux";
import store from './Store/store';
import Teams from "./Pages/Teams";


function getRouter() {
    return createBrowserRouter([
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
                    element: <Teams/>
                }
            ]
        },
        {
            path: '/login',
            element: <Login/>
        }
    ]);
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
        <Provider store={store}>
            <RouterProvider router={getRouter()}/>
        </Provider>
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