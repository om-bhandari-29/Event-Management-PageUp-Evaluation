const deleteVolunteer = async (volid) => {

    try{
        const responce = await fetch(`api/volunteer/${volid}`, {
            method: 'DELETE'
        }).then((res) => res.json());

        if(responce.status === 'success'){
            alert('Volunter deleted successfully');
            location.assign('/');
        }
    }
    catch(err){
        console.log(err);
        alert('Error accured while deleting post');
    }
}

const delVolClick = document.getElementById('vol_del_btn');
if(delVolClick){
    delVolClick.addEventListener('click', e => {
        const volid = e.target.dataset.volid;
        // console.log("Void "+volid);
        deleteVolunteer(volid);
    })
}