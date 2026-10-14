
function Footer(){
    return(
        <div className="
            bg-secondary
            text-muted-foreground
            p-7
            flex
            flex-col
            gap-7
        ">
            <h1> Footer </h1>
            <p> 
                &copy; {new Date().getFullYear()} KraftHub
            </p>
        </div>
    )
}

export default Footer;