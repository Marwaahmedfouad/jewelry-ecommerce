
import { useState } from 'react';
import { Dock } from 'primereact/dock';

export default function BasicDemo() {
    const [position, setPosition] = useState('left');    
    const items = [
        {
            label: 'email',
            icon: () => <img alt="Photos" src="https://i.pinimg.com/564x/96/32/0d/96320d7a6c3c0b62add3f3f80907e603.jpg" width="175%" />,
        },
        {
            label: 'whats app',
            icon: () => <img alt="Photos" src="https://i.pinimg.com/564x/f3/52/b7/f352b7b639141007dead12a280c51f95.jpg" width="75%" />,
        },
    ];

 

    return (
        <div className="card dock-demo">
                {/* <Dock model={items} position={position} /> */}
        </div>
    )
}
        