import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const { data, setData, post } = useForm({
        lat: 6.4485680435702575,
        lng: 100.28012124888713,
        operatorName: '',
        menu: '',
        schedule: ''
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        if (e.target.name === 'lat' || e.target.name === 'lng') {
            setMapCenter({ ...mapCenter, [e.target.name]: parseFloat(e.target.value) });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('marker.create'));
    };

    const [mapCenter, setMapCenter] = useState({
        lat: 6.4485680435702575, lng: 100.28012124888713
    });

    const onMapClick = useCallback((e) => {
        const newCenter = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        console.log(newCenter.lat);
        setMapCenter(newCenter);
        setData({...data ,'lat': newCenter.lat, 'lng' :newCenter.lng});
        //setData('lng', newCenter.lng);
    }, [setData]);

    const handleDetectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const newCenter = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setMapCenter(newCenter);
                setData({...data, 'lat': newCenter.lat, 'lng' :newCenter.lng});
                //setData('lat', newCenter.lat);
                //setData('lng', newCenter.lng);
            });
        }
    };

    const mapStyles = {
        height: "400px",
        width: "100%"
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-400">Operator Name</label>
                                <input
                                    type="text"
                                    name="operatorName"
                                    className="mt-1 block w-full"
                                    value={data.operatorName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-400">Menu</label>
                                <input
                                    type="text"
                                    name="menu"
                                    className="mt-1 block w-full"
                                    value={data.menu}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-400">Schedule</label>
                                <input
                                    type="text"
                                    name="schedule"
                                    className="mt-1 block w-full"
                                    value={data.schedule}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-400">Latitude</label>
                                <input
                                    type="number"
                                    name="lat"
                                    className="mt-1 block w-full"
                                    value={data.lat}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-400">Longitude</label>
                                <input
                                    type="number"
                                    name="lng"
                                    className="mt-1 block w-full"
                                    value={data.lng}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleDetectLocation}
                                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Detect My Location
                            </button>
                            <button
                                type="submit"
                                className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Submit
                            </button>
                        </form>
                        <LoadScript googleMapsApiKey="">
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={13}
                                center={mapCenter}
                                onClick={onMapClick}
                            >
                                <Marker position={mapCenter} />
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
