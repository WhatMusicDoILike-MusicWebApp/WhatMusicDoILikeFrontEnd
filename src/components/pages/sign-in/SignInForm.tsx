import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { useEffect, useState } from "react";
import { useAuth, useClerk, useSession } from "@clerk/clerk-react";
import { Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { handleSignIn } from "./SignInModel";

const formSchema = z
    .object({
        email: z.string().min(2, {
            message: "Not a valid email address.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    })

export const SignInForm = (): JSX.Element => {
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    const clerk = useClerk();
    const { isLoaded, isSignedIn } = useSession();
    const { userId } = useAuth();
    const navigate = useNavigate();

    const signInForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    const handleSubmit = async (values: z.infer<typeof formSchema>) => {

        console.log("successful verify: " + values);

        if (!isSignedIn) {
            await handleSignIn({
                email: values.email,
                password: values.password,
                setIsError,
                setErrorMessage,
                navigate,
                clerk,
            });
            console.log('User signed in successfully');
        } else {
            console.log('User already signed in');
            navigate(`/dashboard/${userId}`);
        }

    };

    useEffect(() => {
        if (isSignedIn && isLoaded) {
            navigate(`/dashboard/${userId}`);
        }
    }, [isSignedIn, isLoaded]);

    return (
        <Card className=" flex flex-col w-2/3 shadow-lg dark:bg-zinc-900 text-gray-900 dark:text-gray-100 text-start border-0 motion-opacity-in-0">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
                <CardDescription>Enter Your Account Informtion</CardDescription>
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={signInForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex justify-end mr-2'>
                            <Button type="submit" className="hover:bg-zinc-900 transition-all duration-300 hover:scale-105">Sign In</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}