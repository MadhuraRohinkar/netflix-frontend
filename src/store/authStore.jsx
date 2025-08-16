import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { variables } from '../utils/constants'; 

const useAuthStore = create((set) => ({
  otp: '',
  setOtp: (value) => set({ otp: value }),

  verifyOtp: async (email, otp, navigate) => {
    try {
      const res = await axios.post(`${variables.BACKEND_URL}/api/v1/verify-Otp`, {
        email,
        otp, // ✅ Make sure key matches backend
      });

      alert('OTP verified successfully!');
      localStorage.setItem('token', res.data.token); // Save JWT token
      navigate('/'); // Redirect after success
    } catch (error) {
      alert('Invalid OTP. Please try again.');
      console.error('OTP verification failed:', error);
    }
  },

  getProfile: async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${variables.BACKEND_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}` // ✅ Often APIs expect "Bearer <token>"
      }
    });
    return { success: true, user: response.data.user };
  } catch (error) {
    console.error('Get profile failed:', error); // ✅ Add this
    toast.error("Something went wrong while fetching profile.");
    return { success: false }; // ✅ Add fallback
  }
},
 updateProfile: async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${variables.BACKEND_URL}/profile`,data, {
      headers: {
        'Authorization': `Bearer ${token}` // ✅ Often APIs expect "Bearer <token>"
      }
    });
    toast.success('Profile is successfully Updated!')
    return { success: true, user: response.data.user };
  } catch (error) {
    console.error('profile not updated:', error); // ✅ Add this
    toast.error("fail to update profile.");
    return { success: false }; // ✅ Add fallback
  }
 }
}));

export default useAuthStore;


/*import { create } from 'zustand';

const useBearStore = create((set) => ({
  bears: [],

  addBear: (bearName) =>
    set((state) => ({
      bears: [
        ...state.bears,
        { id: Date.now(), name: bearName } // Add unique ID with name
      ]
    })),

  deleteBear: (id) =>
    set((state) => ({
      bears: state.bears.filter((bear) => bear.id !== id)
    })),

  clearBears: () => set({ bears: [] })
}));

export default useBearStore;*/
