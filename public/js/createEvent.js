let remoteDate = new Date();
// remoteDate = remoteDate.toLocaleDateString('en-GB');

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
            const currDate = remoteDate.getDate();
            const currYear = remoteDate.getFullYear();
            const currMonth = remoteDate.getMonth();

            const inputedYear = date.split('-')[0];
            const inputeddate = date.split('-')[2];
            const inputedMonth = date.split('-')[1];
            // console.log(remoteDate.getFullYear());

            if((inputedYear<currYear) || (inputedMonth<currMonth) || (inputeddate<currDate)){
                alert("Please Choose right date");
            }
            else if(startTime === endTime){
                alert("Start Time and End Time cannot be same");
            }
            else
                createEvent(name, place, date, description, startTime, endTime);
        }
    })
}