import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import CompanyDetailsForm from "@Forms/company/companyDetails/companyDetailsForm";
import {
  createCompany,
  createCompanyAddress,
  createCompanyContact,
  deleteCompanyAddress,
  deleteCompanyContact,
  updateCompany,
  updateCompanyAddress,
  updateCompanyContact,
} from "@Redux/company/company.action";

function CompanyDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { companyId } = useParams();
  const companies = useSelector((state) => state.companies.items);
  const isEditing = Boolean(companyId);
  const company =
    location.state?.company ??
    companies.find((item) => String(item.id) === String(companyId));

  const submitCompany = async (values) => {
    if (isEditing) {
      await dispatch(
        updateCompany({ id: company?.id ?? companyId, values }),
      ).unwrap();
    } else {
      await dispatch(createCompany(values)).unwrap();
    }

    navigate("/companies", { replace: true });
  };

  return (
    <CompanyDetailsForm
      company={company}
      companyId={companyId}
      isEditing={isEditing}
      onSubmit={submitCompany}
      onCreateAddress={(id, values) =>
        dispatch(createCompanyAddress({ companyId: id, values })).unwrap()
      }
      onUpdateAddress={(address) =>
        dispatch(
          updateCompanyAddress({ id: address.id, values: address }),
        ).unwrap()
      }
      onDeleteAddress={(id) => dispatch(deleteCompanyAddress(id)).unwrap()}
      onCreateContact={(id, addressId, values) =>
        dispatch(
          createCompanyContact({ companyId: id, addressId, values }),
        ).unwrap()
      }
      onUpdateContact={(contact) =>
        dispatch(
          updateCompanyContact({ id: contact.id, values: contact }),
        ).unwrap()
      }
      onDeleteContact={(id) => dispatch(deleteCompanyContact(id)).unwrap()}
      onCancel={() => navigate("/companies", { replace: true })}
    />
  );
}

export default CompanyDetailsPage;
