"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ProfileWithActivity from '@/components/Profile/ProfileWithActivity';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAxios } from '@/providers/AxiosProvider';
import { FaCircleUser } from "react-icons/fa6";

const ProfileDialog = () => {
    const axios = useAxios();
    const [userData, setUserData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fetchUserData=async()=>{
    const response = await axios.get('/api/users/profile/')
    console.log('User data fetched:', response.data); 
    if (response.status === 200) {
      setUserData(response.data);
    }

  }
  useEffect(()=>{
    fetchUserData();
  },[])

  const handleUpdateProfile = async (updatedData) => {
    try {
        const response = await axios.patch('/api/users/profile/', updatedData);
        if (response.status === 200) {
            setUserData(response.data);
            console.log('Profile updated successfully:', response.data);
            fetchUserData(); 
            return true; // Return true for success
        }
        return false; // Return false if status is not 200
    }
    catch (error) {
        console.error('Error updating profile:', error);
        return false; // Return false for any errors
    }
  }
    

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {userData?.image ? (
                       <Image
                         src={userData?.profile_image}
                         alt="Profile"
                         width={90}
                         height={90}
                         className="rounded-full border-4 border-blue-500"
                       />
                     ) : (
                      <FaCircleUser  className='text-blue-100 lg:w-[50px] w-8 h-8 lg:h-[50px] cursor-pointer'/>
                     )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1075px]  overflow-y-auto bg-blue-950 [&>button]:text-white">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <h1 className='text-center text-2xl font-bold text-white mb-6 flex-1'>Your Profile</h1>
          </DialogTitle>
          <ProfileWithActivity handleUpdate={handleUpdateProfile} userData={userData} onCloseDialog={() => setIsDialogOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
