import { getToken } from './authenticate';

export async function addToFavourites(id) {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export async function removeFromFavourites(id) {
    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export async function getFavourites() {
    const token= getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites`, {
        method: 'GET',
        headers: {
            'Authorization': `JWT ${token}`
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export async function addToHistory(id) {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export async function removeFromHistory(id) {
    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `JWT ${token}`,
            'content-type': 'application/json'
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export async function getHistory() {
    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history`, {
        method: 'GET',
        headers: {
            'Authorization': `JWT ${token}`
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}