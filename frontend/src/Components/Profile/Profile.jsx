import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

import './Profile.css';

const Profile = () => {
//   const navigate = useNavigate();
  const [profile, setProfile] = useState({ username: '', email: '', profilePicture: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/profile');
        if (response.status === 200) {
          setProfile(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: profile.username,
      email: profile.email,
      profilePicture: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required.'),
      email: Yup.string().email('Invalid email address').required('Email is required.'),
      profilePicture: Yup.mixed().nullable(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('email', values.email);
      if (values.profilePicture) {
        formData.append('profilePicture', values.profilePicture);
      }

      try {
        const response = await axios.post('http://localhost:5000/users/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          alert('Profile updated successfully');
          setProfile(response.data);
        } else {
          console.error('Profile update failed');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="profile-container">
        <h2>Customize Your Profile</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="profile-field">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <span className="error">{formik.errors.username}</span>
            )}
          </div>
          <div className="profile-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="error">{formik.errors.email}</span>
            )}
          </div>
          <div className="profile-field">
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={(event) => {
                formik.setFieldValue('profilePicture', event.currentTarget.files[0]);
              }}
            />
            {formik.touched.profilePicture && formik.errors.profilePicture && (
              <span className="error">{formik.errors.profilePicture}</span>
            )}
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </>
  );
};

export default Profile;