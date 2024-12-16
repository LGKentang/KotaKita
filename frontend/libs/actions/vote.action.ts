'use server';

export async function fetchVotes(token: string | null): Promise<Map<number, string>> {
    // Check if the token is null (guest user)
    if (!token) {
        return new Map(); // Return an empty Map for guest users
    }

    try {
        const response = await fetch(process.env.BACKEND_URI + `/getUserPetitionsWithVote`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            const votes = data.votes || []; // Assuming the API response has a "votes" array

            const voteMap = new Map<number, string>();
            votes.forEach((vote: { petition_id: number; vote_type: string }) => {
                voteMap.set(vote.petition_id, vote.vote_type);
            });

            return voteMap;
        } else {
            throw new Error('Failed to fetch votes');
        }
    } catch (error) {
        console.error('Error fetching votes:', error);
        return new Map(); // Return an empty Map in case of error
    }
}



export async function upvotePetition(token: string | null, petitionId: number): Promise<boolean> {
    if (!token) {
        return false;
    }

    try {
        const response = await fetch(process.env.BACKEND_URI + `/upvote`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ petitionId }), 
        });

        if (response.ok) {
            return true; 
        } else {
            throw new Error('Failed to upvote petition');
        }
    } catch (error) {
        console.error('Error upvoting petition:', error);
        return false; 
    }
}


export async function downvotePetition(token: string | null, petitionId: number): Promise<boolean> {
    if (!token) {
        return false; 
    }

    try {
        const response = await fetch(process.env.BACKEND_URI + `/downvote`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ petitionId }), 
        });

        if (response.ok) {
            return true;
        } else {
            throw new Error('Failed to downvote petition');
        }
    } catch (error) {
        console.error('Error downvoting petition:', error);
        return false;
    }
}
