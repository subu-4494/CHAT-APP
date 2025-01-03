import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"; 
import toast from "react-hot-toast";

export const useAuthStore = create( ( set , get )  => ({
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,


        isCheckingAuth: true,

        checkAuth: async() => {
            try {
                const res = await axiosInstance.get("/auth/check");
                set( {authUser: res.data});
            } catch (error) {
                console.log("Error in checkAuth:", error);
                set({ authUser: null});
            }  finally {
                set({isCheckingAuth: false});
            }
        },

        signup: async(data) => {
            if (get().authUser) {
                toast.error("You are already signed in!");
                return;
            }
            set({ isSigningUp: true });
            try {
                const res =  await axiosInstance.post("/auth/signup", data);
                set({ authUser: res.data });
                toast.success("Account Created Successfully");
            } catch (error) {
                     toast.error(error.response.data.message);
            } finally {
                set ({isSigningUp: false });
            }
  },
           
         login: async(data) => {
            set({ isLoggingIng: true});
             try {
                const res = await axiosInstance.post("/auth/login",data);
                set({authUser: res.data});
                toast.success("Logged in successfully");
             } catch (error) {
                toast.error(error.response.data.message);
             }  finally{
                set({isLoggingIng: false});
             }
         },

        logout: async () => {
            try {
                await axiosInstance.post("/auth/logout");
                set({ authUser:null});
                toast.success("Logged out successfully");
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },

        updateProfile: async(data) => {
            
            set({ isUpdatingProfile: true});
            try {
                  const res = await axiosInstance.put("/auth/update-profile", data);
                  set({authUser: res.data});
                  toast.success("Profile updated sucessfully");
            } catch (error) {
                console.log("error in update profile:", error);
                toast.error(error.response.data.message);
            } finally {
                set({ isUpdatingProfile:false });
            }
        },
}));

export default useAuthStore;