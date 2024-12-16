export interface IPetition {
    id: number;
    user_id: number;
    title: string;
    description: string;
    submissionDate: string;
    status: string;
    institute_id?: number | null; 
    upvotes: number;
    downvotes: number;
    thumbnail_url: string;
    created_at: string; 
    updated_at: string;
}

export interface PetitionForm {
    title : string,
    description : string,
    submissionDate : string;
    status : 'Open' | 'Closed',
    thumbnail : File
}


  