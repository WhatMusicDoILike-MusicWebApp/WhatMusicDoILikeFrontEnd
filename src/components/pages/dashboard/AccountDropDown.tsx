import { useEffect, useState } from "react"
import { useAuth, useClerk, useSession } from "@clerk/clerk-react"
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
    Alert,
    AlertDescription,
    AlertTitle,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input} from '../../ui'
import { Loader2, Terminal } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { UserResponse } from "../constants-types";

const formSchema = z
    .object({
        email: z.string().min(1, {
            message: "Please add an email.",
        }).email("Invalid email."),
        name: z.string().min(1, {
            message: "Cannot be empty.",
        }),
    })

interface AccountDropdownProps {
    userInfo: UserResponse;
    setUserInfo: React.Dispatch<React.SetStateAction<UserResponse>>;
}

export const AccountDropDown = ({userInfo, setUserInfo} : AccountDropdownProps): JSX.Element => {
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false);
    const [isProfileUpdateOpen, setIsProfileUpdateOpen] = useState<boolean>(false);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState<boolean>(false);
    const [isSignOutLoading, setIsSignOutLoading] = useState<boolean>(false);

    const [isError, setIsError] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage] = useState('');

    const { userId } = useAuth();

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

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)

    };

    const handleProfileButtonClick = () => {
        setIsDropDownMenuOpen(true);
        setIsProfileUpdateOpen(true);
        if (userInfo.name && userInfo.email) {
            updateProfileForm.reset({
                name: userInfo.name,
                email: userInfo.email,
            });
        }
    };

    const updateProfileForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: userInfo.email,
            name: userInfo.name,
        },
    });

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
                        <AlertDialog open = {isProfileUpdateOpen}>
                            <AlertDialogTrigger onClick={handleProfileButtonClick}>Profile</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle className="text-3xl font-bold text-center">Your Profile</AlertDialogTitle>
                                <AlertDialogDescription className="text-center">Enter new credentials and submit to update profile information.</AlertDialogDescription>
                                <AlertDialogDescription> 
                                    {isError && (<Alert className="bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100 " >
                                        <Terminal className="h-4 w-4" />
                                        <AlertTitle>Error!</AlertTitle>
                                        <AlertDescription>
                                            {errorMessage}
                                        </AlertDescription>
                                    </Alert>)}
                                    <Form {...updateProfileForm}>
                                        <form onSubmit={updateProfileForm.handleSubmit(handleSubmit)} className="space-y-4">
                                            <FormField
                                                control={updateProfileForm.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Name</FormLabel>
                                                        <FormControl>
                                                            <Input className="text-black" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={updateProfileForm.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input className="text-black" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </form>
                                    </Form>
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel className="text-gray-100" onClick={() => setIsProfileUpdateOpen(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Submit</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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