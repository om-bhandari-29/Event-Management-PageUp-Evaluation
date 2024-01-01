const deleteEvent = async (volid) => {

    try{
        const responce = await fetch(`/event/${volid}`, {
            method: 'DELETE'
        }).then((res) => res.json());

        if(responce.status === 'success'){
            alert('Event deleted successfully');
            location.assign('/myEvents');
        }
    }
    catch(err){
        console.log(err);
        alert('Error accured while deleting post');
    }
}

const delEventClick = document.getElementById('event_del_btn');
if(delEventClick){
    delEventClick.addEventListener('click', e => {
        const eventid = e.target.dataset.eventid;
        // console.log("Void "+volid);
        deleteEvent(eventid);
    })
}