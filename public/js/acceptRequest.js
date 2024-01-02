const acceptRequest = async (clickId, eventId, volId) => {
    try{
        const responce = await fetch(`/event/accept/${eventId}/${volId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json());

        if(responce.status === 'success'){
            alert('Request accepted successfully');
            // document.getElementById('clickId').click = 'disable'
            location.reload(true);
        }
    }
    catch(err){
        console.log(err);
        alert('Error accured');
    }
}

function func(clickId, volId, eventId){
    // console.log(clickId);
    console.log(volId);
    console.log(eventId);

    const btn = document.getElementById(clickId);
    if(btn){
        btn.disabled = true
        acceptRequest(clickId, eventId, volId);
    }
}