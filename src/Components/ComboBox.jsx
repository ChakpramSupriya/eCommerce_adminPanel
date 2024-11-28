// import * as React from "react";
// import useMediaQuery from "../hooks/use-media-query";
// import { Button } from "./ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "./ui/command";
// import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// export function SelectOptionWithSearch({
//   placeholder,
//   setOpen,
//   setSelectedStatus,
//   selectedStatus,
//   data,
//   open,
// }) {
//   const isDesktop = useMediaQuery("(min-width: 768px)");

//   if (isDesktop) {
//     return (
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button variant="outline" className=" justify-start">
//             {selectedStatus ? <>{selectedStatus.label}</> : <>{placeholder}</>}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className=" p-0" align="start">
//           <OptionList
//             data={data}
//             setOpen={setOpen}
//             setSelectedStatus={setSelectedStatus}
//           />
//         </PopoverContent>
//       </Popover>
//     );
//   }

//   return (
//     <Drawer open={open} onOpenChange={setOpen}>
//       <DrawerTrigger asChild>
//         <Button variant="outline" className=" justify-start">
//           {selectedStatus ? <>{selectedStatus.label}</> : <>{placeholder}</>}
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <div className="mt-4 border-t">
//           <OptionList
//             data={data}
//             setOpen={setOpen}
//             setSelectedStatus={setSelectedStatus}
//           />
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }

// function OptionList({ setOpen, setSelectedStatus, data }) {
//   return (
//     <Command>
//       <CommandInput placeholder="Search..." />
//       <CommandList>
//         <CommandEmpty>No results found.</CommandEmpty>
//         <CommandGroup>
//           {data.map((status, idx) => (
//             <CommandItem
//               key={idx}
//               value={status.value}
//               onSelect={(value) => {
//                 console.log(value, data);
//                 setSelectedStatus(
//                   data.find(
//                     (priority) =>
//                       priority.value.toLowerCase() === value.toLowerCase()
//                   ) || null
//                 );
//                 setOpen(false);
//               }}
//             >
//               {status.label}
//             </CommandItem>
//           ))}
//         </CommandGroup>
//       </CommandList>
//     </Command>
//   );
// }
