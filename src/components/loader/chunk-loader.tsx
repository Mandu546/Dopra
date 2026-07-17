import React from 'react';
import { Loader } from '@deriv-com/ui';

const loadingSteps = [
    'Connecting to Trading Services...',
    'Loading AI Modules...',
    'Preparing Workspace...',
    'Launching Dashboard...',
];

export default function ChunkLoader() {
    const [step, setStep] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setStep(prev => (prev + 1) % loadingSteps.length);
        }, 1200);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='app-root'>
            <div className='dopra-grid'></div>

            <div className='dopra-orb dopra-orb--one'></div>
            <div className='dopra-orb dopra-orb--two'></div>

            <div className='dopra-loader'>
                <div className='dopra-loader__logo'>DOPRA</div>

                <div className='dopra-loader__subtitle'>AI Trading Workspace</div>

                <div className='dopra-loader__spinner'>
                    <Loader />
                </div>

                <div className='load-message'>{loadingSteps[step]}</div>

                <div className='loader-progress'>
                    <div className='loader-progress__bar'></div>
                </div>

                <div className='loader-status'>
                    <div>
                        <span className='status-dot'></span>
                        Secure Connection
                    </div>

                    <div>
                        <span className='status-dot'></span>
                        Cloud Sync
                    </div>

                    <div>
                        <span className='status-dot'></span>
                        AI Engine Ready
                    </div>
                </div>
            </div>
        </div>
    );
}
