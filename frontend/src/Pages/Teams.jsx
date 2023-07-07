import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Skeleton, Typography} from "@mui/material";
import {getAllTeams} from "../http/teamApi";
import CloseIcon from "@mui/icons-material/Close";
import TeamCard from "../Components/TeamCard";
import {infiniteLoading} from "../http/TESTinfiniteLoading";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    async function fetchTeams() {
        // const res = await infiniteLoading();
        const res = await getAllTeams();
        if (res.success) {
            setTeams(res.body);
        }
        else {
            const msg = res.body || "Произошла ошибка!";
            setError(msg);
        }
    }


    useEffect(() => {
        fetchTeams().then(
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
                        justifyContent: 'center'
                    }}
                >
                    <CircularProgress size={56}/>
                </Box>
            }
            {!!error &&
                <Box sx={{
                    bgcolor: 'error.main',
                    py: 1,
                    width: 1,
                    color: 'error.contrastText',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: 1
                }}>
                    <Typography>
                        {error}
                    </Typography>
                    <CloseIcon onClick={() => setError('')}/>
                </Box>
            }


            <Box display={'flex'} gap={3} flexDirection={'column'}>
                {teams.map((team) =>
                    <Box key={team.id}>
                        <TeamCard
                            id={team.id}
                            name={team.name}
                            image={team.image}
                            leader={team.leader}
                            playerCount={team.playerCount}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Teams;