const orgLogin = async(email, password) =>{

    try{
        const res = await fetch('/api/organization/signin', {
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
            // location.assign('/volunteerHome');
        }
        else
        // if(res.status === 'UDN'){
        //     alert("user does not exits with given mail id");
        //     location.assign('/login')
        // }
        if(res.status === 'ODN'){
            alert("organization does not exits with given mail id");
            location.assign('/organizationSignup')
        }
        else if(res.status === 'WP'){
            alert("Wrong Password Entered");
            location.reload(true);
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

const orgLoginClick = document.getElementById('orgLoginBtn');
if(orgLoginClick)
{
    orgLoginClick.addEventListener('click', e=>{
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    
        if(email == "" || password == ""){
            alert("Enter Your Credentials");
        }
        else{
            // console.log(email, password);
            orgLogin(email, password);
        }
    })
}