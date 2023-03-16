import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import AirportSuggestions from '../components/AirportSuggestions'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const [Errors, setErrors] = useState({
        DepartureName: false,
        Checkin: false,
        Checkout: false
    });

    const today = moment().format('YYYY-MM-DD').toString()
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD').toString()
    const [DepartureName, setDepartureName] = useState('Delhi');
    const [Checkin, setCheckin] = useState(today);
    const [Checkout, setCheckout] = useState(tomorrow);
    const navigate = useNavigate();
    const [airports, setAirports] = useState([]);
    const [filteredAirports, setFilteredAirports] = useState('');

    const getAirports = async () => {
        try {
            const { data, status } = await axios.get("http://43.205.1.85:9009/v1/airports");
            if (status === 200 && data) {
                console.log(data);
                setAirports(data?.results ?? [])
            } else {
                setAirports([])
            } setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error.message);
        }
    }
    useEffect(() => {
        getAirports()
    }, [])

    const selectAirport = (value) => {
        setDepartureName(value);
        setFilteredAirports([])
    }


    const DepartureHandler = (e) => {
        const { value } = e.target;
        if (value.length <= 10) {
            setDepartureName(value);
        }
        setDepartureName(value);
        if (e.target.value) {
            setErrors((err) => ({ ...err, DepartureName: false }))
        }
        else {
            setErrors((err) => ({ ...err, DepartureName: true }))
        }
        const filteredAirportsData = airports.filter((airport) => airport.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredAirports(filteredAirportsData ?? [])
        console.log(setFilteredAirports);


    }

    const CheckinHandler = (e) => {
        const { value } = e.target;
        setCheckin(value);
        if (e.target.value) {
            setErrors((err) => ({ ...err, Checkin: false }))
        } else {
            setErrors((err) => ({ ...err, Checkin: true }))
        }
    }

    const CheckoutHandler = (e) => {
        const { value } = e.target;
        setCheckout(value);
        if (moment(Checkin) > moment(Checkout)) {
            setErrors((err) => ({ ...err, Checkout: true }))
        }
        if (e.target.value) {
            setErrors((err) => ({ ...err, Checkout: false }))
        } else {
            setErrors((err) => ({ ...err, Checkout: true }))
        }
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        console.log(DepartureName);
        console.log(Checkin);
        console.log(Checkout);
        if (moment(Checkin) > moment(Checkout)) {
            alert("Invalid")
            setErrors((err) => ({ ...err, Checkout: true }))
        } else
            if (DepartureName && Checkin && Checkout) {
                alert('Form is submitted')
                navigate(`/results?departureAirport=${DepartureName}&checkin=${Checkin}&checkout=${Checkout}`)
             
            } else {
                setErrors({
                    DepartureName: !DepartureName,
                    Checkin: !Checkin,
                    Checkout: !Checkout
                })
            }
    }

    // const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    // const fetchData = async () => {
    //     setLoading(true)
    //     const { data } = await axios.get('http://43.205.1.85:9009/v1/airports')
    //     setLoading(false)
    //     setRecords(data.results)
    // }
    // useEffect(() => {
    //     fetchData()
    // }, [])

    return (
        <div id="app" className="generic">
            <section id="hero"
                style={{ backgroundImage: 'url("assets/generic_landing.jpg")', minHeight: `500px` }}>
                <div className="hero-backdrop"></div>
                <div className="container position-relative">
                    <div className="hero-heading mb-4">
                        <h1>SAVE BIG ON AIRPORT PARKING</h1>
                        <h2>We have the best deals for airport parking lots!</h2>
                    </div>
                    <div className="searchbox landing">
                        <div className="row tabs">
                            <div className="tab">
                                <div className="heading">Most Convenient</div>
                                <div className="button">
                                    <div className="icon"><i className="fas fa-car"></i></div>
                                    Airport Parking Only
                                </div>
                            </div>
                            <div className="tab">
                                <div className="heading">Best Value</div>
                                <div className="button">
                                    <div className="icon"><i className="fas fa-bed"></i> + <i
                                        className="fas fa-car"></i></div>
                                    Hotel &amp; Parking Package
                                </div>
                            </div>
                        </div>
                        {loading && <h3>loading..</h3>}
                        <form action="/results.html" method="post">
                            <div className="options row m-0"><label className="col-12 col-xl-3 p-0 mr-xl-3 mb-2">
                                <div className="heading mb-1">Departure Airport</div>
                                <div className="placeholder placeholder-airport">
                                    <input type="text" placeholder="Departure Airport" className="placeholder placeholder-airport" onChange={DepartureHandler} value={DepartureName} />
                                </div> <i className="fas fa-map-marker-alt input-icon"></i>
                                {loading ? <h1>Loading</h1> : null}
                                {(Errors && Errors.DepartureName) ? <h3 style={{ backgroundColor: 'rgba(100, 100, 100, 0.5)' }}>Invalid Departure Airport</h3> : null}
                                <AirportSuggestions airports={filteredAirports} selectAirport={selectAirport} />

                            </label>
                                <div className="col p-0 row m-0 mb-2 dates"><label
                                    className="col-sm-6 p-0 pr-sm-3 date_input">
                                    <div className="heading mb-1">Parking Check-In</div>
                                    <div className="placeholder">
                                        <input name="checkin" type="date" placeholder="Parking Check-In" className="placeholder placeholder-airport" onChange={CheckinHandler} value={Checkin} style={{ width: '100%' }}  />
                                        {(Errors && Errors.Checkin) ? <h3 style={{ backgroundColor: 'rgba(100, 100, 100, 0.5)' }}>Invalid checkin Date</h3> : null}
                                    </div>
                                </label> <label className="col-sm-6 p-0 pl-sm-0 date_input">
                                        <div className="heading mb-1">Parking Check-Out</div>
                                        <input name="Check-Out" type="date" placeholder="Parking Check-Out" className="placeholder placeholder-airport" onChange={CheckoutHandler} value={Checkout} style={{ width: '100%' }} />
                                        {(Errors && Errors.Checkout) ? <h3 style={{ backgroundColor: 'rgba(100, 100, 100, 0.5)' }}>Invalid checkout Date</h3> : null}

                                    </label></div>
                                <div className="col-12 col-xl-2 p-0 pl-xl-3 my-3 my-xl-0">
                                    <div className="d-none d-xl-block heading mb-1 invisible">Submit</div>
                                    <button type="submit" className="btn btn-secondary btn-big btn-block p-2" onClick={SubmitHandler}><span>SEARCH</span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <section id="benefits">
                <div className="container">
                    <h5>What Can You Save with AirportParking Reservations.com?</h5>

                    <ul className="row">
                        <li className="col-12 col-lg-4 p-3">
                            <img src="/assets/check.png" alt="Tick" width="50" height="50" />
                            <div>
                                <h6>Save Money</h6>
                                <p>Save up to 70% off on our site compared to the cost of on-airport
                                    parking.</p>
                            </div>
                        </li>
                        <li className="col-12 col-lg-4 p-3">
                            <img src="/assets/check.png" alt="Tick" width="50" height="50" />
                            <div>
                                <h6>Save Time</h6>
                                <p>
                                    It's easy to compare parking at all major airports.<br />
                                    Booking a reservation is quick & simple!
                                </p>
                            </div>
                        </li>
                        <li className="col-12 col-lg-4 p-3">
                            <img src="/assets/check.png" alt="Tick" width="50" height="50" />
                            <div>
                                <h6>Save Stress</h6>
                                <p>
                                    Guarantee your parking spot by booking in advance. Can't make it?
                                    Cancellations are free.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            </div >
    );       
}


export default Home;

