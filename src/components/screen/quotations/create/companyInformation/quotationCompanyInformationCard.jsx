import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import { Textarea } from "@shadcnComponent/textarea";

function CompanyInformationField({ id, label, error, children }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function QuotationCompanyInformationCard({
  companyInputRef,
  addressInputRef,
  emailInputRef,
  phoneInputRef,
  gstInputRef,
  saveButtonRef,
  formik,
  fieldError,
  onCompanyNameChange,
  onCompanyNameFocus,
  onCompanyNameKeyDown,
  onAddressKeyDown,
  onEmailKeyDown,
  onPhoneKeyDown,
  onGstKeyDown,
  onSaveKeyDown,
}) {
  const fieldProps = (field) => ({
    name: field,
    value: formik.values[field],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    "aria-invalid": Boolean(fieldError(field)),
    "aria-describedby": fieldError(field)
      ? `quotation-${field}-error`
      : undefined,
  });

  return (
    <Card className="w-full self-start">
      <CardHeader className="border-b">
        <CardTitle>Company information</CardTitle>
        <CardDescription>
          Enter the company details for this quotation.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5">
        <CompanyInformationField
          id="quotation-companyName"
          label="Company name"
          error={fieldError("companyName")}
        >
          <Input
            ref={companyInputRef}
            id="quotation-companyName"
            type="text"
            {...fieldProps("companyName")}
            onChange={onCompanyNameChange}
            onFocus={onCompanyNameFocus}
            onKeyDown={onCompanyNameKeyDown}
            placeholder="Enter company name"
            autoComplete="organization"
            autoFocus
          />
        </CompanyInformationField>

        <CompanyInformationField
          id="quotation-address"
          label="Address"
          error={fieldError("address")}
        >
          <Textarea
            ref={addressInputRef}
            id="quotation-address"
            {...fieldProps("address")}
            onKeyDown={onAddressKeyDown}
            placeholder="Enter the complete company address"
            autoComplete="street-address"
            rows={4}
            className="min-h-28 resize-y"
          />
        </CompanyInformationField>

        <div className="grid gap-5 sm:grid-cols-2">
          <CompanyInformationField
            id="quotation-email"
            label="Email address"
            error={fieldError("email")}
          >
            <Input
              ref={emailInputRef}
              id="quotation-email"
              type="email"
              {...fieldProps("email")}
              onKeyDown={onEmailKeyDown}
              placeholder="name@company.com"
              autoComplete="email"
            />
          </CompanyInformationField>

          <CompanyInformationField
            id="quotation-phoneNumber"
            label="Phone number"
            error={fieldError("phoneNumber")}
          >
            <Input
              ref={phoneInputRef}
              id="quotation-phoneNumber"
              type="tel"
              {...fieldProps("phoneNumber")}
              onKeyDown={onPhoneKeyDown}
              placeholder="9876543210"
              autoComplete="tel"
              inputMode="numeric"
              maxLength={10}
            />
          </CompanyInformationField>
        </div>

        <CompanyInformationField
          id="quotation-gstNumber"
          label="GST number"
          error={fieldError("gstNumber")}
        >
          <Input
            ref={gstInputRef}
            id="quotation-gstNumber"
            type="text"
            {...fieldProps("gstNumber")}
            onKeyDown={onGstKeyDown}
            placeholder="24AAZFT8619H1ZF"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            maxLength={15}
            className="uppercase"
          />
        </CompanyInformationField>
      </CardContent>

      <CardFooter className="justify-end border-t">
        <Button
          ref={saveButtonRef}
          type="submit"
          onKeyDown={onSaveKeyDown}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

export default QuotationCompanyInformationCard;
