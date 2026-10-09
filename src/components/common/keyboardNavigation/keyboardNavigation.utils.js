export function getCommandsForRole(commands, role) {
  return commands.filter((command) => command.roles.includes(role));
}

export function filterLauncherCommands(commands, query) {
  const launcherCommands = commands.filter(
    (command) => command.showInLauncher !== false,
  );
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return launcherCommands;

  return launcherCommands.filter((command) =>
    `${command.label} ${command.description}`
      .toLowerCase()
      .includes(normalizedQuery),
  );
}
