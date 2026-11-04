import _ from "lodash";

const upperFirstCharacter = (value) =>
  _.isString(value) ? _.upperFirst(value) : value;

export function fromWarehouseManagerListResponse(response = {}) {
  return _.orderBy(
    _.map(
      response.warehouse_managers ?? response.warehouseManagers ?? [],
      (manager) => {
        const firstName = upperFirstCharacter(
          manager.first_name ?? manager.firstName ?? "",
        );
        const lastName = upperFirstCharacter(
          manager.last_name ?? manager.lastName ?? "",
        );
        const employeeId = manager.emp_id ?? manager.employeeId ?? "";
        const name = _.compact([firstName, lastName]).join(" ");
        const id = String(manager._id ?? manager.id ?? "");

        return {
          id,
          employeeId,
          firstName,
          lastName,
          name,
          value: id,
          label: employeeId ? `${name} (${employeeId})` : name,
        };
      },
    ).filter((manager) => manager.id),
    [(manager) => manager.name.toLowerCase()],
    ["asc"],
  );
}

export function fromStandaloneStockCountResponse(response = {}) {
  const count = Number(
    response.total_standalone_stocks ?? response.totalStandaloneStocks,
  );

  return { totalStandaloneStocks: Number.isFinite(count) ? count : 0 };
}
