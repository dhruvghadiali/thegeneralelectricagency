import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Check,
  ChevronsUpDown,
  FileText,
  Loader2,
  Mail,
  Phone,
  Save,
  UserRound,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";
import { COMPANY_TABLE_DEFAULTS, ROLE_PATHS, TABLE_DEFAULTS } from "@Enums";
import {
  fromCompanyListResponse,
  toCompanyListParams,
} from "@Forms/company/company.payload";
import { fetchCompanyContacts } from "@Redux/companyContact/companyContact.action";
import CompanyDetailItem from "@screenComponent/companies/companyContact/companyDetailItem";
import { COMPANY_CONTACT_COLUMNS } from "@screenComponent/companies/companyContact/companyContact.columns";

const sourceAddressFor = (company, contact) =>
  company?.addresses?.find(
    (address) =>
      (contact.companyAddressId && address.id === contact.companyAddressId) ||
      (address.address === contact.companyAddress &&
        String(address.pincode) === String(contact.companyAddressPincode)),
  ) ?? null;

const activeCompanyListParams = (options) => ({
  ...toCompanyListParams(options),
  is_active: true,
});

function CompanyContactDetailSheet({ contact, onClose }) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const canManage = role === ROLE_PATHS.EMPLOYEE;
  const isInactiveContact = contact?.isActive === false;
  const [currentCompany, setCurrentCompany] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [checkError, setCheckError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [companySearch, setCompanySearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [companyPage, setCompanyPage] = useState(TABLE_DEFAULTS.PAGE);
  const [companyPagination, setCompanyPagination] = useState({
    page: TABLE_DEFAULTS.PAGE,
    totalPages: 0,
  });
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCompanyPage(TABLE_DEFAULTS.PAGE);
      setDebouncedSearch(companySearch.trim());
    }, TABLE_DEFAULTS.SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timeoutId);
  }, [companySearch]);

  useEffect(() => {
    if (!contact || !canManage) return undefined;
    setCheckError(null);
    setCurrentCompany(null);
    setCurrentAddress(null);
    setSelectedCompany(null);
    setSelectedAddressId("");
    setSaveError(null);

    if (isInactiveContact) {
      setIsChecking(false);
      return undefined;
    }

    const controller = new AbortController();
    setIsChecking(true);

    const loadCurrentCompany = async () => {
      try {
        const response = await employeeCompanyApi.getCompanies(
          activeCompanyListParams({
            page: TABLE_DEFAULTS.PAGE,
            limit: COMPANY_TABLE_DEFAULTS.LIMIT,
            search: contact.companyName,
            sort: COMPANY_TABLE_DEFAULTS.SORT,
          }),
          { signal: controller.signal },
        );
        const result = fromCompanyListResponse(response, {
          page: TABLE_DEFAULTS.PAGE,
          limit: COMPANY_TABLE_DEFAULTS.LIMIT,
        });
        const company =
          result.items.find((item) => item.id === contact.companyId) ??
          result.items.find((item) => item.name === contact.companyName);
        if (!company)
          throw new Error(
            "Unable to verify the current company contact count.",
          );

        const address = sourceAddressFor(company, contact);
        setCurrentCompany(company);
        setCurrentAddress(address);
        setSelectedCompany(company);
        setSelectedAddressId(address?.id ?? "");
      } catch (error) {
        if (!controller.signal.aborted)
          setCheckError(
            error?.message ?? "Unable to verify the current company.",
          );
      } finally {
        if (!controller.signal.aborted) setIsChecking(false);
      }
    };
    loadCurrentCompany();
    return () => controller.abort();
  }, [canManage, contact, isInactiveContact]);

  const reassignmentBlockReason = useMemo(() => {
    if (isInactiveContact) return null;
    if (!currentCompany) return null;
    if (currentCompany.contactCount <= 1) {
      return `${currentCompany.name} has only one contact person. Add another contact person before moving this contact.`;
    }
    if (!currentAddress)
      return "The current company address could not be verified. Reassignment is unavailable.";
    if (currentAddress.contacts.length <= 1) {
      return "This address has only one contact person. Add another contact person to this address before moving this contact.";
    }
    return null;
  }, [currentAddress, currentCompany, isInactiveContact]);

  useEffect(() => {
    if (!contact || !canManage || !pickerOpen || reassignmentBlockReason)
      return undefined;
    const controller = new AbortController();
    const isFirstPage = companyPage === TABLE_DEFAULTS.PAGE;
    setIsLoadingCompanies(true);

    const loadCompanies = async () => {
      try {
        const response = await employeeCompanyApi.getCompanies(
          activeCompanyListParams({
            page: companyPage,
            limit: COMPANY_TABLE_DEFAULTS.LIMIT,
            search: debouncedSearch,
            sort: COMPANY_TABLE_DEFAULTS.SORT,
          }),
          { signal: controller.signal },
        );
        const result = fromCompanyListResponse(response, {
          page: companyPage,
          limit: COMPANY_TABLE_DEFAULTS.LIMIT,
        });
        setCompanies((current) =>
          isFirstPage
            ? result.items
            : [
                ...new Map(
                  [...current, ...result.items].map((item) => [item.id, item]),
                ).values(),
              ],
        );
        setCompanyPagination(result.pagination);
      } catch {
        if (!controller.signal.aborted && isFirstPage) setCompanies([]);
      } finally {
        if (!controller.signal.aborted) setIsLoadingCompanies(false);
      }
    };
    loadCompanies();
    return () => controller.abort();
  }, [
    canManage,
    companyPage,
    contact,
    debouncedSearch,
    pickerOpen,
    reassignmentBlockReason,
  ]);

  const hasChanged =
    selectedCompany?.id &&
    selectedAddressId &&
    (selectedCompany.id !== currentCompany?.id ||
      selectedAddressId !== currentAddress?.id);
  const selectedAddress =
    selectedCompany?.addresses?.find(
      (address) => address.id === selectedAddressId,
    ) ?? null;

  const saveAssignment = async () => {
    if (!contact?.id || !selectedCompany?.id || !selectedAddressId) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      await employeeCompanyApi.reassignCompanyContact(contact.id, {
        company: selectedCompany.id,
        company_address: selectedAddressId,
      });
      await dispatch(fetchCompanyContacts(COMPANY_CONTACT_COLUMNS));
      onClose();
    } catch (error) {
      setSaveError(extractErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={Boolean(contact)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full gap-0 sm:max-w-xl">
        {contact && (
          <>
            <SheetHeader className="border-b px-5 py-5 sm:px-6">
              <div className="flex items-start gap-3 pr-8">
                <span className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Building2 className="size-6" />
                </span>
                <div className="min-w-0">
                  <SheetTitle className="text-xl sm:text-2xl">
                    {contact.companyName}
                  </SheetTitle>
                  <SheetDescription className="mt-2 flex items-center gap-1.5">
                    <UserRound className="size-4" />
                    Contact person: {contact.contactPersonName}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-5 py-5 sm:px-6"
            >
              <h3 className="text-sm font-semibold">Company details</h3>
              {contact.companyDetails.length > 0 ? (
                <div className="mt-3 grid gap-4">
                  {contact.companyDetails.map((details, index) => (
                    <div
                      key={`${details.email}-${index}`}
                      className="grid gap-3"
                    >
                      <CompanyDetailItem
                        icon={Mail}
                        label="Email address"
                        value={details.email}
                        href={
                          details.email ? `mailto:${details.email}` : undefined
                        }
                      />
                      <CompanyDetailItem
                        icon={Phone}
                        label="Phone number"
                        value={details.phone}
                        href={
                          details.phone ? `tel:${details.phone}` : undefined
                        }
                      />
                      <CompanyDetailItem
                        icon={FileText}
                        label="GST number"
                        value={details.gstNumber}
                      />
                      <CompanyDetailItem
                        icon={FileText}
                        label="PAN number"
                        value={details.panNumber}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No company details are available.
                </p>
              )}

              {canManage && (
                <section className="mt-6 min-w-0 overflow-hidden rounded-xl border p-4">
                  <h3 className="text-sm font-semibold">Company assignment</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Move this contact person to another company and company
                    address.
                  </p>
                  {isChecking ? (
                    <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="size-4 animate-spin" />
                      Checking current company contacts...
                    </p>
                  ) : checkError ? (
                    <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                      {checkError}
                    </p>
                  ) : reassignmentBlockReason ? (
                    <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                      {reassignmentBlockReason}
                    </p>
                  ) : (
                    <div className="mt-4 grid min-w-0 gap-4">
                      <div className="grid min-w-0 gap-2">
                        <span className="text-xs font-medium">Company</span>
                        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              className="w-full min-w-0 max-w-full justify-between overflow-hidden bg-background font-normal"
                            >
                              <span className="min-w-0 flex-1 truncate text-left">
                                {selectedCompany?.name ?? "Select company"}
                              </span>
                              <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            align="start"
                            className="w-[var(--radix-popover-trigger-width)] p-0"
                          >
                            <div className="border-b p-2">
                              <Input
                                value={companySearch}
                                onChange={(event) =>
                                  setCompanySearch(event.target.value)
                                }
                                placeholder="Search company name..."
                                aria-label="Search company by name"
                                autoFocus
                              />
                            </div>
                            <div className="max-h-64 overflow-y-auto p-1">
                              {isLoadingCompanies && companies.length === 0 ? (
                                <p className="p-6 text-center text-sm text-muted-foreground">
                                  Loading companies...
                                </p>
                              ) : companies.length === 0 ? (
                                <p className="p-6 text-center text-sm text-muted-foreground">
                                  No company found.
                                </p>
                              ) : (
                                companies.map((company) => (
                                  <Button
                                    key={company.id}
                                    type="button"
                                    variant="ghost"
                                    onClick={() => {
                                      setSelectedCompany(company);
                                      setSelectedAddressId("");
                                      setCompanySearch("");
                                      setPickerOpen(false);
                                    }}
                                    className="h-auto w-full justify-start gap-2 px-3 py-2 text-left font-normal"
                                  >
                                    <Check
                                      className={`size-4 shrink-0 ${selectedCompany?.id === company.id ? "opacity-100" : "opacity-0"}`}
                                    />
                                    <span className="truncate">
                                      {company.name}
                                    </span>
                                  </Button>
                                ))
                              )}
                            </div>
                            {companyPagination.page <
                              companyPagination.totalPages && (
                              <div className="border-t p-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  disabled={isLoadingCompanies}
                                  onClick={() =>
                                    setCompanyPage((page) => page + 1)
                                  }
                                  className="w-full"
                                >
                                  {isLoadingCompanies && (
                                    <Loader2 className="size-4 animate-spin" />
                                  )}
                                  Load more companies
                                </Button>
                              </div>
                            )}
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="grid min-w-0 gap-2">
                        <span className="text-xs font-medium">
                          Company address
                        </span>
                        <Select
                          value={selectedAddressId}
                          onValueChange={setSelectedAddressId}
                          disabled={!selectedCompany}
                        >
                          <SelectTrigger className="min-w-0 max-w-full overflow-hidden bg-background text-left [&>span]:line-clamp-none">
                            <SelectValue
                              className="min-w-0 flex-1 overflow-hidden"
                              placeholder="Select company address"
                            >
                              {selectedAddress && (
                                <span className="flex min-w-0 items-center gap-2">
                                  <span className="min-w-0 flex-1 truncate">
                                    {selectedAddress.address}
                                  </span>
                                  <span className="shrink-0 text-muted-foreground">
                                    {selectedAddress.pincode}
                                  </span>
                                </span>
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="max-w-[var(--radix-select-trigger-width)]">
                            {(selectedCompany?.addresses ?? []).map(
                              (address) => (
                                <SelectItem key={address.id} value={address.id}>
                                  <span className="flex min-w-0 items-center gap-2">
                                    <span className="min-w-0 flex-1 truncate">
                                      {address.address}
                                    </span>
                                    <span className="shrink-0 text-muted-foreground">
                                      {address.pincode}
                                    </span>
                                  </span>
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      {saveError && (
                        <p className="text-sm text-destructive">{saveError}</p>
                      )}
                      <Button
                        type="button"
                        onClick={saveAssignment}
                        disabled={!hasChanged || isSaving}
                        className="justify-self-end"
                      >
                        {isSaving ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Save className="size-4" />
                        )}
                        Save assignment
                      </Button>
                    </div>
                  )}
                </section>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CompanyContactDetailSheet;
