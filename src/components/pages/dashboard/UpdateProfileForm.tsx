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
    AlertDialogFooter,
    AlertDialogHeader
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
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger, AlertDialogAction, AlertDialogTitle, AlertDialogPortal} from '@radix-ui/react-alert-dialog';
import { User } from '../constants-types';

const formSchema = z
    .object({
        email: z.string().min(1, {
            message: "Please add an email.",
        }).email("Invalid email."),
        name: z.string().min(1, {
            message: "Cannot be empty.",
        }),
    })
    
    
export const  ProfilePopup= (): JSX.Element => {
    const [isError, setIsError] = useState<boolean>(false);
    const [isSignInFormLoading, setIsSignInFormLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    const clerk = useClerk();
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
    )
}

