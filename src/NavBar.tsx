
// import { Button, Tabs, TabsRef } from 'flowbite-react';
// import { useRef, useState } from 'react';
// import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
// import { MdDashboard } from 'react-icons/md';

// function NavBar() {
//   const tabsRef = useRef<TabsRef>(null);
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <div className="flex flex-col gap-3">
//       <Tabs theme={{tabpanel:"h-100"}} aria-label="Default tabs" style="fullWidth" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
//         <Tabs.Item active title="Profile" icon={HiUserCircle}>
         
//         </Tabs.Item>
//         <Tabs.Item title="Dashboard" icon={MdDashboard}>
//           This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
//           Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
//           control the content visibility and styling.
//         </Tabs.Item>
//         <Tabs.Item title="Settings" icon={HiAdjustments}>
//           This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
//           Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
//           control the content visibility and styling.
//         </Tabs.Item>
//         <Tabs.Item title="Contacts" icon={HiClipboardList}>
//           This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
//           Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
//           control the content visibility and styling.
//         </Tabs.Item>
//         <Tabs.Item disabled title="Disabled">
//           Disabled content
//         </Tabs.Item>
//       </Tabs>
      
//     </div>
//   );
// }


// export default NavBar