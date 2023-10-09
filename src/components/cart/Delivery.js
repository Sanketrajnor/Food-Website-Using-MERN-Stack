import React, { useState } from 'react';
import { countries } from "countries-list";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveDeliveryInfo } from '../../actions/cartActions';
import CheckoutSteps from './CheckoutSteps';




const Delivery = () => {
    //create an array of country data
    const countriesList = Object.values(countries);
    const navigate = useNavigate();
    const { deliveryInfo } = useSelector((state) => state.cart);
    const [address, setAddress] = useState(deliveryInfo.address);
    const [city, setCity] = useState(deliveryInfo.city);
    const [postalCode, setPostalCode] = useState(deliveryInfo.postalCode);
    const [phoneNo, setPhoneNo] = useState(deliveryInfo.phoneNo);
    const [country, setCountry] = useState(deliveryInfo.country);

    const dispatch = useDispatch();
    //define fun form submission

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveDeliveryInfo({ address, city, phoneNo, postalCode, country }));
        navigate("/confirm");
    };
    return (
        <>
        <CheckoutSteps delivery/>
            <div className='row-wrapper'>
                <div className='col-10 col-lg-5 cartt'>
                    <form onSubmit={submitHandler}>
                        <h1 className='mb-4'>
                            Delivery Address
                        </h1>
                        <div className='form-group'>
                            <label htmlFor="address_field">Address</label>

                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>


                        <div className='form-group'>
                            <label htmlFor="city_field">City</label>

                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>


                        <div className='form-group'>
                            <label htmlfor="phone_field">phone no</label>

                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlfor="postal_code_field">postal code</label>

                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlfor="country_field">country </label>

                            <select

                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required

                            >
                                {

                                    countriesList.map((country) => (<option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>))
                                }
                            </select>
                        </div>

                            {/* Submit button */}
                            <button
                             id="checkout_btn"
                             type="submit"
                             className="btn btn-primary btn-block"
                            >
                            Continue
                        </button>
                    </form>
                </div>
            </div>




        </>
    )
}

export default Delivery
