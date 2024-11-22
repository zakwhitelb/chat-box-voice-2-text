import Logo from "../../asset/Logo"
import Theme from "../ActiveIcons/Theme"
import HelpIcon from "../../asset/HelpIcon"

export default function Header() {
    return (
        <div className='fixed top-0 left-0 flex items-center justify-center h-[80px] w-full elementColor'>
            <Logo fillColor="var(--white)" />
            <div className="absolute flex items-center justify-center right-[60px] gap-[20px]">
                <HelpIcon fillColor="var(--white)" />
                <Theme />
            </div>
        </div>
    )
}
