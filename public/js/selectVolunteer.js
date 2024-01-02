const selectVolunteer = async (eventId, volId) => {

    try{
        const responce = await fetch(`/event/${eventId}/${volId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json());

        if(responce.status === 'success'){
            alert('Volunter selected successfully');
            location.reload(true);
        }
    }
    catch(err){
        console.log(err);
        alert('Error accured while deleting post');
    }
}

function func(clickId, volId, eventId){
    // console.log(clickId);
    console.log(volId);
    console.log(eventId);

    const btn = document.getElementById(clickId);
    if(btn){
        btn.innerHTML = "Selected"
        btn.disabled = true
        // btn.style.display = 'none'
        selectVolunteer(eventId, volId);
    }
}

// const selVolunteerBtnClick = document.getElementById('sel_vol_btn1');
// // const selVolunteerBtnClick = document.querySelector('.sel_vol_btn');
// if(selVolunteerBtnClick){
//     selVolunteerBtnClick.addEventListener('click', e => {
//         // e.style.display = 'none'
//         // e.target.style.display.value = "Selected"
//         selVolunteerBtnClick.textContent = "Selected"
//         // e.target.style.display = 'none'
//     })
// }