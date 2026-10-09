import KeyboardNavigationDialog from "./keyboardNavigationDialog";
import KeyboardNavigationTrigger from "./keyboardNavigationTrigger";
import useGlobalKeyboardNavigation from "./useGlobalKeyboardNavigation";

function GlobalKeyboardNavigation() {
  const navigation = useGlobalKeyboardNavigation();

  return (
    <>
      <KeyboardNavigationTrigger onOpen={navigation.openNavigation} />
      <KeyboardNavigationDialog
        activeIndex={navigation.activeIndex}
        commands={navigation.filteredCommands}
        isOpen={navigation.isOpen}
        onActiveIndexChange={navigation.changeActiveIndex}
        onInputKeyDown={navigation.handleInputKeyDown}
        onOpenChange={navigation.handleOpenChange}
        onQueryChange={navigation.changeQuery}
        onRunCommand={navigation.runCommand}
        query={navigation.query}
      />
    </>
  );
}

export default GlobalKeyboardNavigation;
