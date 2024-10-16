import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory

const Badge = ({
  text,
  textColor = "text-blue-500",
  bgColor = "bg-indigo-50",
}) => {
  return (
    <span
      className={`hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide ${textColor} ${bgColor} rounded-full`}
    >
      {text}
    </span>
  );
};

const SidebarComponent = ({ sections }) => {
  const navigate = useNavigate();

  const handleNavigation = (href) => {
    return () => {
      navigate(href);
    };
  };
  return (
    <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          {sections.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {section.title && (
                <li className="px-5 hidden md:block">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                      {section.title}
                    </div>
                  </div>
                </li>
              )}
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    onClick={
                      handleNavigation(item.href) || handleNavigation("/")
                    }
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6 cursor-pointer"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <i className={`w-5 h-5 ${item.icon}`}></i>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      {item.title}
                    </span>
                    {item.badge && (
                      <Badge
                        text={item.badge.text}
                        textColor={item.badge.textColor}
                        bgColor={item.badge.bgColor}
                      />
                    )}
                  </a>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

SidebarComponent.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          href: PropTypes.string,
          icon: PropTypes.string.isRequired,
          badge: PropTypes.shape({
            text: PropTypes.string,
            textColor: PropTypes.string,
            bgColor: PropTypes.string,
          }),
        })
      ).isRequired,
    })
  ).isRequired,
};

const Sidebar = () => {
  const sections = [
    {
      title: "Monitoring",
      items: [
        {
          title: "Dashboard",
          icon: "fas fa-tachometer-alt",
          href: "/",
          badge: { text: "Updated", textColor: "text-green-600" },
        },
        {
          title: "Network",
          icon: "fas fa-network-wired",
          href: "/network",
          badge: { text: "New" },
        },
      ],
    },
    {
      title: "Incident Management",
      items: [
        // {
        //   title: "Incidents/Threats",
        //   icon: "fas fa-exclamation-triangle",
        //   badge: { text: "New" },
        //   href: "/alerts",
        // },
        {
          title: "Alerts",
          icon: "fas fa-bell",
          badge: { text: "New" },
          href: "/alerts",
        },
        {
          title: "Active Response",
          icon: "fas fa-bolt",
          badge: { text: "New" },
          href: "/active-response",
        },
        // {
        //   title: "Investigation",
        //   icon: "fas fa-search",
        //   badge: { text: "New" },
        //   href: "/alerts",
        // },
      ],
    },
    // {
    //   title: "Security Operations",
    //   items: [
    //     {
    //       title: "Endpoints",
    //       icon: "fas fa-laptop",
    //       badge: { text: "New" },
    //       href: "/alerts",
    //     },
    //     {
    //       title: "Threat Intelligence",
    //       icon: "fas fa-shield-alt",
    //       badge: { text: "New" },
    //       href: "/alerts",
    //     },
    //     {
    //       title: "Policy Management",
    //       icon: "fas fa-cogs",
    //       badge: { text: "New" },
    //       href: "/alerts",
    //     },
    //   ],
    // },
    // {
    //   title: "Reports",
    //   items: [
    //     {
    //       title: "Health",
    //       icon: "fas fa-heart",
    //       badge: { text: "New" },
    //       href: "/alerts",
    //     },
    //     {
    //       title: "Reports",
    //       icon: "fas fa-file-alt",
    //       badge: { text: "New" },
    //       href: "/alerts",
    //     },
    //     {
    //       title: "Logs",
    //       icon: "fas fa-book",
    //       badge: { text: "New" },
    //       href: "/alerts",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   items: [
    //     {
    //       title: "Manage Agents",
    //       icon: "fas fa-server",
    //       badge: { text: "New" },
    //     },
    //     {
    //       title: "Config",
    //       icon: "fas fa-cog",
    //       badge: { text: "New" },
    //       href: "/config-editor",
    //     },
    //   ],
    // },
  ];

  return <SidebarComponent sections={sections} />;
};

export default Sidebar;
