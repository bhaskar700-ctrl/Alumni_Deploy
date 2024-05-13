import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, updateUserProfile } from '../../redux/store/userSlice';

function EditProfilePage() {
    const navigate=useNavigate();
    const handleGoBack=()=>{
        navigate(-1);
    };
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        personalDetails: {
            firstName: '',
            lastName: '',
            profilePicture: ''
        },
        contactInfo: {
            email: '',
            phone: '',
            address: ''
        },
        educationHistory: [{
            institutionName: '',
            degree: '',
            yearOfGraduation: '',
            activities: ['']
        }],
        workExperience: [{
            companyName: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
        }]
    });

    useEffect(() => {
        if (!profile) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, profile]);

    useEffect(() => {
        if (profile) {
            setFormData(profile);
        }
    }, [profile]);

    const handleChange = (e, section, index) => {
        const { name, value } = e.target;

        if (section) {
            if (index !== undefined) {
                setFormData(prevState => ({
                    ...prevState,
                    [section]: prevState[section].map((item, idx) =>
                        idx === index ? { ...item, [name]: value } : item
                    )
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    [section]: {
                        ...prevState[section],
                        [name]: value
                    }
                }));
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleNestedChange = (e, section, index, field) => {
        const updatedSection = formData[section].map((item, idx) => {
            if (idx === index) {
                return { ...item, [field]: e.target.value };
            }
            return item;
        });

        setFormData({ ...formData, [section]: updatedSection });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile(formData));
    };

    return (
        <div className="container mt-6 mb-6 border-2 border-sky-400 mx-auto py-8">
            <h1 className="text-3xl font-semibold mb-6">Edit Profile</h1>
            <button onClick={handleGoBack} className="absolute top-4 right-4">
        {/* Insert your back button icon here */}
        {/* For example, using an SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
            <form onSubmit={handleSubmit} className="space-y-6 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Personal Details */}
                    <div>
                        <label className="block mb-2 font-semibold">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.personalDetails.firstName}
                            onChange={e => handleChange(e, 'personalDetails')}
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.personalDetails.lastName}
                            onChange={e => handleChange(e, 'personalDetails')}
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Profile Picture URL:</label>
                        <input
                            type="text"
                            name="profilePicture"
                            value={formData.personalDetails.profilePicture}
                            onChange={e => handleChange(e, 'personalDetails')}
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                {/* Additional personal details fields can be added here */}

                {/* Contact Info */}
                <div>
                    <label className="block mb-2 font-semibold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.contactInfo.email}
                        onChange={e => handleChange(e, 'contactInfo')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.contactInfo.phone}
                        onChange={e => handleChange(e, 'contactInfo')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.contactInfo.address}
                        onChange={e => handleChange(e, 'contactInfo')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                {/* Additional contact info fields can be added here */}

                {/* Education History */}
                {/* For simplicity, only one set of education fields is shown */}
                <div>
                    <label className="block mb-2 font-semibold">Institution Name:</label>
                    <input
                        type="text"
                        name="institutionName"
                        value={formData.educationHistory[0].institutionName}
                        onChange={e => handleNestedChange(e, 'educationHistory', 0, 'institutionName')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Degree:</label>
                    <input
                        type="text"
                        name="degree"
                        value={formData.educationHistory[0].degree}
                        onChange={e => handleNestedChange(e, 'educationHistory', 0, 'degree')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Year of Graduation:</label>
                    <input
                        type="text"
                        name="yearOfGraduation"
                        value={formData.educationHistory[0].yearOfGraduation}
                        onChange={e => handleNestedChange(e, 'educationHistory', 0, 'yearOfGraduation')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                {/* Additional education fields can be added here */}

                {/* Work Experience */}
                {/* For simplicity, only one set of work experience fields is shown */}
                <div>
                    <label className="block mb-2 font-semibold">Company Name:</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.workExperience[0].companyName}
                        onChange={e => handleNestedChange(e, 'workExperience', 0, 'companyName')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.workExperience[0].position}
                        onChange={e => handleNestedChange(e, 'workExperience', 0, 'position')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.workExperience[0].startDate}
                        onChange={e => handleNestedChange(e, 'workExperience', 0, 'startDate')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.workExperience[0].endDate}
                        onChange={e => handleNestedChange(e, 'workExperience', 0, 'endDate')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Description:</label>
                    <textarea
                        name="description"
                        value={formData.workExperience[0].description}
                        onChange={e => handleNestedChange(e, 'workExperience', 0, 'description')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                {/* Additional work experience fields can be added here */}

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600 transition duration-300"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default EditProfilePage;