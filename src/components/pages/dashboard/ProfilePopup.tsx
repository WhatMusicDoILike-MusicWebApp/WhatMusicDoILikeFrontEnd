import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Alert,
    AlertTitle,
    AlertDescription,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    Input,
    FormMessage,
    Button,
    Form, 
    AlertDialogFooter
} from '../../ui';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useAuth, useClerk, useSession } from "@clerk/clerk-react";
import { Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react"
import axios from 'axios';
import { handleSignIn } from './PopupModel';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger, AlertDialogAction} from '@radix-ui/react-alert-dialog';
import { User } from '../constants-types';

const formSchema = z
    .object({
        email: z.string().min(2, {
            message: "Not a valid email address.",
        }).email("Invalid email."),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    })
    
    
export const  ProfilePopup= (): JSX.Element => {
    const [isError, setIsError] = useState<boolean>(false);
    const [isSignInFormLoading, setIsSignInFormLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    const clerk = useClerk();
    const { isLoaded, isSignedIn } = useSession();
    const navigate = useNavigate();

    const signInForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSignInFormLoading(true);

        if (!isSignedIn) {
            await handleSignIn({
                email: values.email,
                password: values.password,
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

    useEffect(() => {
        if (isSignedIn && isLoaded) {
            navigate(`/dashboard`);
        }
    }, [isSignedIn, isLoaded]);

    return (
        <AlertDialog>
            <AlertDialogTrigger>Profile</AlertDialogTrigger>
            <AlertDialogContent>
                <Card className=" flex flex-col w-2/3 shadow-lg dark:bg-zinc-900 text-gray-900 dark:text-gray-100 text-start border-0 motion-opacity-in-0">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Profile</CardTitle>
                        <CardDescription>Edit Account</CardDescription>
                    </CardHeader>

                    <CardContent>
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
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input className="text-black" placeholder = {userInfo.name} {...field} />
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
                                                <Input className="text-black" placeholder= {userInfo.email} type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='flex justify-end mr-2'>
                                    <Button type="submit" className="hover:bg-zinc-900 transition-all duration-300 hover:scale-105" disabled={isSignInFormLoading}>
                                        Sign In
                                        {isSignInFormLoading && <Loader2 className="animate-spin" />}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Change</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>

    )
}

