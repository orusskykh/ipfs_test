import 'react-tabs/style/react-tabs.css';
import './App.scss';
import {useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

import FileUpload from './Tabs/FileUpload'
import FileExplorer from "./Tabs/FileExplorer";
import Transaction from './Tabs/Transaction/Transaction'
function App() {
  const [data, updateData] = useState([])

  const addItems = (items) => {
    updateData([...data, ...items])
  }

  return (
    <div className="App w-full">
      <header className="App-header w-full">
         <Tabs className="w-full">
            <TabList>
              <Tab>Transaction</Tab>
              <Tab>IPFS file upload</Tab>
              <Tab>IPFS file list</Tab>
            </TabList>

           <TabPanel>
             <Transaction />
           </TabPanel>
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
