import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"

import LoginForm from "./login-form"
import SignupForm from "./signup-form"

export default function AuthCard(){

    return(
        <div
            className="
                w-full
                max-w-md
            "
        >

            <div className="text-center mb-8">

                <h1
                    className="
                        font-heading
                        text-4xl
                        font-semibold
                    "
                >
                    Welcome to KraftHub
                </h1>

                <p
                    className="
                        mt-3
                        text-muted-foreground
                    "
                >
                    Connect with student creators
                </p>

            </div>


            <Tabs defaultValue="login">

                <TabsList className="grid w-full grid-cols-2">

                    <TabsTrigger value="login">
                        Sign In
                    </TabsTrigger>

                    <TabsTrigger value="signup">
                        Create Account
                    </TabsTrigger>

                </TabsList>


                <TabsContent value="login">
                    <LoginForm />
                </TabsContent>


                <TabsContent value="signup">
                    <SignupForm />
                </TabsContent>

            </Tabs>

        </div>
    );

}