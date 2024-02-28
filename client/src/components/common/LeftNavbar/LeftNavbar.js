import React from "react";
import { Link } from 'react-router-dom';

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  UserGroupIcon, // For alumni directory
  CalendarIcon, // For events
  BriefcaseIcon, // For job postings
  CurrencyDollarIcon, // For donations
  Cog6ToothIcon, // For settings
  UserCircleIcon, // For profile
  InboxIcon, // For messages
  PowerIcon, // For log out
  ChatBubbleOvalLeftIcon, // Alternative for forum discussions
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export function SidebarWithContentSeparator() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Alumni Portal
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5" />
          </ListItemPrefix>
          Alumni Directory
        </ListItem>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <CalendarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Events
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/events" className="text-blue-gray-900 hover:text-blue-gray-600">Manage Events</Link>
                
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Upcoming Events
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Past Events
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Event Gallery
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          <ListItemPrefix>
            <BriefcaseIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/jobs" className="text-blue-gray-900 hover:text-blue-gray-600">Job Postings</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <CurrencyDollarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Donations
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/forum" className="text-blue-gray-900 hover:text-blue-gray-600">Forum</Link>
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Messages
          <ListItemSuffix>
            <Chip value="New" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/logout" className="text-blue-gray-900 hover:text-blue-gray-600">LogOut</Link>
        </ListItem>
      </List>
    </Card>
  );
}
