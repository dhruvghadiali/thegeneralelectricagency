import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { isAltShortcut } from "@keyboard/keyboard.utils";
import { ROUTES } from "@routes/navigate";
import {
  selectKeyboardNavigationActiveIndex,
  selectKeyboardNavigationIsOpen,
  selectKeyboardNavigationQuery,
} from "@Redux/keyboardNavigation/keyboardNavigation.selector";
import {
  keyboardNavigationActiveIndexChanged,
  keyboardNavigationClosed,
  keyboardNavigationOpened,
  keyboardNavigationQueryChanged,
} from "@Redux/keyboardNavigation/keyboardNavigation.slice";

import { GLOBAL_KEYBOARD_COMMANDS } from "./keyboardNavigation.constants";
import {
  filterLauncherCommands,
  getCommandsForRole,
} from "./keyboardNavigation.utils";

function useGlobalKeyboardNavigation() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const isOpen = useSelector(selectKeyboardNavigationIsOpen);
  const query = useSelector(selectKeyboardNavigationQuery);
  const activeIndex = useSelector(selectKeyboardNavigationActiveIndex);

  const availableCommands = useMemo(
    () => getCommandsForRole(GLOBAL_KEYBOARD_COMMANDS, role),
    [role],
  );
  const filteredCommands = useMemo(
    () => filterLauncherCommands(availableCommands, query),
    [availableCommands, query],
  );

  const openNavigation = useCallback(() => {
    dispatch(keyboardNavigationOpened());
  }, [dispatch]);

  const closeNavigation = useCallback(() => {
    dispatch(keyboardNavigationClosed());
  }, [dispatch]);

  const runCommand = useCallback(
    (command) => {
      if (command.action === "open-go-to") {
        openNavigation();
        return;
      }

      closeNavigation();
      if (command.route) navigate(command.route);
    },
    [closeNavigation, navigate, openNavigation],
  );

  useEffect(() => {
    const handleGlobalShortcut = (event) => {
      if (event.defaultPrevented) return;

      const isQuotationSummaryShortcut =
        location.pathname === ROUTES.QUOTATION_NEW &&
        isAltShortcut(event, "d") &&
        document.querySelector("[data-quotation-summary-trigger]");

      if (isQuotationSummaryShortcut) return;

      const command = availableCommands.find((item) =>
        isAltShortcut(event, item.shortcutKey),
      );

      if (command) {
        event.preventDefault();
        runCommand(command);
      }
    };

    window.addEventListener("keydown", handleGlobalShortcut);
    return () => window.removeEventListener("keydown", handleGlobalShortcut);
  }, [availableCommands, location.pathname, runCommand]);

  const changeQuery = useCallback(
    (nextQuery) => {
      dispatch(keyboardNavigationQueryChanged(nextQuery));
    },
    [dispatch],
  );

  const changeActiveIndex = useCallback(
    (nextIndex) => {
      dispatch(keyboardNavigationActiveIndexChanged(nextIndex));
    },
    [dispatch],
  );

  const handleOpenChange = useCallback(
    (open) => {
      if (open) openNavigation();
      else closeNavigation();
    },
    [closeNavigation, openNavigation],
  );

  const handleInputKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (filteredCommands.length) {
          changeActiveIndex(
            Math.min(activeIndex + 1, filteredCommands.length - 1),
          );
        }
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (filteredCommands.length) {
          changeActiveIndex(Math.max(activeIndex - 1, 0));
        }
        return;
      }

      if (event.key === "Enter" && filteredCommands[activeIndex]) {
        event.preventDefault();
        runCommand(filteredCommands[activeIndex]);
      }
    },
    [activeIndex, changeActiveIndex, filteredCommands, runCommand],
  );

  return {
    activeIndex,
    changeActiveIndex,
    changeQuery,
    filteredCommands,
    handleInputKeyDown,
    handleOpenChange,
    isOpen,
    openNavigation,
    query,
    runCommand,
  };
}

export default useGlobalKeyboardNavigation;
