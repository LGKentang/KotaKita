'use server';

export async function fetchCommentsByPetitionId(petitionId: number): Promise<any> {
    try {
        const response = await fetch(`${process.env.BACKEND_URI}/getComments?project_id=null&petition_id=${petitionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching comments for petition_id ${petitionId}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch comments by petition ID');
    }
}

export async function fetchCommentsByProjectId(projectId: number): Promise<any> {
    try {
        const response = await fetch(`${process.env.BACKEND_URI}/getComments?project_id=${projectId}&petition_id=null`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching comments for project_id ${projectId}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch comments by project ID');
    }
}

export async function postComment({
    projectId = null,
    petitionId = null,
    message,
    token
}: {
    projectId?: number | null;
    petitionId?: number | null;
    message: string;
    token: string | null
}): Promise<any> {
    if ((!projectId && !petitionId) || (projectId && petitionId)) {
        throw new Error("You must provide either projectId or petitionId, but not both.");
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URI}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                project_id: projectId,
                petition_id: petitionId,
                message,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Error posting comment: ${response.statusText}`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to post comment.");
    }
}