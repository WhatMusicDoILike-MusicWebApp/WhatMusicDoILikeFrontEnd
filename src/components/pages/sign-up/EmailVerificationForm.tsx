import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleEmailVerification } from "./SignUpModel";
import { useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import { Terminal } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Alert,
    AlertTitle,
    AlertDescription,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    Input,
    FormMessage,
    Button
} from '../../ui';

const formSchema = z
    .object({
        verificationCode: z.string().min(2, {
            message: "Incorrect verification code.",
        }),
    })

export const EmailVerificationForm = (): JSX.Element => {
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    const clerk = useClerk();

    const emailVerificationForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            verificationCode: "",
        },
    });


    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        await handleEmailVerification(values.verificationCode, setIsError, setErrorMessage, clerk);
        console.log("successful verify: " + values);
    };

    return (
        <Card className=" w-2/3 shadow-lg dark:bg-zinc-900 text-gray-900 dark:text-gray-100 text-start border-0">
            <CardHeader>
                <CardTitle className="text-start ml-2">Enter Account Details</CardTitle>
            </CardHeader>
            <CardContent>
                {isError && (<Alert className="bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100 " >
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>
                        {errorMessage}
                    </AlertDescription>
                </Alert>)}
                <Form {...emailVerificationForm}>
                    <form onSubmit={emailVerificationForm.handleSubmit(handleSubmit)} className="space-y-4">

                        <FormField
                            control={emailVerificationForm.control}
                            name="verificationCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" placeholder="Verification Code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex justify-end mr-2'>
                            <Button type="submit" className="hover:bg-zinc-900 transition-all duration-300 hover:scale-105">Create Account</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>

    )
}