import React, { useState } from 'react'

const Form = () => {
    const [sentData, setSentData] = useState(0);
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        address: "",
        message: ""
    })
    let inputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    let submitHandler = async (e) => {
        e.preventDefault();
        let response = await fetch('https://reactform-b1407-default-rtdb.firebaseio.com/reacrformdata.json', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)

        })
        console.log(response);
        if (response.status === 200) {
            setUser({
                name: "",
                surname: "",
                email: "",
                address: "",
                message: ""
            })
            setSentData(200)
        }
        else {
            setSentData(404)
            console.log("error");
        }
    }
    let getData = async () => {
        let response = await fetch('https://reactform-b1407-default-rtdb.firebaseio.com/reacrformdata.json');
        let data = await response.json()
        console.log(data)
    }
    return (
        <div className=''>
            {sentData === 200 ?

                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>success!</strong>Data submitted successfully.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                :
                //  sentData === 400 ? <div className="alert alert-danger alert-dismissible fade show" role="alert">
                //     <strong>Failed!</strong>Data not submitted.
                //     <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                //         <span aria-hidden="true">&times;</span>
                //     </button>
                // </div> : 
                <></>
            }
            <form method="POST" onSubmit={submitHandler}>

                <div className=' form-group row'>
                    <label htmlFor="name" className=' col-md-2'>Name:</label>
                    <input id="name" name='name' type="text" value={user.name} onChange={inputChange} className=' form-control col-md-8' required />
                </div>
                <div className=' form-group row'>
                    <label htmlFor="surname" className=' col-md-2'>Surname:</label>
                    <input id="surname" name='surname' type="text" value={user.surname} onChange={inputChange} className=' form-control col-md-8' required />
                </div>
                <div className=' form-group row'>
                    <label htmlFor="email" className=' col-md-2'>Email:</label>
                    <input id="email" name='email' type="email" value={user.email} onChange={inputChange} className=' form-control col-md-8' required />
                </div>
                <div className=' form-group row'>
                    <label htmlFor="address" className=' col-md-2'>Address:</label>

                    <textarea name="address" id="address" cols="10" rows="3" value={user.address} onChange={inputChange} className=' form-control col-md-8' required></textarea>
                </div>
                <div className=' form-group row'>
                    <label htmlFor="message" className=' col-md-2'>Message:</label>

                    <textarea name="message" id="message" cols="10" rows="3" value={user.message} onChange={inputChange} className=' form-control col-md-8' required></textarea>
                </div>
                <div className="row d-flex justify-content-center">
                    <input type="submit" value="Submit Form" className='btn btn-success' />
                </div>
            </form>
            <button className="btn btn-info" onClick={getData}>get data</button>
            <div>

            </div>

        </div>
    )
}

export default Form