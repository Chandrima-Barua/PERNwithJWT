import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
    const [salutation, setSalutation] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [website, setWebsite] = useState('');
    const [service, setService] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Register = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post('http://localhost:5000/users', {
                salutation: salutation,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                confPassword: confPassword,
                phoneNumber: phoneNumber,
                birthday: birthday,
                website: website,
                service: service
            });
            console.log(e)

            history.push("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Register} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">

                                    <label for="salutation" className="label">Anrede</label>
                                    <div className="controls">
                                        <select className="input" id="salutation" name="salutation" value={salutation} onChange={(e) => setSalutation(e.target.value)} required>
                                            <option value="herr">Herr</option>
                                            <option value="frau">Frau</option>
                                            <option value="none">keine Angabe</option>
                                        </select>
                                    </div>


                                </div>
                                <div className="field mt-5">
                                    <label className="label">Vorname</label>
                                    <div className="controls">
                                        <input type="text" className="input" value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Nachname</label>
                                    <div className="controls">
                                        <input type="text" className="input" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Mobilnummer</label>
                                    <div className="controls">
                                        <input type="text" className="input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Geburtstag</label>
                                    <div className="controls">
                                        <input type="date" className="input" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Website (optional)</label>
                                    <div className="controls">
                                        <input type="text" className="input" value={website} onChange={(e) => setWebsite(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Service</label>
                                    <div className="controls">
                                        <select className="input" name="service" value={service} onChange={(e) => setService(e.target.value)} required>
                                            <option value="dj">DJ</option>
                                            <option value="catering">Catering</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
