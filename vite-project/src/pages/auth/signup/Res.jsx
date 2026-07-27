import React, { useState } from 'react'

export default function Res() {

    let name
    let value
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState(null)

    const validation = () => {
        let error = {}

        if (!data.name) {
            error.name = 'Enter Your Name'
        }
        if (!data.email) {
            error.email = 'Enter Your Email'
        }
        if (!data.password) {
            error.password = 'Enter Your Password'
        }

        return error
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;


        if (value.length === 0) {
            if (name === "name") {
                setData(prev => ({ ...prev, name: "" }));
                setError(prev => ({ ...prev, name: "Enter Your Name" }));
            }
            if (name === "email") {
                setData(prev => ({ ...prev, email: "" }));
                setError(prev => ({ ...prev, email: "Enter Your Email" }));
            }
            if (name === "password") {
                setData(prev => ({ ...prev, password: "" }));
                setError(prev => ({ ...prev, password: "Enter Your Password" }));
            }
        }
        else {
            if (name === "name") {
                setData(prev => ({ ...prev, name: value }));
                setError(prev => ({ ...prev, name: "" }));
            }
            if (name === "email") {
                setData(prev => ({ ...prev, email: value }));
                setError(prev => ({ ...prev, email: "" }));
            }
            if (name === "password") {
                setData(prev => ({ ...prev, password: value }));
                setError(prev => ({ ...prev, password: "" }));
            }
        }
    };


    const handleClick = (e) => {
        e.preventDefault()
        setError(validation())

        console.log(error)
        console.log(data)

    }


    return (
        <>

            <form>

                <div>
                    <input type='text' placeholder='Enter Your Name' name='name' value={data.name} onChange={handleChange} />
                </div>
                <span style={{ color: 'red' }}>
                    {error ? error.name : ""}
                </span>

                <div>
                    <input type='text' placeholder='Enter Your Email' name='email' value={data.email} onChange={handleChange} />
                </div>
                <span style={{ color: 'red' }}>
                    {error ? error.email : ""}
                </span>

                <div>
                    <input type='text' placeholder='Enter Your Password' name='password' value={data.password} onChange={handleChange} />
                </div>
                <span style={{ color: 'red' }}>
                    {error ? error.password : ""}
                </span>

                <div>
                    <button onClick={handleClick}>Button</button>
                </div>

            </form>

        </>
    )
}