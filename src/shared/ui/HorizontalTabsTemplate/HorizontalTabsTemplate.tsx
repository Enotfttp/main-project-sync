import {
  HorizontalTab,
  HorizontalTabProps,
  HorizontalTabs,
  HorizontalTabsProps,
  TabBadge,
  TabIcon,
  TabText,
} from "@admiral-ds/react-ui";
import type { ReactNode } from "react";
import { forwardRef, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface TabContentProps extends HorizontalTabProps {
  text: string;
  tabId: string;
  badge?: number;
  disabled?: boolean;
  icon?: ReactNode;
  path?: string;
}

type CustomHorizontalTabProps = TabContentProps;
const CustomHorizontalTab = forwardRef<
  HTMLButtonElement,
  CustomHorizontalTabProps
>(
  (
    {
      dimension = "l",
      disabled,
      selected,
      onSelectTab,
      tabId,
      text,
      icon,
      badge,
      ...props
    }: CustomHorizontalTabProps,
    ref,
  ) => {
    return (
      <HorizontalTab
        {...props}
        ref={ref}
        tabId={tabId}
        dimension={dimension}
        disabled={disabled}
        selected={selected}
        onSelectTab={onSelectTab}
      >
        {icon && (
          <TabIcon $dimension={dimension} $disabled={disabled}>
            {icon}
          </TabIcon>
        )}
        <TabText>{text}</TabText>
        {badge && (
          <TabBadge disabled={disabled} selected={selected}>
            {badge}
          </TabBadge>
        )}
      </HorizontalTab>
    );
  },
);

export const HorizontalTabsTemplate = ({
  dimension = "l",
  showUnderline = true,
  defaultSelectedTabId,
  isRedirect = false,
  tabs,
  ...props
}: Omit<HorizontalTabsProps, "renderTab" | "tabsId" | "tabIsDisabled"> & {
  tabs: TabContentProps[];
  isRedirect?: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabsMap = useMemo(() => {
    return tabs.map((tab) => tab.tabId);
  }, [tabs]);

  const [selectedTab, setSelectedTab] = useState<string | undefined>(
    isRedirect
      ? tabs.find((item) => location.pathname.includes(String(item?.path)))!
          .tabId
      : defaultSelectedTabId,
  );
  const handleSelectTab = (tabId: string) => setSelectedTab(tabId);

  const tabIsDisabled = (tabId: string) => {
    const currentTab = tabs.find((tab) => tab.tabId === tabId);
    return !!currentTab?.disabled;
  };

  const renderTab = (
    tabId: string,
    selected?: boolean,
    onSelectTab?: (tabId: string) => void,
  ) => {
    const currentTab = tabs.find((tab) => tab.tabId === tabId);
    const text = currentTab?.text || "";
    const disabled = !!currentTab?.disabled;
    const badge = currentTab?.badge;
    const path = currentTab?.path || "";

    return (
      <CustomHorizontalTab
        dimension={dimension}
        tabId={tabId}
        text={text}
        badge={badge}
        key={tabId}
        selected={selected}
        disabled={disabled}
        onSelectTab={(tabId: string) => {
          if (path) {
            navigate(path);
          }
          if (onSelectTab) {
            onSelectTab(tabId);
          }
        }}
      />
    );
  };

  return (
    <HorizontalTabs
      {...props}
      showUnderline={showUnderline}
      selectedTabId={selectedTab}
      defaultSelectedTabId={defaultSelectedTabId}
      onSelectTab={(tabId) => {
        handleSelectTab(tabId);
        if (props?.onSelectTab) {
          props?.onSelectTab(tabId);
        }
      }}
      tabsId={tabsMap}
      renderTab={renderTab}
      tabIsDisabled={tabIsDisabled}
    />
  );
};
