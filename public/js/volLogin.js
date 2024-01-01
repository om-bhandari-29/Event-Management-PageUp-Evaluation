const volLogin = async(email, password) =>{

    try{
        const res = await fetch('/api/volunteer/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res)=> res.json())

        if(res.status === 'success'){
            alert("success")
            return location.assign('/volunteerHome');
        }
        else
        if(res.status === 'UDN'){
            // alert("volunteer does not exits with given mail id");
            // location.assign('/volunteerSignup')
            document.getElementById('udn_span').style.display = 'inline'
            document.getElementById('wp_span').style.display = 'none'
            // document.getElementById('udn_span') = "User Does Not Exists"
        }
        else if(res.status === 'WP'){
            // alert("Wrong Password Entered");
            document.getElementById('wp_span').style.display = 'inline'
            document.getElementById('udn_span').style.display = 'none'
            // location.reload(true);
            // document.getElementById('udn_span') = "Wrong Password"
        }
        else{
            alert("Some Error occured");
            location.assign('/')
        }
    }
    catch(err){
        console.log(err);
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const password = document.getElementById("password");
    password.addEventListener('keypress', function(event) {

        if (event.key === 'Enter') {

            const passwordVal = password.value;
            const email = document.getElementById("email").value;

            if(email == "" || passwordVal == ""){
                alert("Enter Your Credentials");
            }
            else{
                // console.log(email, passwordVal);
                volLogin(email, password.value);
            }
        }
    });
})

const volLoginClick = document.getElementById('volLoginBtn');
if(volLoginClick)
{
    volLoginClick.addEventListener('click', e=>{
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    
        if(email == "" || password == ""){
            alert("Enter Your Credentials");
        }
        else{
            // console.log(email, password);
            volLogin(email, password);
        }
    })
}