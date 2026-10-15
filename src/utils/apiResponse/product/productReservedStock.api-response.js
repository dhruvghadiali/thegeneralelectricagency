export function fromProductReservedStockApiResponse(reservation = {}) {
  return {
    reservedBy: reservation.reserved_by ?? reservation.reservedBy ?? "",
    reservedFor: reservation.reserved_for ?? reservation.reservedFor ?? "",
    startDate: reservation.start_date ?? reservation.startDate ?? null,
    endDate: reservation.end_date ?? reservation.endDate ?? null,
    reservedAt: reservation.reserved_at ?? reservation.reservedAt ?? null,
  };
}

export default fromProductReservedStockApiResponse;
