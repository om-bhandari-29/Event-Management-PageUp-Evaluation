const createEvent = async(name, place, date, description, startTime, endTime) =>{
    try{
        const res = await fetch('/event/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                place: place,
                date: date,
                description: description,
                startTime: startTime,
                endTime: endTime
            })
        }).then((res)=> res.json())

        if(res.status === 'success'){
            alert("Event Created Successfully");
            location.reload(true);
        }
        else{
            alert("some error occured");
            location.reload(true);
        }
    }
    catch(err){
        console.log(err);
    }
}


const createEventBtnClick = document.getElementById('create_event_btn');
if(createEventBtnClick){

    createEventBtnClick.addEventListener('click', e => {

        const name = document.getElementById('name').value;
        const place = document.getElementById('place').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;

        if(!name || !place || !date || !description || !startTime || !endTime){
            alert("Enter full Details");
            return location.assign('/event/create');
        }
        else{
            createEvent(name, place, date, description, startTime, endTime);
        }
    })
}