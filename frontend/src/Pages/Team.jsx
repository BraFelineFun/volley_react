import {React, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getAllTeams, getOneTeam} from "../http/teamApi";
import {Avatar, Box, CircularProgress, Grid, Paper, Tab, Tabs, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {TEAMS_ROUTE} from "../utils/consts";
import NotFound from "../Components/UI/NotFound";
import Error from "../Components/UI/Error";

const Team = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [team, setTeam] = useState({});
    const [tabView, setTabView] = useState('Players');

    async function fetchTeam() {
        // const res = await infiniteLoading();z
        const res = await getOneTeam(id);
        if (res.success) {
            setTeam(res.body);
        }
        else {
            const msg = res.body || "Произошла ошибка!";
            setError(msg);
        }
    }

    function fomateDate(date) {
        const dateObj = new Date(date);
        const [day, month, year] = [dateObj.getDay(), dateObj.getMonth(), dateObj.getFullYear()];
        return `${day}/${month}/${year}`;
    }


    useEffect(() => {
        if (!id) {
            navigate(TEAMS_ROUTE);
            return;
        }
        fetchTeam().then(
            () => setIsLoading(false),
            () => setIsLoading(false)
        );

    }, [])

    return (
        <Box>
            {isLoading &&
                <Box
                    sx={{
                        width: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        maxWidth: '56px'
                    }}
                >
                    <CircularProgress size={56}/>
                </Box>
            }


            {!!error?
                <Error error={error} setError={setError}/>
                :
                <Grid spacing={2} container width={'100%'}>
                    <Grid
                        md={12}
                        component={Paper}
                        item
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        p={2}
                    >
                        <Box>
                            <Typography variant='h2' fontWeight='bold'>
                                {team.name}
                            </Typography>
                            <Typography fontStyle='italic' variant='subtitle1'>
                                founded: {fomateDate(team.createdAt)}
                            </Typography>
                        </Box>
                        <Box>
                            <Avatar
                                sx={{
                                    width:80,
                                    height: 80,
                                    bgcolor: 'secondary.main',
                                    color: 'secondary.contrastText'
                                }}
                                alt={team.name + ' team avatar'}
                                src={process.env.REACT_APP_BASE_URL + team.image || null}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Tabs
                            value={tabView}
                            onChange={(e, newValue) => setTabView(newValue)}
                        >
                            <Tab value='Players' label='Players'/>
                            <Tab value='Games' label='Games' disabled/>
                        </Tabs>
                    </Grid>
                </Grid>
            }

        </Box>
    );
};

export default Team;