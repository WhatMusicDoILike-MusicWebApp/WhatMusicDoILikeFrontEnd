import { useState } from "react"
import { useClerk } from "@clerk/clerk-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    Sheet,
    SheetContent,
    SheetTrigger
} from '../../ui'
import { Loader2 } from "lucide-react";
import { UpdateAccountForm } from "./UpdateAccountForm";

export const AccountDropDown = (): JSX.Element => {
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState<boolean>(false);
    const [isSignOutLoading, setIsSignOutLoading] = useState<boolean>(false);

    const clerk = useClerk();

    const handleSignOutConfirmClick = () => {
        try {
            setIsSignOutLoading(true);
            clerk.signOut();
        } catch (error) {
            console.log('Error: ' + error);
        } finally {
            setIsSignOutModalOpen(false);
        }
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
                        <Sheet>
                            <SheetTrigger>
                                <p>Account</p>
                            </SheetTrigger>
                            <SheetContent className="w-[400px] sm:w-[540px]">
                                <UpdateAccountForm />
                            </SheetContent>
                        </Sheet>
                    </DropdownMenuItem>
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
                                    <AlertDialogAction onClick={handleSignOutConfirmClick} disabled={isSignOutLoading}>
                                        Continue
                                        {isSignOutLoading && <Loader2 className="animate-spin" />}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}