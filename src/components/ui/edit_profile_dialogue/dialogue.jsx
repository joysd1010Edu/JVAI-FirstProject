import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Swal from "sweetalert2"

export function DialogDemo({handleUpdate, userData}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  const formData = new FormData(e.target);
  const updatedData = Object.fromEntries(formData.entries());

  console.log('Form submitted with data:', updatedData); 
  
  // Check if password fields are filled and validate them
  if (updatedData.new_password || updatedData.confirm_password) {
    // If changing password, all password fields are required
    if (!updatedData.old_password) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Current password is required when changing password.',
        icon: 'warning',
        background: '#122141',
        color: '#ffffff',
        confirmButtonColor: '#f59e0b',
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!updatedData.new_password) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'New password is required.',
        icon: 'warning',
        background: '#122141',
        color: '#ffffff',
        confirmButtonColor: '#f59e0b',
      });
      setIsSubmitting(false);
      return;
    }
    
    // Check if passwords match
    if (updatedData.new_password !== updatedData.confirm_password) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'New password and confirm password do not match.',
        icon: 'warning',
        background: '#122141',
        color: '#ffffff',
        confirmButtonColor: '#f59e0b',
      });
      setIsSubmitting(false);
      return;
    }
    
    // Check password strength (optional)
    if (updatedData.new_password.length < 6) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Password must be at least 6 characters long.',
        icon: 'warning',
        background: '#122141',
        color: '#ffffff',
        confirmButtonColor: '#f59e0b',
      });
      setIsSubmitting(false);
      return;
    }
  }
  
  // Remove confirm_password from data sent to backend (it's just for validation)
  const { confirm_password, ...dataToSend } = updatedData;
  
  if (handleUpdate) {
    try {
      const result = await handleUpdate(dataToSend);
      console.log('Update result:', result); // Debug log
      
      if (result === true) {
        // Reset form
        e.target.reset();
        
        // Close dialog
        setIsDialogOpen(false);
        
        // Show success message
        Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully',
          icon: 'success',
          background: '#122141',
          color: '#ffffff',
          confirmButtonColor: '#0059FF',
        });
      } else {
        // Handle case where update failed but didn't throw an error
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update profile. Please try again.',
          icon: 'error',
          background: '#122141',
          color: '#ffffff',
          confirmButtonColor: '#dc2626',
        });
      }
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update profile. Please try again.',
        icon: 'error',
        background: '#122141',
        color: '#ffffff',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setIsSubmitting(false);
    }
  }
};

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#092b69] border-none text-white text-lg">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#122141] [&>button]:text-white">
        <DialogHeader>
         
          
        </DialogHeader>
        <DialogTitle className="text-2xl font-bold text-white">Edit Profile</DialogTitle>

        <DialogDescription className="text-white">
         
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className='text-white'>Your Name</Label>
              <Input 
                className='text-white bg-[#1a2332] border-gray-600 focus:border-blue-500' 
                id="name" 
                name="name" 
                defaultValue={userData?.name || "Unknown User"} 
                required
              />
            </div>            
            
            
            <div className="grid gap-2">
              <Label htmlFor="password" className='text-white'>Current Password</Label>
              <Input 
                className='text-white bg-[#1a2332] border-gray-600 focus:border-blue-500' 
                id="password" 
                name="old_password" 
                type="password"
                placeholder="Enter your current password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newpassword" className='text-white'>New Password</Label>
              <Input 
                className='text-white bg-[#1a2332] border-gray-600 focus:border-blue-500' 
                id="newpassword" 
                name="new_password" 
                type="password"
                placeholder="Enter your new password"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className='text-white'>Confirm New Password</Label>
              <Input 
                className='text-white bg-[#1a2332] border-gray-600 focus:border-blue-500' 
                id="confirmPassword" 
                name="confirm_password" 
                type="password"
                placeholder="Confirm your new password"
              />
            </div>
          </div>
          
          <DialogFooter className="flex gap-2 pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="bg-gray-600 text-white hover:bg-gray-700">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className={`${
                isSubmitting 
                  ? "bg-gray-600 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white transition-colors`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  )
}

