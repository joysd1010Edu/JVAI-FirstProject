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

export function DialogDemo() {
  return (
    <Dialog>
  <form>
    <DialogTrigger asChild>
      <Button variant="outline" className="bg-[#092b69] border-none text-white text-lg">
        Edit
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] bg-[#122141] [&>button]:text-white" overlayClassName="backdrop-blur-sm bg-red-400">
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name-1" className='text-white'>Your Name</Label>
          <Input className='text-white' id="name-1" name="name" defaultValue="Md Sohanur Rahman" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username-1" className='text-white'>Password</Label>
          <Input className='text-white' id="username-1" name="username" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username-1" className='text-white'>Confirm Password</Label>
          <Input className='text-white' id="username-1" name="username" />
        </div>
      </div>
      <div className="flex justify-center mt-6 ">
        <DialogClose asChild>
          <Button variant="outline" className="bg-blue-900 text-white w-full text-lg">
            Save
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  </form>
</Dialog>

  )
}

