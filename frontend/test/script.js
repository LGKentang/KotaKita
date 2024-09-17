const testFetch = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    
    if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
    } else {
        console.error('Error:', response.status);
    }
}

testFetch();
