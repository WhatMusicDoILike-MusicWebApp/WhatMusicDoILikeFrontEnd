import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { useState } from "react"
import { useClerk } from "@clerk/clerk-react"

export const AccountDropDown = (): JSX.Element => {
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState<boolean>(false);

    const clerk = useClerk();

    const handleSignOutConfirmClick = () => {
        clerk.signOut();
    };

    const handleSignOutButtonClick = () => {
        setIsDropDownMenuOpen(true);
        setIsSignOutModalOpen(true);
    };

    return (
        <div className="flex flex-row items-center pr-6">

            <DropdownMenu open={isDropDownMenuOpen} modal={false} >
                <DropdownMenuTrigger onClick={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)} >
                    <Avatar className="w-10 h-10">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Dialog>
                            <DialogTrigger className='w-full text-left'>Edit Profile</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <AlertDialog open={isSignOutModalOpen}>
                            <AlertDialogTrigger>
                                <Button onClick={handleSignOutButtonClick}>Sign Out</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Sign Out?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to sign out?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="text-gray-100" onClick={() => setIsSignOutModalOpen(false)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleSignOutConfirmClick}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}