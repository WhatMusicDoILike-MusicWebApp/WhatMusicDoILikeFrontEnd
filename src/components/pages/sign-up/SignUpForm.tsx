import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import { SignUpStep } from "../constants-types";
import { handleSignUp } from "./SignUpModel";
import { Loader2, Terminal } from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from '../../ui';

const formSchema = z
    .object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        email: z.string().email({
            message: "Please enter a valid email address.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        confirmPassword: z.string().min(8, {
            message: "Confirm Password must be at least 8 characters.",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

interface SignUpFormProps {
    setCurrentStep: React.Dispatch<React.SetStateAction<SignUpStep>>;
    setDBUserName: React.Dispatch<React.SetStateAction<string>>;
    setDBUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const SignUpForm = ({ setCurrentStep, setDBUserName, setDBUserEmail }: SignUpFormProps): JSX.Element => {
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isCreateAccountLoading, setIsCreateAccountLoading] = useState<boolean>(false);

    const clerk = useClerk();

    const handleSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {

        try {
            setIsCreateAccountLoading(true);
            await handleSignUp(values.email, values.password, setCurrentStep, setIsError, setErrorMessage, clerk);
            setDBUserEmail(values.email);
            setDBUserName(`${values.name}`);
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            setIsError(true);
            setErrorMessage('An unexpected error occurred.');
        } finally {
            setIsCreateAccountLoading(false);
            signUpForm.reset();
        }
    };

    const signUpForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    return (
        <Card className="motion-opacity-in-0 w-2/3 shadow-lg dark:bg-zinc-900 text-gray-900 dark:text-gray-100 text-start border-0">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
                <CardDescription>Enter Account Details</CardDescription>
            </CardHeader>
            <CardContent>
                {isError && (<Alert className="bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100 " >
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>
                        {errorMessage}
                    </AlertDescription>
                </Alert>)}
                <Form {...signUpForm}>
                    <form onSubmit={signUpForm.handleSubmit(handleSubmit)} className="space-y-4">

                        <FormField
                            control={signUpForm.control}
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

                        <FormField
                            control={signUpForm.control}
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
                        />

                        <FormField
                            control={signUpForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={signUpForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" type="password" placeholder="Confirm Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex justify-end mr-2'>
                            <Button type="submit" className="hover:bg-zinc-900 transition-all duration-300 hover:scale-105" disabled={isCreateAccountLoading}>
                                Create Account
                                {isCreateAccountLoading && <Loader2 className="animate-spin" />}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}