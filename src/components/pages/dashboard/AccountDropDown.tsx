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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../constants-types";
import { handleSignIn } from "./PopupModel";

const formSchema = z
    .object({
        email: z.string().min(1, {
            message: "Please add an email.",
        }).email("Invalid email."),
        name: z.string().min(1, {
            message: "Cannot be empty.",
        }),
    })

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

    const [isError, setIsError] = useState<boolean>(false);
    const [ isSignInFormLoading, setIsSignInFormLoading] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage] = useState('');
    const { isLoaded, isSignedIn } = useSession();
    const navigate = useNavigate();

    const { userId } = useAuth();
    const [userInfo, setUserInfo] = useState<User>({ userId: '', email: '', name: '', spotifyAuth: false });
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/users?userId=' + userId);
                console.log('response: ', response.data);
                const name = response.data.name;
                const email = response.data.email;
                const spotifyAuth = response.data.spotifyAuth != null;
                if (userId)
                    setUserInfo({ userId: userId, email: email, name: name, spotifyAuth: spotifyAuth });
            } catch (error) {
                console.log('Error: ' + error);
            } finally {
                console.log('User Info: ' + userInfo);
            }    
        }
        fetchUser();
    }, []);

    const signInForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    // useEffect(() => {
    //     if (userInfo.name && userInfo.email) {
    //         signInForm.reset({
    //             name: userInfo.name,
    //             email: userInfo.email,
    //         });
    //     }
    // }, []);

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSignInFormLoading(true);

        if (!isSignedIn) {
            await handleSignIn({
                email: values.email,
                password: values.name,
                setIsError,
                setErrorMessage,
                navigate,
                clerk,
            });
            setIsSignInFormLoading(false);
        } else {
            setIsSignInFormLoading(false);
            navigate(`/dashboard`);
        }

    };

    // useEffect(() => {
    //     if (isSignedIn && isLoaded) {
    //         navigate(`/dashboard`);
    //     }
    // }, [isSignedIn, isLoaded]);

    const handleProfile = () => {
        if (userInfo.name && userInfo.email) {
            signInForm.reset({
                name: userInfo.name,
                email: userInfo.email,
            });
        }
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
                        <AlertDialog>
                            <AlertDialogTrigger onClick={handleProfile}>Profile</AlertDialogTrigger>
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
                                    <Form {...signInForm}>
                                        <form onSubmit={signInForm.handleSubmit(handleSubmit)} className="space-y-4">
                                            <FormField
                                                control={signInForm.control}
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
                                                control={signInForm.control}
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
                                <AlertDialogCancel className="text-gray-100">Cancel</AlertDialogCancel>
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