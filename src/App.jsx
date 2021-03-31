import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';

import './App.css';

function App() {
    return (
        // BEM naming convention
        <div className="app">
            <div className="app__body">
                {/* Sidebar */}
                <Sidebar />

                {/* Chat */}
                <Chat />
            </div>
        </div>
    );
}

export default App;
