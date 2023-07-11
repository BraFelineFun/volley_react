import {CssBaseline} from "@mui/material";
import {Box} from "@mui/system";
import Header from "./Components/Header";
import TeamCard from "./Components/TeamCard";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import {Provider} from "react-redux";
import store from './Store/store';
import Teams from "./Pages/Teams";
import Team from "./Pages/Team";
import {LOGIN_ROUTE, MAIN_ROUTE, TEAM_ROUTE, TEAMS_ROUTE, USER_ROUTE, USERS_ROUTE} from "./utils/consts";
import Users from "./Pages/Users";
import User from "./Pages/User";


function getRouter() {
    return createBrowserRouter([
        {
            path: MAIN_ROUTE,
            element: <Root/>,
            errorElement: <Error/>,
            children: [
                {
                    index: true,
                    element: <Home/>
                },
                {
                    path: TEAMS_ROUTE,
                    element: <Teams/>
                },
                {
                    path: TEAM_ROUTE + '/:id',
                    element: <Team/>
                },
                {
                    path: TEAM_ROUTE,
                    element: <Team/>
                },
                {
                    path: USERS_ROUTE,
                    element: <Users/>
                },
                {
                    path: USER_ROUTE + '/:id',
                    element: <User/>
                }

            ]
        },
        {
            path: LOGIN_ROUTE,
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
                    maxWidth: "md",
                    minWidth: 300,
                    width: 1,
                    minHeight: 'calc(100vh - 80px)',
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