import 'react-tabs/style/react-tabs.css';
import './App.scss';
import {useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

import FileUpload from './Components/FileUpload'
import FileExplorer from "./Components/FileExplorer";

function App() {
  const [data, updateData] = useState([])

  const addItems = (items) => {
    updateData([...data, ...items])
  }

  return (
    <div className="App">
      <header className="App-header">
         <Tabs>
            <TabList>
              <Tab>Upload file</Tab>
              <Tab>File list</Tab>
            </TabList>

            <TabPanel className={"tab"}>
              <FileUpload addItems={addItems} />
            </TabPanel>
            <TabPanel>
              <FileExplorer data={data}/>
            </TabPanel>
          </Tabs>
      </header>
    </div>
  );
}

export default App;
