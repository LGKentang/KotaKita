'use server'
export async function GetOffers(token: string | null) {
    try {
        if (!token) {
            return { success: false, message: 'Token is missing' }; 
          }
      const res = await fetch(`${process.env.BACKEND_URI}/getOffer`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
      });
      if (!res.ok) {
        throw new Error(`Error getOffer: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  }

export async function UpdateOfferStatus(token: string | null, petitionId: number, status: 'Accepted' | 'Decline') {
  try {
    if (!token) {
      return { success: false, message: 'Token is missing' };
    }

    const res = await fetch(`${process.env.BACKEND_URI}/setOfferStatus`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        petition_id: petitionId,
        status: status,
      }),
    });

    if (!res.ok) {
      throw new Error(`Error setOfferStatus: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}



