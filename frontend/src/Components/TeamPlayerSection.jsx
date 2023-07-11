import React, {useMemo, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Badge, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserCard from "./UserCard";

const TeamPlayerSection = ({isLeader = false, players = []}) => {
    const [expandedAccordion, setExpandedAccordion] = useState('Active');
    const AccordionStatuses = useMemo(() => {
        function getFilteredByStatusPlayers(status) {
            return players.filter((player) => player.TEAM_2_PLAYER.status === status)
        }
        function getIsBadged() {
            const pendingStatus = leaderStatuses.filter((status) => status.status === 'pending')[0];
            return !!(Array.isArray(pendingStatus.players) && pendingStatus.players.length);
        }


        const publicStatuses = [
            {status: 'approved', players: getFilteredByStatusPlayers('approved'), badged: false},
            {status: 'left', players: getFilteredByStatusPlayers('left'), badged: false},
        ];
        const leaderStatuses = [
            {status: 'rejected', players: getFilteredByStatusPlayers('rejected'), badged: false},
            {status: 'pending', players: getFilteredByStatusPlayers('pending'), badged: false}
        ];
        if (isLeader) {
            leaderStatuses[1].badged = getIsBadged();
            return [...leaderStatuses, ...publicStatuses];
        }
        return publicStatuses;
    }, [players, isLeader])



    const handleAccordionExpand = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : false);
    };

    return (
        <div>
            {AccordionStatuses.map((AccordionStatus) => {
                return (
                    <Accordion
                        key={AccordionStatus.status}
                        expanded={expandedAccordion === AccordionStatus.status}
                        onChange={handleAccordionExpand(AccordionStatus.status)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: 'grey.500'}}/>}>
                            {AccordionStatus.badged?
                                <Badge variant='dot' color='warning'>
                                    <Typography textTransform='capitalize'>
                                        {AccordionStatus.status + ' Players'}
                                    </Typography>
                                </Badge>
                                :
                                <Typography textTransform='capitalize'>
                                    {AccordionStatus.status + ' Players'}
                                </Typography>
                            }
                        </AccordionSummary>
                        <AccordionDetails sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            {(Array.isArray(AccordionStatus.players) && AccordionStatus.players.length)?
                                AccordionStatus.players.map((player) => (
                                <UserCard
                                    key={player.id}
                                    id={player.playerUser.id}
                                    name={player.playerUser.name}
                                    email={player.playerUser.email}
                                    image={player.playerUser.image}
                                />
                                ))
                                :
                                '...'
                            }
                        </AccordionDetails>
                    </Accordion>
                )
                }
            )}
        </div>
    );
};

export default TeamPlayerSection;