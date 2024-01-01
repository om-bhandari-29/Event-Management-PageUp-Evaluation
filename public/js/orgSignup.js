const signup = async(name, email, currentOfficePlace, mainBranch, password) =>{
    try{
        const res = await fetch('/api/organization/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                currentOfficePlace: currentOfficePlace,
                mainBranch: mainBranch,
                password: password
            })
        }).then((res)=> res.json())

        if(res.status === 'OAE'){
            alert("ORGANIZATION ALREADY EXIST")
            // location.assign('/organizationSignup')
        }
        else
        if(res.status === 'success'){
            alert("Signed Up successfully");
            location.assign('/')
        }
        else
        if(res.status === 'ECO'){
            alert("Error checking organization");
            // location.assign('/')
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


const org_signup = document.getElementById('org_signup');
if(org_signup)
{
    org_signup.addEventListener('click', e => {
        document.getElementById('enter_full_details_span').style.display = 'none'
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const currentOfficePlace = document.getElementById('currentOfficePlace').value;
        const mainBranch = document.getElementById('mainBranch').value;
        const password = document.getElementById('password').value;
        const confirmpassword = document.getElementById('confirmpassword').value;

        if(!name || !email || !password || !confirmpassword || !currentOfficePlace || !mainBranch){
            // alert("Enter full Details");
            document.getElementById('enter_full_details_span').style.display = 'inline';  
            // return location.assign('/organizationSignup');
        }
        else
        if(password != confirmpassword){
            // alert("Password Doesn't match");
            // location.assign('/organizationSignup');
            document.getElementById('enter_full_details_span').textContent = "Password and Confirm Password Does not Match"
            document.getElementById('enter_full_details_span').style.display = 'inline'
        }
        else{
            signup(name, email, currentOfficePlace, mainBranch, password);
        }
    })
}