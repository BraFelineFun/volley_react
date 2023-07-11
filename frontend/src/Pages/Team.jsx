import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getOneTeam} from "../http/teamApi";
import {
    Avatar,
    Box,
    CircularProgress,
    Grid,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import {TEAMS_ROUTE} from "../utils/consts";
import Error from "../Components/UI/Error";
import TeamPlayerSection from "../Components/TeamPlayerSection";
import TeamGameSection from "../Components/TeamGameSection";
import UserCard from "../Components/UserCard";

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
                <Grid
                    container
                    width={'100%'}
                >
                    <Grid xs={12}>
                        <Grid
                            xs={12}
                            item
                            display='flex'
                            justifySelf='center'
                            justifyContent='space-between'
                            alignItems='center'
                            p={2}
                            sx={{
                                flexDirection: {xs: 'column-reverse', sm: 'row'}
                            }}
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
                                        width: 90,
                                        height: 90,
                                        bgcolor: 'secondary.main',
                                        color: 'secondary.contrastText',
                                        border: 2,
                                        borderColor: 'secondary.main'
                                    }}
                                    alt={team.name + ' team avatar'}
                                    src={process.env.REACT_APP_BASE_URL + team.image || undefined}
                                />
                            </Box>
                        </Grid>
                        <Grid
                            xs={12}
                            sm={5}
                            item
                        >
                            <Typography>
                                Club leader:
                            </Typography>
                            {!isLoading &&
                                <UserCard
                                    id={team.leader.id}
                                    name={team.leader.name}
                                />
                            }
                        </Grid>
                    </Grid>

                    <Grid xs={12} mt={2} item>
                        <Tabs
                            value={tabView}
                            onChange={(e, newValue) => setTabView(newValue)}
                        >
                            <Tab value='Players' label='Players'/>
                            <Tab value='Games' label='Games' />
                        </Tabs>
                    </Grid>
                    <Grid xs={12} item p={1} sx={{bgcolor: 'grey.200'}}>
                        {tabView === 'Players' &&
                            <TeamPlayerSection players={team.players}/>
                        }
                        {tabView === 'Games' &&
                            <TeamGameSection/>
                        }
                    </Grid>
                </Grid>
            }

        </Box>
    );
};

export default Team;