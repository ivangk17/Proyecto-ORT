
import MenuItem from "./MenuItem"

export default function MenuList(props){
    return (
        <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
                {props.itemsNav.map((menuItem, index) =>{
                    return(
                        <MenuItem 
                            key={index}
                            url={menuItem.url}
                            texto={menuItem.texto}
                        />
                    );
                })}
            </ul>
        </nav>
    );
}


