import { useState } from "react";

type AccordionProps = {
    children: React.ReactNode
    title: string
    id: string,
}

export default function Accordion({
    children,
    title,
    id,
}: AccordionProps) {

    const [isOpen2, setIsOpen2] = useState(false);

    const handleAccordionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsOpen2(!isOpen2);
    };

    return (
        <div >
            <h2 >
                <button
                    className="max-w-7xl mx-auto uppercase text-blue-900 flex items-center text-base lg:text-lg justify-between w-full text-left font-semibold py-2"
                    onClick={handleAccordionClick}
                    aria-controls={`accordion-text-${id}`}
                >
                    <span>{title}</span>
                    <span className={`transform ${isOpen2 ? 'rotate-0' : 'rotate-180'} transition-transform`}>
                        &#9660;
                    </span>
                </button>
            </h2>
            <div className='px-5'>
                <div className="overflow-hidden">
                    <p className="pb-3 text-base lg:text-lg ">
                        {children}
                    </p>
                </div>
            </div>
        </div>
    )
}