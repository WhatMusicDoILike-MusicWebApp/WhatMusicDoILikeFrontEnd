import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2, Terminal } from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from '../../ui';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { UpdateUserPasswordParams } from '../constants-types';
import { backendEndpoint } from '@/main';

const formSchema = z
    .object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }).optional().or(z.literal('')),
        newPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }).optional().or(z.literal('')),
        confirmNewPassword: z.string().min(8, {
            message: "Confirm Password must be at least 8 characters.",
        }).optional().or(z.literal('')),
        currentPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }).optional().or(z.literal('')),
    })
    .refine((data) => {
        const { newPassword, confirmNewPassword, currentPassword } = data;
        const allEmpty = !newPassword && !confirmNewPassword && !currentPassword;
        const allFilled = newPassword && confirmNewPassword && currentPassword;

        return allEmpty || allFilled;
    }, {
        message: "If changing password, all fields (New Password, Confirm Password, and Current Password) are required.",
        path: ["newPassword"],
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match.",
        path: ["confirmNewPassword"],
    })
    .refine((data) => {
        const { name, newPassword, confirmNewPassword, currentPassword } = data;
        const passwordsAreEmpty = !newPassword && !confirmNewPassword && !currentPassword;

        return !(passwordsAreEmpty && !name);
    }, {
        message: "Name is required if not changing the password.",
        path: ["name"],
    });

export const UpdateAccountForm = (): JSX.Element => {
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isCreateAccountLoading, setIsCreateAccountLoading] = useState<boolean>(false);

    const { userId } = useAuth();
    const { user } = useUser();

    const handleSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {

        try {
            console.log(values);
            if (values.name) {
                const response = await axios.put(`${backendEndpoint}/users`, { userId: userId, newName: values.name });
                console.log(response.data);
            }

            if (user && values.newPassword && values.confirmNewPassword && values.currentPassword) {
                const updatePasswordConfig: UpdateUserPasswordParams = {
                    newPassword: values.newPassword,
                    currentPassword: values.currentPassword,
                }
                await user.updatePassword(updatePasswordConfig);
            }

        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            setIsError(true);
            setErrorMessage('An unexpected error occurred.');
        } finally {
            setIsCreateAccountLoading(false);
            updateProfileForm.reset();
        }
    };

    const updateProfileForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            // email: "", 
            newPassword: "",
            confirmNewPassword: "",
            currentPassword: "",
        },
    });

    return (
        <div className='flex flex-col'>
            <h1 className='text-2xl font-bold text-black pt-1'>
                Update Account
            </h1>
            <h3 className='text-sm text-gray-500 pb-1'>
                Enter your new account information
            </h3>
            <div className='pt-2'>
                {isError && (<Alert className="bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100 " >
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>
                        {errorMessage}
                    </AlertDescription>
                </Alert>)}
                <Form {...updateProfileForm}>
                    <form onSubmit={updateProfileForm.handleSubmit(handleSubmit)} className="space-y-4 text-black">

                        <FormField
                            control={updateProfileForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" placeholder="Full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* <FormField
                            control={updateProfileForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" placeholder="email@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */
                        }

                        <FormField
                            control={updateProfileForm.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={updateProfileForm.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" type="password" placeholder="Confirm Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={updateProfileForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" type="password" placeholder="Current Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex justify-end mr-2'>
                            <Button type="submit" className="hover:bg-zinc-900 transition-all duration-300 hover:scale-105" disabled={isCreateAccountLoading}>
                                Save Changes
                                {isCreateAccountLoading && <Loader2 className="animate-spin" />}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}