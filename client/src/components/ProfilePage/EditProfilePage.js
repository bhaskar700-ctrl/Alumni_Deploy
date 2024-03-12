import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../../redux/store/userSlice';

function EditProfilePage() {
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
      if (profile) {
          // Directly setting the profile data to formData
          setFormData({
              personalDetails: profile.personalDetails || { firstName: '', lastName: '', profilePicture: '' },
              contactInfo: profile.contactInfo || { email: '', phone: '', address: '' },
              educationHistory: profile.educationHistory && profile.educationHistory.length > 0
                  ? profile.educationHistory
                  : [{ institutionName: '', degree: '', yearOfGraduation: '', activities: [''] }],
              workExperience: profile.workExperience && profile.workExperience.length > 0
                  ? profile.workExperience
                  : [{ companyName: '', position: '', startDate: '', endDate: '', description: '' }]
          });
      } else {
          dispatch(fetchUserProfile());
      }
  }, [dispatch, profile]);
  

    const handleChange = (e, section, index) => {
      const { name, value } = e.target;
  
      if (section) {
          if (index !== undefined) {
              // Handling nested arrays
              setFormData(prevState => ({
                  ...prevState,
                  [section]: prevState[section].map((item, idx) => 
                      idx === index ? { ...item, [name]: value } : item
                  )
              }));
          } else {
              // Handling nested objects
              setFormData(prevState => ({
                  ...prevState,
                  [section]: {
                      ...prevState[section],
                      [name]: value
                  }
              }));
          }
      } else {
          // Handling top-level fields
          setFormData(prevState => ({
              ...prevState,
              [name]: value
          }));
      }
  };

  const handleNestedChange = (e, section, index, field) => {
    // Update the nested state for arrays like educationHistory and workExperience
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
      console.log('Submitting profile data:', formData);
      dispatch(updateUserProfile(formData));
  };



    return (
        <div>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                {/* Personal Details */}
                <div>
                    <label>First Name:</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData.personalDetails.firstName} 
                        onChange={e => handleChange(e, 'personalDetails')} 
                    />
                    <label>Last Name:</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData.personalDetails.lastName} 
                        onChange={e => handleChange(e, 'personalDetails')} 
                    />
                    <label>Profile Picture URL:</label>
                    <input 
                        type="text" 
                        name="profilePicture" 
                        value={formData.personalDetails.profilePicture} 
                        onChange={e => handleChange(e, 'personalDetails')} 
                    />
                </div>

                {/* Contact Info */}
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.contactInfo.email} 
                        onChange={e => handleChange(e, 'contactInfo')} 
                    />
                    <label>Phone:</label>
                    <input 
                        type="text" 
                        name="phone" 
                        value={formData.contactInfo.phone} 
                        onChange={e => handleChange(e, 'contactInfo')} 
                    />
                    <label>Address:</label>
                    <input 
                        type="text" 
                        name="address" 
                        value={formData.contactInfo.address} 
                        onChange={e => handleChange(e, 'contactInfo')} 
                    />
                </div>

                {/* Education History */}
                {/* You can make this section repeatable or editable for multiple education entries */}
                {formData.educationHistory.map((education, index) => (
                  <div key={index}>
                      <label>Institution Name:</label>
                      <input 
                          type="text" 
                          name="institutionName" 
                          value={education.institutionName} 
                          onChange={e => handleNestedChange(e, 'educationHistory', index, 'institutionName')} 
                      />
              
                      <label>Degree:</label>
                      <input 
                          type="text" 
                          name="degree" 
                          value={education.degree} 
                          onChange={e => handleNestedChange(e, 'educationHistory', index, 'degree')} 
                      />
              
                      <label>Year of Graduation:</label>
                      <input 
                          type="number" 
                          name="yearOfGraduation" 
                          value={education.yearOfGraduation} 
                          onChange={e => handleNestedChange(e, 'educationHistory', index, 'yearOfGraduation')} 
                      />
              
                      <label>Activities:</label>
                      {/* Assuming activities is an array of strings */}
                      {education.activities.map((activity, activityIndex) => (
                          <input
                              key={activityIndex}
                              type="text"
                              value={activity}
                              onChange={e => handleNestedChange(e, 'educationHistory', index, 'activities', activityIndex)}
                          />
                      ))}
                      {/* Add button to add more activities if needed */}
                  </div>
              ))}
              
              
              

                {/* Work Experience */}
                {/* Similar to Education History, ensure this is repeatable or editable for multiple experiences */}
                <div>
    <h3>Work Experience</h3>
    {formData.workExperience.map((work, index) => (
        <div key={index}>
            <label>Company Name:</label>
            <input
                type="text"
                name="companyName"
                value={work.companyName}
                onChange={(e) => handleNestedChange(e, 'workExperience', index, 'companyName')}
            />

            <label>Position:</label>
            <input
                type="text"
                name="position"
                value={work.position}
                onChange={(e) => handleNestedChange(e, 'workExperience', index, 'position')}
            />

            <label>Start Date:</label>
            <input
                type="date"
                name="startDate"
                value={work.startDate ? work.startDate.substring(0, 10) : ''}
                onChange={(e) => handleNestedChange(e, 'workExperience', index, 'startDate')}
            />

            <label>End Date:</label>
            <input
                type="date"
                name="endDate"
                value={work.endDate ? work.endDate.substring(0, 10) : ''}
                onChange={(e) => handleNestedChange(e, 'workExperience', index, 'endDate')}
            />

            <label>Description:</label>
            <textarea
                name="description"
                value={work.description}
                onChange={(e) => handleNestedChange(e, 'workExperience', index, 'description')}
            />
        </div>
    ))}

    {/* Buttons or links to add or remove experience entries can be added here */}
</div>


                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default EditProfilePage;
