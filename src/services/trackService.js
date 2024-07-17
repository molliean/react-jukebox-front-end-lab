const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL + '/tracks'

async function index(){
    const response = await fetch(BASE_URL)
    const data = await response.json()
    if(response.ok) return data
    throw new Error(data.error)
}

async function create(formData){
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const data = await response.json();
    if(response.ok) return data
    throw new Error(data.error)
}

async function updateTrack(trackId, formData){
    const response = await fetch(`${BASE_URL}/${trackId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const data = await response.json();
    if(response.ok) return data
    throw new Error(data.error)
}

async function deleteTrack(trackId){
    const response = await fetch(`${BASE_URL}/${trackId}`, {
        method: 'DELETE'
    })
    const data = await response.json()
    if(response.ok) return data
    throw new Error(data.error)
}

export { index, create, updateTrack, deleteTrack }