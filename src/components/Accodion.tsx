import { useState } from "react";

interface toggleAccor {
    value: {
      heading: string
      dis: string
    }
  }

export default function Accordion({value,}: toggleAccor) {

    const [isOpen, setIsOpen] = useState(false);

  const toggleAccord = () => {
    setIsOpen(!isOpen);
  };


    return (
        <div className="mx-5">
            <div className="border my-5 w-full mx-auto bg-white p-5 rounded-lg">
                <div className="flex justify-between items-center p-2 cursor-pointer" onClick={toggleAccord}>
                    <h2 className="text-lg font-bold text-center">{value.heading}</h2>
                    <span className={`transform ${isOpen ? 'rotate-0' : 'rotate-180'} transition-transform`}>
                        &#9660;
                    </span>
                </div>
                {isOpen && <p>{value.dis}</p>}
            </div>
        </div>
    )
}