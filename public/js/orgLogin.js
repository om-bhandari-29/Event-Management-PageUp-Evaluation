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
            location.assign('/organizationHome');
        }
        else
        if(res.status === 'ODN'){
            alert("organization does not exits with given mail id");
            // location.assign('/organizationSignup')
        }
        else if(res.status === 'WP'){
            alert("Wrong Password Entered");
            // location.reload(true);
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
                // console.log(email, password);
                orgLogin(email, password.value);
            }
        }
    });
})

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