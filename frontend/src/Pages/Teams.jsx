import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {getAllTeams} from "../http/teamApi";
import CloseIcon from "@mui/icons-material/Close";
import TeamCardSmall from "../Components/TeamCardSmall";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState('');

    async function fetchTeams() {
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
        fetchTeams();

    }, [])


    return (
        <Box>
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
                        <TeamCardSmall
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