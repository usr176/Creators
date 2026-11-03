import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from "@/components/ui/card";

export default function ProductCard(props){
    return(
    <Card className="relative mx-auto w-full max-w-sm pt-0">
        <img
            src="https://avatar.vercel.sh/shadcn1"
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 p-1"
        />
        <CardHeader>
            <CardAction>
            <Badge variant="secondary">Featured</Badge>
            </CardAction>

            <CardTitle> {props.title} </CardTitle>
            <CardDescription> {props.desc} </CardDescription>

        </CardHeader>
        <CardFooter>
            <Button className="w-full">View Event</Button>
        </CardFooter>
    </Card>
    );
}