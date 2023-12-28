const signup = async(name, email, place, skills, password, number, gender) =>{
    try{
        const res = await fetch('/api/volunteer/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                // mobileNumber: mobileNumber,
                email: email,
                place: place,
                skills: skills,
                password: password,
                number: number,
                gender: gender
            })
        }).then((res)=> res.json())

        if(res.status === 'UAE'){
            alert("VOLUNTEER ALREADY EXIST")
            location.assign('/volunteerSignup')
        }
        else
        if(res.status === 'success'){
            alert("Signed Up successfully");
            location.assign('/')
        }
        else
        if(res.status === 'ECV'){
            alert("Error checking volunteer");
            location.assign('/')
        }
        else{
            alert("some error occured");
            location.assign('/');
        }
    }
    catch(err){
        console.log(err);
    }
}


const vol_signup = document.getElementById('vol_signup');
if(vol_signup)
{
    vol_signup.addEventListener('click', e => {
        const name = document.getElementById('name').value;
        const number = document.getElementById('number').value;
        const email = document.getElementById('email').value;
        const place = document.getElementById('place').value;
        const skills = document.getElementById('skills').value;
        const password = document.getElementById('password').value;
        const confirmpassword = document.getElementById('confirmpassword').value;
        const gender = (document.getElementById('male').value == "male") ? "Male" : "Female";;

        if(!name || !email || !skills || !password || !confirmpassword || !gender){
            alert("Enter full Details");
            return location.assign('/volunteerSignup');
        }

        if(password != confirmpassword){
            alert("Password Doesn't match");
            location.assign('/volunteerSignup');
        }
        else{
            signup(name, email, place, skills, password, number, gender);
        }
    })
}