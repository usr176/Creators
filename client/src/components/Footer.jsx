
function Footer(){
    return(
        <div className="
            bg-secondary
            p-7
            flex
            gap-7
        ">
            <h1> Footer </h1>
            <p> 
                &copy; {new Date().getFullYear()} CraftMarket
            </p>
        </div>
    )
}

export default Footer;